"use client";

import { useMemo, useState } from "react";
import { Mail, MessageCircle, Bell, Sparkles } from "lucide-react";
import { buildWhatsAppText } from "@/lib/mail-client";

export default function QuoteSendActions({ quote }) {
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");

  const whatsappHref = useMemo(() => {
    if (!quote) return "#";
    const text = buildWhatsAppText(quote);
    const phone = String(quote.client?.phone || "").replace(/\D/g, "");
    const withCountry =
      phone.length === 10 ? `91${phone}` : phone.startsWith("91") ? phone : phone;
    const base = withCountry.length >= 10 ? `https://wa.me/${withCountry}` : "https://wa.me/";
    return `${base}?text=${encodeURIComponent(text)}`;
  }, [quote]);

  async function sendEmail(mode) {
    if (!quote?.id) return;
    setBusy(mode);
    setMsg("");
    try {
      const res = await fetch(`/api/quotations/${quote.id}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: quote.client?.email, mode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send email");
      setMsg(data.message || "Email sent");
    } catch (err) {
      setMsg(err.message);
    } finally {
      setBusy("");
    }
  }

  if (!quote?.id) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => sendEmail("quotation")}
          disabled={Boolean(busy)}
          className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2.5 text-sm text-white disabled:opacity-60"
        >
          <Mail size={16} />
          {busy === "quotation" ? "Sending…" : "Email quotation"}
        </button>
        <button
          type="button"
          onClick={() => sendEmail("welcome")}
          disabled={Boolean(busy)}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm disabled:opacity-60"
        >
          <Sparkles size={16} />
          {busy === "welcome" ? "Sending…" : "Welcome + quote"}
        </button>
        <button
          type="button"
          onClick={() => sendEmail("reminder")}
          disabled={Boolean(busy)}
          className="inline-flex items-center gap-2 rounded-md border border-amber-500/50 bg-amber-50 px-4 py-2.5 text-sm text-amber-900 disabled:opacity-60"
        >
          <Bell size={16} />
          {busy === "reminder" ? "Sending…" : "Send reminder"}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-emerald-600 px-4 py-2.5 text-sm text-emerald-700 hover:bg-emerald-50"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
      <p className="text-xs text-zinc-500">
        Email design auto-matches event type (wedding traditional, corporate editorial, destination,
        etc.). Client email: {quote.client?.email || "missing"}
      </p>
      {msg && <p className="text-sm text-zinc-700">{msg}</p>}
    </div>
  );
}
