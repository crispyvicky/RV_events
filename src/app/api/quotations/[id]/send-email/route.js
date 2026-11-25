import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth-helpers";
import { getDb } from "@/lib/mongodb";
import {
  buildQuoteEmailHtml,
  buildQuoteEmailSubject,
  getTransporter,
  isMailConfigured,
} from "@/lib/mail";
import { SITE } from "@/lib/constants";

export async function POST(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  if (!isMailConfigured()) {
    return Response.json(
      {
        error:
          "Email not configured. Add SMTP_USER and SMTP_PASS (Gmail App Password) to .env.local",
      },
      { status: 400 }
    );
  }

  const { id } = await params;
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const mode = ["quotation", "reminder", "welcome"].includes(body.mode)
    ? body.mode
    : "quotation";

  const db = await getDb();
  const quote = await db.collection("quotations").findOne({ _id: new ObjectId(id) });
  if (!quote) return Response.json({ error: "Quotation not found" }, { status: 404 });

  const settings =
    (await db.collection("settings").findOne({ key: "company" })) || {};

  // Prefer branded sender details
  if (!settings.email) settings.email = process.env.SMTP_FROM || process.env.SMTP_USER || SITE.email;
  if (!settings.companyName) settings.companyName = SITE.name;

  const to = (body.to || quote.client?.email || "").trim();
  if (!to) {
    return Response.json({ error: "Client email missing on quotation" }, { status: 400 });
  }

  const company = settings.companyName || SITE.name;
  const transporter = getTransporter();
  const subject = body.subject || buildQuoteEmailSubject(quote, settings, mode);
  const html = buildQuoteEmailHtml(quote, settings, mode);

  await transporter.sendMail({
    from: `"${company}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    replyTo: settings.email || process.env.SMTP_USER,
    subject,
    html,
    text:
      `${company} quotation ${quote.quoteNumber} for ${quote.client?.name || "client"}. ` +
      `Grand total ${quote.grandTotal}. Open this email in HTML for the full premium breakdown.`,
  });

  await db.collection("quotations").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: quote.status === "draft" ? "sent" : quote.status,
        lastEmailedAt: new Date(),
        lastEmailMode: mode,
        updatedAt: new Date(),
      },
    }
  );

  return Response.json({
    ok: true,
    to,
    mode,
    message:
      mode === "reminder"
        ? `Reminder emailed to ${to}`
        : mode === "welcome"
          ? `Welcome + quotation emailed to ${to}`
          : `Premium quotation emailed to ${to}`,
  });
}
