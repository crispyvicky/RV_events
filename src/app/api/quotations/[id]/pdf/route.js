import { createElement } from "react";
import { ObjectId } from "mongodb";
import { renderToBuffer } from "@react-pdf/renderer";
import { requireAdmin } from "@/lib/auth-helpers";
import { getDb } from "@/lib/mongodb";
import { QuotePdfDocument } from "@/components/admin/QuotePdfDocument";

export async function GET(_request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const db = await getDb();
  const quote = await db.collection("quotations").findOne({ _id: new ObjectId(id) });
  if (!quote) return Response.json({ error: "Not found" }, { status: 404 });

  const settings =
    (await db.collection("settings").findOne({ key: "company" })) || {
      companyName: "RV EVENTS",
      email: "hello@rvevents.com",
      phone: "+91 90598 14164",
      address: "Hyderabad & Kakinada",
      gstPercent: 18,
    };

  const buffer = await renderToBuffer(
    createElement(QuotePdfDocument, {
      quote: { ...quote, id },
      settings,
    })
  );

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${quote.quoteNumber || "quote"}.pdf"`,
    },
  });
}
