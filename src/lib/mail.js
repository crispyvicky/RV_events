import nodemailer from "nodemailer";
import { SITE } from "./constants";
import { buildPremiumQuoteEmail, subjectForQuote } from "./quoteEmailTemplates";

export function isMailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function getTransporter() {
  if (!isMailConfigured()) {
    throw new Error("Email not configured. Set SMTP_USER and SMTP_PASS in .env.local");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: String(process.env.SMTP_PASS).replace(/\s+/g, ""),
    },
  });
}

export function buildQuoteEmailHtml(quote, settings = {}, mode = "quotation") {
  return buildPremiumQuoteEmail({
    quote,
    settings,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || SITE.url,
    mode,
  });
}

export function buildQuoteEmailSubject(quote, settings = {}, mode = "quotation") {
  return subjectForQuote(quote, settings, mode);
}

export { buildWhatsAppText } from "./mail-client";
