"use client";

import { useState } from "react";
import { EVENT_TYPES, SITE } from "@/lib/constants";

const initial = {
  name: "",
  email: "",
  phone: "",
  city: "Hyderabad",
  eventType: "Wedding",
  eventDate: "",
  guestCount: "",
  budget: "",
  message: "",
};

export default function LeadForm({ mode = "contact" }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const isQuote = mode === "quote";

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: isQuote ? "get-quote" : "contact",
          guestCount: form.guestCount ? Number(form.guestCount) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setForm(initial);
      setStatus({
        type: "ok",
        message: isQuote
          ? "Thank you. Our team will prepare a tailored quotation shortly."
          : "Message received. We will be in touch soon.",
      });
    } catch (err) {
      setStatus({ type: "err", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={update}
            className="input-field"
          />
        </div>
        <div>
          <label className="label-field" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={update}
            className="input-field"
          />
        </div>
        <div>
          <label className="label-field" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            required
            value={form.phone}
            onChange={update}
            className="input-field"
          />
        </div>
        <div>
          <label className="label-field" htmlFor="city">
            City
          </label>
          <select
            id="city"
            name="city"
            value={form.city}
            onChange={update}
            className="input-field"
          >
            {SITE.cities.map((c) => (
              <option key={c} value={c} className="text-black">
                {c}
              </option>
            ))}
            <option value="Other" className="text-black">
              Other
            </option>
          </select>
        </div>
      </div>

      {isQuote && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="label-field" htmlFor="eventType">
              Event type
            </label>
            <select
              id="eventType"
              name="eventType"
              value={form.eventType}
              onChange={update}
              className="input-field"
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t} className="text-black">
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field" htmlFor="eventDate">
              Preferred date
            </label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              value={form.eventDate}
              onChange={update}
              onClick={(e) => {
                try {
                  e.currentTarget.showPicker?.();
                } catch {
                  /* unsupported browsers fall back to native */
                }
              }}
              onFocus={(e) => {
                try {
                  e.currentTarget.showPicker?.();
                } catch {
                  /* unsupported browsers fall back to native */
                }
              }}
              className="input-field input-date"
              min={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div>
            <label className="label-field" htmlFor="guestCount">
              Guest count
            </label>
            <input
              id="guestCount"
              name="guestCount"
              type="number"
              min="1"
              value={form.guestCount}
              onChange={update}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field" htmlFor="budget">
              Approximate budget
            </label>
            <input
              id="budget"
              name="budget"
              placeholder="e.g. 8–12 lakhs"
              value={form.budget}
              onChange={update}
              className="input-field"
            />
          </div>
        </div>
      )}

      <div>
        <label className="label-field" htmlFor="message">
          {isQuote ? "Tell us about the celebration" : "Message"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={update}
          className="input-field resize-y"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? "Sending…" : isQuote ? "Request quotation" : "Send message"}
      </button>

      {status.message && (
        <p
          className={`font-body text-sm ${
            status.type === "ok" ? "text-[var(--color-accent-soft)]" : "text-red-300"
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
