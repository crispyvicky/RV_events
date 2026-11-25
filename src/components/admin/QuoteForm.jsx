"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EVENT_TYPES, QUOTE_STATUSES, SITE } from "@/lib/constants";
import { calcLineAmount, calcQuoteTotals, formatINR } from "@/lib/quotes";
import QuoteSendActions from "@/components/admin/QuoteSendActions";

const blankLine = { description: "", qty: 1, unit: "package", rate: 0 };

export default function QuoteForm({ initial, leadId }) {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    status: initial?.status || "draft",
    leadId: initial?.leadId || leadId || "",
    client: {
      name: initial?.client?.name || "",
      email: initial?.client?.email || "",
      phone: initial?.client?.phone || "",
      city: initial?.client?.city || "Hyderabad",
    },
    event: {
      type: initial?.event?.type || "Wedding",
      date: initial?.event?.date || "",
      venue: initial?.event?.venue || "",
      guestCount: initial?.event?.guestCount || "",
    },
    lineItems: initial?.lineItems?.length ? initial.lineItems : [{ ...blankLine }],
    gstPercent: initial?.gstPercent || 18,
    validityDate: initial?.validityDate || "",
    notes: initial?.notes || "",
  });

  useEffect(() => {
    fetch("/api/quote-templates")
      .then((r) => r.json())
      .then((d) => setTemplates(d.templates || []))
      .catch(() => {});

    if (leadId && !initial) {
      fetch("/api/leads")
        .then((r) => r.json())
        .then((d) => {
          const lead = (d.leads || []).find((l) => l.id === leadId);
          if (!lead) return;
          setForm((prev) => ({
            ...prev,
            leadId,
            client: {
              name: lead.name || "",
              email: lead.email || "",
              phone: lead.phone || "",
              city: lead.city || "Hyderabad",
            },
            event: {
              type: lead.eventType || "Custom",
              date: lead.eventDate || "",
              venue: "",
              guestCount: lead.guestCount || "",
            },
            notes: lead.message || "",
          }));
        });
    }
  }, [leadId, initial]);

  const totals = useMemo(
    () => calcQuoteTotals(form.lineItems, form.gstPercent),
    [form.lineItems, form.gstPercent]
  );

  function setClient(key, value) {
    setForm((p) => ({ ...p, client: { ...p.client, [key]: value } }));
  }
  function setEvent(key, value) {
    setForm((p) => ({ ...p, event: { ...p.event, [key]: value } }));
  }
  function setLine(i, key, value) {
    setForm((p) => {
      const lineItems = [...p.lineItems];
      lineItems[i] = { ...lineItems[i], [key]: value };
      lineItems[i].amount = calcLineAmount(lineItems[i].qty, lineItems[i].rate);
      return { ...p, lineItems };
    });
  }
  function addLine() {
    setForm((p) => ({ ...p, lineItems: [...p.lineItems, { ...blankLine }] }));
  }
  function removeLine(i) {
    setForm((p) => ({
      ...p,
      lineItems: p.lineItems.filter((_, idx) => idx !== i),
    }));
  }
  function applyTemplate(id) {
    const t = templates.find((x) => x.id === id);
    if (!t) return;
    setForm((p) => ({
      ...p,
      event: { ...p.event, type: t.eventType || p.event.type },
      lineItems: (t.lineItems || []).map((l) => ({
        ...l,
        amount: calcLineAmount(l.qty, l.rate),
      })),
      notes: t.notes || p.notes,
    }));
  }

  async function save(e) {
    e.preventDefault();
    setMessage("");
    const payload = {
      ...form,
      ...totals,
      guestCount: form.event.guestCount,
    };
    const method = initial?.id ? "PUT" : "POST";
    const body = initial?.id ? { ...payload, id: initial.id } : payload;
    const res = await fetch("/api/quotations", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Save failed — is MongoDB configured?");
      return;
    }
    if (initial?.id) {
      setMessage("Updated");
    } else {
      router.push(`/admin/quotations/${data.id}`);
    }
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
        <div>
          <label className="admin-label">Status</label>
          <select
            className="admin-input"
            value={form.status}
            onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
          >
            {QUOTE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label">Apply template</label>
          <select className="admin-input" defaultValue="" onChange={(e) => applyTemplate(e.target.value)}>
            <option value="">Select template…</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label">GST %</label>
          <input
            className="admin-input"
            type="number"
            value={form.gstPercent}
            onChange={(e) => setForm((p) => ({ ...p, gstPercent: e.target.value }))}
          />
        </div>
        <div>
          <label className="admin-label">Valid until</label>
          <input
            className="admin-input"
            type="date"
            value={form.validityDate || ""}
            onChange={(e) => setForm((p) => ({ ...p, validityDate: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-medium">Client</h2>
        {["name", "email", "phone"].map((key) => (
          <div key={key}>
            <label className="admin-label capitalize">{key}</label>
            <input
              className="admin-input"
              required={key !== "email"}
              value={form.client[key]}
              onChange={(e) => setClient(key, e.target.value)}
            />
          </div>
        ))}
        <div>
          <label className="admin-label">City</label>
          <select
            className="admin-input"
            value={form.client.city}
            onChange={(e) => setClient("city", e.target.value)}
          >
            {SITE.cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-medium">Event</h2>
        <div>
          <label className="admin-label">Type</label>
          <select
            className="admin-input"
            value={form.event.type}
            onChange={(e) => setEvent("type", e.target.value)}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label">Date</label>
          <input
            className="admin-input"
            type="date"
            value={form.event.date || ""}
            onChange={(e) => setEvent("date", e.target.value)}
          />
        </div>
        <div>
          <label className="admin-label">Venue</label>
          <input
            className="admin-input"
            value={form.event.venue}
            onChange={(e) => setEvent("venue", e.target.value)}
          />
        </div>
        <div>
          <label className="admin-label">Guests</label>
          <input
            className="admin-input"
            type="number"
            value={form.event.guestCount || ""}
            onChange={(e) => setEvent("guestCount", e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-medium">Line items</h2>
          <button type="button" onClick={addLine} className="text-sm underline">
            Add line
          </button>
        </div>
        <div className="space-y-3">
          {form.lineItems.map((line, i) => (
            <div key={i} className="grid gap-2 md:grid-cols-[2fr_0.7fr_0.7fr_0.9fr_auto]">
              <input
                className="admin-input"
                placeholder="Description"
                value={line.description}
                onChange={(e) => setLine(i, "description", e.target.value)}
                required
              />
              <input
                className="admin-input"
                type="number"
                placeholder="Qty"
                value={line.qty}
                onChange={(e) => setLine(i, "qty", e.target.value)}
              />
              <input
                className="admin-input"
                placeholder="Unit"
                value={line.unit}
                onChange={(e) => setLine(i, "unit", e.target.value)}
              />
              <input
                className="admin-input"
                type="number"
                placeholder="Rate"
                value={line.rate}
                onChange={(e) => setLine(i, "rate", e.target.value)}
              />
              <button type="button" className="text-sm text-red-600" onClick={() => removeLine(i)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-1 text-right text-sm">
          <p>Subtotal: {formatINR(totals.subtotal)}</p>
          <p>
            GST ({totals.gstPercent}%): {formatINR(totals.gst)} (CGST {formatINR(totals.cgst)} +
            SGST {formatINR(totals.sgst)})
          </p>
          <p className="text-base font-semibold">Grand total: {formatINR(totals.grandTotal)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <label className="admin-label">Notes</label>
        <textarea
          className="admin-input"
          rows={4}
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm text-white">
          {initial?.id ? "Update quotation" : "Create quotation"}
        </button>
        {initial?.id && (
          <a
            href={`/api/quotations/${initial.id}/pdf`}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-zinc-300 px-4 py-2.5 text-sm"
          >
            Download PDF
          </a>
        )}
        {message && <span className="text-sm text-zinc-600">{message}</span>}
      </div>

      {initial?.id && (
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Send to client
          </p>
          <QuoteSendActions
            quote={{
              id: initial.id,
              quoteNumber: initial.quoteNumber,
              client: form.client,
              event: form.event,
              lineItems: form.lineItems.map((l) => ({
                ...l,
                amount: calcLineAmount(l.qty, l.rate),
              })),
              subtotal: totals.subtotal,
              gst: totals.gst,
              grandTotal: totals.grandTotal,
              notes: form.notes,
            }}
          />
        </div>
      )}
    </form>
  );
}
