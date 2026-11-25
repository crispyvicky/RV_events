import { SITE } from "./constants";
import { formatINR } from "./quotes";

/** Client-safe WhatsApp message builder (no nodemailer) */
export function buildWhatsAppText(quote, settings = {}) {
  const company = settings.companyName || SITE.name;
  const lines = (quote.lineItems || [])
    .slice(0, 8)
    .map((i) => `• ${i.description} — ${formatINR(i.amount)}`)
    .join("\n");

  const type = quote.event?.type || "Custom";
  const warm =
    type === "Wedding"
      ? "With warm wishes"
      : type === "Corporate" || type === "Conference"
        ? "Dear"
        : "Hello";

  return (
    `${warm} ${quote.client?.name || ""},\n\n` +
    `Thank you for choosing *${company}*.\n` +
    `Here is quotation *${quote.quoteNumber}* for your *${type}* in ${quote.client?.city || "your city"}.\n\n` +
    `${lines}\n\n` +
    `Subtotal: ${formatINR(quote.subtotal)}\n` +
    `GST: ${formatINR(quote.gst)}\n` +
    `*Grand total: ${formatINR(quote.grandTotal)}*\n\n` +
    `${quote.notes ? `Notes: ${quote.notes}\n\n` : ""}` +
    `We would love to refine any line item with you.\n` +
    `— ${company} · Hyderabad & Kakinada\n` +
    `${settings.phone || SITE.phone} · ${settings.email || SITE.email}`
  );
}
