import { formatINR } from "./quotes";
import { SITE } from "./constants";

const THEMES = {
  Wedding: {
    label: "Wedding celebration",
    greeting: "With warm wishes",
    accent: "#8B3A3A",
    accentSoft: "#F6EDE8",
    ink: "#2A1F1A",
    muted: "#7A655C",
    heroTitle: "A celebration woven with intention",
    heroCopy:
      "From mandap to last dance — every detail composed for your story, your families, and the feeling you want the room to hold.",
    footerBlessing: "May your beginning be abundant in light, laughter, and love.",
    styleNote: "Traditional · Editorial · Intimate",
  },
  Corporate: {
    label: "Corporate experience",
    greeting: "Dear",
    accent: "#1B3A4B",
    accentSoft: "#E8EEF2",
    ink: "#12181C",
    muted: "#5C6B73",
    heroTitle: "Clarity, atmosphere, flawless execution",
    heroCopy:
      "Brand narrative, stage craft, and guest hospitality — produced with operational precision for leadership, clients, and teams.",
    footerBlessing: "We look forward to delivering an experience worthy of your brand.",
    styleNote: "Boardroom · Launch · Immersive",
  },
  Social: {
    label: "Social celebration",
    greeting: "Hello",
    accent: "#6B4E71",
    accentSoft: "#F3ECF4",
    ink: "#1F1720",
    muted: "#6E6170",
    heroTitle: "A night that feels like you",
    heroCopy:
      "Birthday, anniversary, or private gathering — styled with warmth, pacing, and moments guests remember.",
    footerBlessing: "Here's to an evening that feels effortless and unforgettable.",
    styleNote: "Intimate · Joyful · Designed",
  },
  Birthday: {
    label: "Birthday celebration",
    greeting: "Hello",
    accent: "#9A4D3B",
    accentSoft: "#F8EEE9",
    ink: "#241914",
    muted: "#7A645C",
    heroTitle: "Your milestone, beautifully hosted",
    heroCopy:
      "From welcome to cake moment — décor, light, and hospitality shaped around the guest of honour.",
    footerBlessing: "Wishing you a celebration filled with joy.",
    styleNote: "Festive · Personal · Warm",
  },
  Destination: {
    label: "Destination experience",
    greeting: "Hello",
    accent: "#3D5A4C",
    accentSoft: "#EAF1ED",
    ink: "#152018",
    muted: "#5E7266",
    heroTitle: "Place as part of the story",
    heroCopy:
      "Travel, venues, multi-day programming, and on-site production — composed around the character of the destination.",
    footerBlessing: "We can't wait to host this journey with you.",
    styleNote: "Travel · Multi-day · Immersive",
  },
  "Product Launch": {
    label: "Product launch",
    greeting: "Hello",
    accent: "#2C2C2C",
    accentSoft: "#F0F0F0",
    ink: "#111111",
    muted: "#666666",
    heroTitle: "Reveal with presence",
    heroCopy:
      "Experiential set, media cues, and press hospitality — designed so the product moment lands with clarity and drama.",
    footerBlessing: "Excited to craft a launch that commands the room.",
    styleNote: "Reveal · Press · Experiential",
  },
  Conference: {
    label: "Conference",
    greeting: "Dear",
    accent: "#243B55",
    accentSoft: "#E9EEF4",
    ink: "#121820",
    muted: "#5A6775",
    heroTitle: "Programme, stage, and guest flow",
    heroCopy:
      "From registration to closing keynote — AV, wayfinding, and floor management aligned to your agenda.",
    footerBlessing: "Ready when you are to produce a conference that runs clean.",
    styleNote: "Agenda · Hybrid-ready · Precise",
  },
  Custom: {
    label: "Bespoke experience",
    greeting: "Hello",
    accent: "#B08D57",
    accentSoft: "#F4EFE6",
    ink: "#1A1712",
    muted: "#6E675C",
    heroTitle: "Crafted entirely around your brief",
    heroCopy:
      "Creative direction, production, and hospitality — tailored for Hyderabad & Kakinada celebrations of every kind.",
    footerBlessing: "We're honoured to shape this with you.",
    styleNote: "Bespoke · Full-service",
  },
};

function themeFor(type) {
  return THEMES[type] || THEMES.Custom;
}

function lineRows(quote, theme) {
  return (quote.lineItems || [])
    .map(
      (item) => `
      <tr>
        <td style="padding:14px 12px;border-bottom:1px solid #ece7e1;color:${theme.ink};font-size:14px;">
          ${escapeHtml(item.description || "")}
        </td>
        <td style="padding:14px 12px;border-bottom:1px solid #ece7e1;text-align:center;color:${theme.muted};font-size:13px;white-space:nowrap;">
          ${item.qty || 0} ${escapeHtml(item.unit || "")}
        </td>
        <td style="padding:14px 12px;border-bottom:1px solid #ece7e1;text-align:right;color:${theme.muted};font-size:13px;white-space:nowrap;">
          ${formatINR(item.rate)}
        </td>
        <td style="padding:14px 12px;border-bottom:1px solid #ece7e1;text-align:right;color:${theme.ink};font-size:14px;font-weight:600;white-space:nowrap;">
          ${formatINR(item.amount)}
        </td>
      </tr>`
    )
    .join("");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Premium quotation email — design adapts to event type
 * (traditional wedding palette vs corporate editorial, etc.)
 */
export function buildPremiumQuoteEmail({ quote, settings = {}, siteUrl, mode = "quotation" }) {
  const theme = themeFor(quote.event?.type);
  const company = settings.companyName || SITE.name;
  const logoUrl =
    settings.logoUrl ||
    `${(siteUrl || SITE.url || "http://localhost:3000").replace(/\/$/, "")}/brand/rv-favicon-warm.jpg`;
  const clientName = quote.client?.name || "there";
  const isReminder = mode === "reminder";
  const isWelcome = mode === "welcome";

  const headline = isWelcome
    ? `Welcome to ${company}`
    : isReminder
      ? `A gentle reminder — Quotation ${quote.quoteNumber}`
      : `Your quotation · ${quote.quoteNumber}`;

  const intro = isWelcome
    ? `We're delighted to welcome you. Below is your first quotation — a starting point for the ${theme.label.toLowerCase()} we're crafting together.`
    : isReminder
      ? `Hope you're well. This is a friendly reminder of quotation <strong>${escapeHtml(quote.quoteNumber)}</strong> prepared for your ${escapeHtml(quote.event?.type || "event")}. We're happy to refine any line item whenever you're ready.`
      : `Thank you for trusting ${escapeHtml(company)}. We've prepared a tailored quotation for your ${escapeHtml(quote.event?.type || "event")} in ${escapeHtml(quote.client?.city || "your city")}.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(headline)}</title>
</head>
<body style="margin:0;padding:0;background:#0c0c0c;font-family:'Segoe UI',Georgia,serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0c0c0c;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;background:#ffffff;overflow:hidden;">
          <!-- Brand bar -->
          <tr>
            <td style="background:#0c0c0c;padding:28px 36px;text-align:center;">
              <img src="${logoUrl}" alt="${escapeHtml(company)}" width="56" height="56" style="display:inline-block;margin-bottom:12px;object-fit:contain;" />
              <div style="font-size:20px;letter-spacing:0.28em;color:#f3f0eb;text-transform:uppercase;">${escapeHtml(company)}</div>
              <div style="margin-top:8px;font-size:11px;letter-spacing:0.2em;color:#b08d57;text-transform:uppercase;">${escapeHtml(theme.styleNote)}</div>
            </td>
          </tr>

          <!-- Hero band -->
          <tr>
            <td style="background:${theme.accentSoft};padding:36px 36px 28px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${theme.accent};">
                ${escapeHtml(theme.label)}
              </p>
              <h1 style="margin:0;font-weight:400;font-size:28px;line-height:1.25;color:${theme.ink};">
                ${escapeHtml(theme.heroTitle)}
              </h1>
              <p style="margin:14px 0 0;font-size:14px;line-height:1.6;color:${theme.muted};">
                ${escapeHtml(theme.heroCopy)}
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:32px 36px 8px;color:${theme.ink};">
              <p style="margin:0;font-size:16px;">
                ${escapeHtml(theme.greeting)} ${escapeHtml(clientName)},
              </p>
              <p style="margin:14px 0 0;font-size:15px;line-height:1.65;color:${theme.muted};">
                ${intro}
              </p>
            </td>
          </tr>

          <!-- Meta -->
          <tr>
            <td style="padding:20px 36px;">
              <table role="presentation" width="100%" style="background:${theme.accentSoft};">
                <tr>
                  <td style="padding:16px 18px;font-size:13px;color:${theme.ink};">
                    <strong>Quote</strong> ${escapeHtml(quote.quoteNumber || "")}<br/>
                    <strong>Event</strong> ${escapeHtml(quote.event?.type || "Custom")}
                    ${quote.event?.date ? ` · ${escapeHtml(quote.event.date)}` : ""}<br/>
                    <strong>City</strong> ${escapeHtml(quote.client?.city || "—")}
                    ${quote.event?.venue ? `<br/><strong>Venue</strong> ${escapeHtml(quote.event.venue)}` : ""}
                    ${quote.event?.guestCount ? `<br/><strong>Guests</strong> ${escapeHtml(String(quote.event.guestCount))}` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Line items -->
          <tr>
            <td style="padding:8px 36px 12px;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${theme.accent};">
                Investment breakdown
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <thead>
                  <tr style="background:${theme.ink};">
                    <th align="left" style="padding:12px;color:#fff;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:500;">Description</th>
                    <th style="padding:12px;color:#fff;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:500;">Qty</th>
                    <th align="right" style="padding:12px;color:#fff;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:500;">Rate</th>
                    <th align="right" style="padding:12px;color:#fff;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:500;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${lineRows(quote, theme)}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding:8px 36px 28px;" align="right">
              <table role="presentation" cellspacing="0" cellpadding="0" style="min-width:240px;">
                <tr>
                  <td style="padding:4px 0;color:${theme.muted};font-size:13px;">Subtotal</td>
                  <td style="padding:4px 0 4px 24px;text-align:right;color:${theme.ink};font-size:13px;">${formatINR(quote.subtotal)}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:${theme.muted};font-size:13px;">GST (${quote.gstPercent || 18}%)</td>
                  <td style="padding:4px 0 4px 24px;text-align:right;color:${theme.ink};font-size:13px;">${formatINR(quote.gst)}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:${theme.muted};font-size:12px;">CGST</td>
                  <td style="padding:4px 0 4px 24px;text-align:right;color:${theme.muted};font-size:12px;">${formatINR(quote.cgst)}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:${theme.muted};font-size:12px;">SGST</td>
                  <td style="padding:4px 0 4px 24px;text-align:right;color:${theme.muted};font-size:12px;">${formatINR(quote.sgst)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:10px;border-top:2px solid ${theme.accent};"></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:${theme.ink};font-size:16px;"><strong>Grand total</strong></td>
                  <td style="padding:8px 0 8px 24px;text-align:right;color:${theme.accent};font-size:18px;"><strong>${formatINR(quote.grandTotal)}</strong></td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            quote.notes
              ? `<tr><td style="padding:0 36px 28px;"><div style="padding:16px 18px;background:#faf8f5;border-left:3px solid ${theme.accent};color:${theme.muted};font-size:13px;line-height:1.55;"><strong style="color:${theme.ink};">Notes</strong><br/>${escapeHtml(quote.notes)}</div></td></tr>`
              : ""
          }

          <!-- Closing -->
          <tr>
            <td style="padding:0 36px 36px;color:${theme.muted};font-size:14px;line-height:1.65;">
              <p style="margin:0 0 12px;">${escapeHtml(theme.footerBlessing)}</p>
              <p style="margin:0;">With care,<br/><strong style="color:${theme.ink};">${escapeHtml(company)}</strong><br/>
              Hyderabad &amp; Kakinada<br/>
              <a href="mailto:${escapeHtml(settings.email || SITE.email)}" style="color:${theme.accent};text-decoration:none;">${escapeHtml(settings.email || SITE.email)}</a>
              · ${escapeHtml(settings.phone || SITE.phone)}</p>
            </td>
          </tr>

          <tr>
            <td style="background:#0c0c0c;padding:20px 36px;text-align:center;color:#8a847a;font-size:11px;letter-spacing:0.08em;">
              © ${new Date().getFullYear()} ${escapeHtml(company)} · Experiences shaped with intention
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function subjectForQuote(quote, settings = {}, mode = "quotation") {
  const company = settings.companyName || SITE.name;
  const type = quote.event?.type || "Event";
  if (mode === "welcome") return `Welcome to ${company} — your ${type} quotation`;
  if (mode === "reminder") return `Reminder · ${company} Quotation ${quote.quoteNumber}`;
  return `${company} · ${type} Quotation ${quote.quoteNumber}`;
}
