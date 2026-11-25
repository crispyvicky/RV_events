import { SITE } from "./constants";

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function brandShell({ title, accent, bodyHtml, siteUrl }) {
  const logoUrl = `${(siteUrl || SITE.url || "http://localhost:3000").replace(/\/$/, "")}/brand/rv-favicon-warm.jpg`;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0c0c0c;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c0c0c;padding:32px 12px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;overflow:hidden;">
        <tr>
          <td style="background:#0c0c0c;padding:28px 32px;text-align:center;">
            <img src="${logoUrl}" width="52" height="52" alt="${escapeHtml(SITE.name)}" style="display:inline-block;margin-bottom:10px;object-fit:contain;"/>
            <div style="font-size:18px;letter-spacing:0.28em;color:#f3f0eb;text-transform:uppercase;">${escapeHtml(SITE.name)}</div>
            <div style="margin-top:8px;font-size:11px;letter-spacing:0.18em;color:${accent};text-transform:uppercase;">Hyderabad · Kakinada</div>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 32px 12px;">
            <h1 style="margin:0;font-weight:400;font-size:26px;line-height:1.3;color:#1a1712;">${escapeHtml(title)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 32px 36px;color:#6e675c;font-size:15px;line-height:1.7;">
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="background:#0c0c0c;padding:18px 32px;text-align:center;color:#8a847a;font-size:11px;letter-spacing:0.06em;">
            © ${new Date().getFullYear()} ${escapeHtml(SITE.name)} · Experiences shaped with intention
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Premium thank-you / we'll get back to you — sent to the person who submitted the form */
export function buildClientThankYouEmail(lead, siteUrl) {
  const name = lead.name || "there";
  const sourceLabel = lead.source === "get-quote" ? "quotation request" : "message";
  const bodyHtml = `
    <p style="margin:0 0 14px;">Hello ${escapeHtml(name)},</p>
    <p style="margin:0 0 14px;">Thank you for reaching out to <strong style="color:#1a1712;">${escapeHtml(SITE.name)}</strong>. We've received your ${escapeHtml(sourceLabel)} and our team will get back to you shortly.</p>
    <p style="margin:0 0 14px;">In the meantime, feel free to reply to this email with any extra details — date, venue, guest count, or the feeling you want the evening to hold.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0;background:#f4efe6;">
      <tr><td style="padding:16px 18px;font-size:13px;color:#1a1712;">
        <strong>What happens next</strong><br/>
        1. We review your brief<br/>
        2. A studio member replies within 1–2 business days<br/>
        3. We shape a tailored conversation / quotation
      </td></tr>
    </table>
    <p style="margin:0;">With care,<br/><strong style="color:#1a1712;">${escapeHtml(SITE.name)}</strong><br/>
    <a href="mailto:${escapeHtml(SITE.email)}" style="color:#b08d57;text-decoration:none;">${escapeHtml(SITE.email)}</a>
    · ${escapeHtml(SITE.phone)}</p>
  `;
  return brandShell({
    title: "We've received your note",
    accent: "#b08d57",
    bodyHtml,
    siteUrl,
  });
}

/** Internal alert — sent to maha@rvevents.co when someone submits contact/get-quote */
export function buildAdminLeadAlertEmail(lead, siteUrl) {
  const bodyHtml = `
    <p style="margin:0 0 14px;">New enquiry from the website.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;color:#1a1712;">
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;width:120px;color:#6e675c;">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(lead.name)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6e675c;">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(lead.email)}" style="color:#b08d57;">${escapeHtml(lead.email)}</a></td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6e675c;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(lead.phone)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6e675c;">City</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(lead.city)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6e675c;">Source</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(lead.source)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6e675c;">Event</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(lead.eventType || "—")}${lead.eventDate ? ` · ${escapeHtml(lead.eventDate)}` : ""}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6e675c;">Guests</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${lead.guestCount || "—"}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6e675c;">Budget</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(lead.budget || "—")}</td></tr>
      <tr><td style="padding:8px 0;color:#6e675c;vertical-align:top;">Message</td><td style="padding:8px 0;">${escapeHtml(lead.message)}</td></tr>
    </table>
    <p style="margin:18px 0 0;font-size:13px;color:#6e675c;">Reply directly to the client at ${escapeHtml(lead.email)}.</p>
  `;
  return brandShell({
    title: "New website enquiry",
    accent: "#b08d57",
    bodyHtml,
    siteUrl,
  });
}
