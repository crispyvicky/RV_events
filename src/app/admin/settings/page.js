"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    companyName: "RV EVENTS",
    email: "",
    phone: "",
    address: "",
    gstPercent: 18,
    quotePrefix: "RVQ",
    cities: "Hyderabad, Kakinada",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (!d.settings) return;
        setForm({
          companyName: d.settings.companyName || "",
          email: d.settings.email || "",
          phone: d.settings.phone || "",
          address: d.settings.address || "",
          gstPercent: d.settings.gstPercent || 18,
          quotePrefix: d.settings.quotePrefix || "RVQ",
          cities: (d.settings.cities || []).join(", "),
        });
      });
  }, []);

  function update(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function save(e) {
    e.preventDefault();
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        gstPercent: Number(form.gstPercent),
        cities: form.cities
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    });
    const data = await res.json();
    setMessage(res.ok ? "Settings saved" : data.error || "Failed");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-zinc-500">Company profile & quotation defaults</p>
      </div>
      <form onSubmit={save} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5">
        {[
          ["companyName", "Company name"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["address", "Address"],
          ["quotePrefix", "Quote number prefix"],
          ["gstPercent", "Default GST %"],
          ["cities", "Cities (comma separated)"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="admin-label">{label}</label>
            <input className="admin-input" name={name} value={form[name]} onChange={update} />
          </div>
        ))}
        <button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white">
          Save settings
        </button>
        {message && <p className="text-sm text-zinc-600">{message}</p>}
      </form>
    </div>
  );
}
