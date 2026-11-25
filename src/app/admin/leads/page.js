"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LEAD_STATUSES } from "@/lib/constants";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);

  async function load() {
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data.leads || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id, status) {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Leads</h1>
        <p className="text-sm text-zinc-500">Contact & Get Quote inquiries</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-zinc-50 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-zinc-500">
                  No leads yet. Submit the contact or get-quote form on the site.
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b align-top">
                <td className="px-4 py-3">
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-zinc-500">{lead.email}</p>
                  <p className="text-zinc-500">{lead.phone}</p>
                  <p className="text-zinc-500">{lead.city}</p>
                </td>
                <td className="px-4 py-3">
                  <p>{lead.eventType}</p>
                  <p className="text-zinc-500">{lead.eventDate || "—"}</p>
                  <p className="mt-2 max-w-xs text-zinc-600">{lead.message}</p>
                </td>
                <td className="px-4 py-3 capitalize">{lead.source}</td>
                <td className="px-4 py-3">
                  <select
                    className="admin-input"
                    value={lead.status || "new"}
                    onChange={(e) => setStatus(lead.id, e.target.value)}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/quotations/new?leadId=${lead.id}`}
                    className="underline"
                  >
                    Create quote
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
