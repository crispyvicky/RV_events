import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth-helpers";
import { getDb, hasMongoConfig } from "@/lib/mongodb";
import { getTransporter, isMailConfigured } from "@/lib/mail";
import { buildAdminLeadAlertEmail, buildClientThankYouEmail } from "@/lib/leadEmails";
import { SITE } from "@/lib/constants";

const ADMIN_INBOX = process.env.LEADS_INBOX || process.env.SMTP_FROM || process.env.SMTP_USER || SITE.email;

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoConfig()) return Response.json({ leads: [] });

  const db = await getDb();
  const leads = await db
    .collection("leads")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json({
    leads: leads.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest })),
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;
    if (!name || !email || !phone || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const doc = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      city: body.city || "Hyderabad",
      eventType: body.eventType || "Custom",
      eventDate: body.eventDate || null,
      guestCount: body.guestCount ? Number(body.guestCount) : null,
      budget: body.budget || "",
      message: String(message).trim(),
      source: body.source || "contact",
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let id = "local-preview";
    if (hasMongoConfig()) {
      const db = await getDb();
      const result = await db.collection("leads").insertOne(doc);
      id = result.insertedId.toString();
    }

    let mail = { admin: false, client: false, error: null };
    if (isMailConfigured()) {
      try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;
        const transporter = getTransporter();
        const from = `"${SITE.name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`;

        // 1) Notify studio inbox
        await transporter.sendMail({
          from,
          to: ADMIN_INBOX,
          replyTo: doc.email,
          subject: `New ${doc.source === "get-quote" ? "quote request" : "contact"} · ${doc.name}`,
          html: buildAdminLeadAlertEmail(doc, siteUrl),
          text: `${doc.name} (${doc.email} / ${doc.phone}): ${doc.message}`,
        });
        mail.admin = true;

        // 2) Thank-you / we'll get back to you — to the visitor
        await transporter.sendMail({
          from,
          to: doc.email,
          replyTo: ADMIN_INBOX,
          subject: `Thank you · ${SITE.name} has received your message`,
          html: buildClientThankYouEmail(doc, siteUrl),
          text: `Hello ${doc.name}, thank you for contacting ${SITE.name}. We've received your message and will get back to you shortly.`,
        });
        mail.client = true;
      } catch (err) {
        mail.error = err.message;
        console.error("[leads] mail failed:", err.message);
      }
    }

    return Response.json({
      ok: true,
      id,
      mail,
      warning: hasMongoConfig() ? undefined : "MongoDB not configured — lead not persisted",
    });
  } catch (err) {
    return Response.json({ error: err.message || "Failed to save lead" }, { status: 500 });
  }
}

export async function PATCH(request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  if (!body.id) return Response.json({ error: "id required" }, { status: 400 });

  const db = await getDb();
  await db.collection("leads").updateOne(
    { _id: new ObjectId(body.id) },
    {
      $set: {
        status: body.status,
        updatedAt: new Date(),
      },
    }
  );
  return Response.json({ ok: true });
}
