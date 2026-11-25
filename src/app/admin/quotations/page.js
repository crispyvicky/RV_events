"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/quotes";

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState([]);

  async function load() {
    const res = await fetch("/api/quotations");
    const data = await res.json();
    setQuotations(data.quotations || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!confirm("Delete quotation?")) return;
    await fetch(`/api/quotations?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Quotations</h1>
          <p className="text-sm text-zinc-500">Premium quotation management</p>
        </div>
        <Link
          href="/admin/quotations/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white"
        >
          New quotation
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-zinc-50 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3">Number</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-zinc-500">
                  No quotations yet.
                </td>
              </tr>
            )}
            {quotations.map((q) => (
              <tr key={q.id} className="border-b">
                <td className="px-4 py-3 font-medium">{q.quoteNumber}</td>
                <td className="px-4 py-3">{q.client?.name}</td>
                <td className="px-4 py-3">{q.event?.type}</td>
                <td className="px-4 py-3">{formatINR(q.grandTotal)}</td>
                <td className="px-4 py-3 capitalize">{q.status}</td>
                <td className="space-x-3 px-4 py-3">
                  <Link href={`/admin/quotations/${q.id}`} className="underline">
                    Edit
                  </Link>
                  <a href={`/api/quotations/${q.id}/pdf`} className="underline" target="_blank" rel="noreferrer">
                    PDF
                  </a>
                  <Link href={`/admin/quotations/${q.id}`} className="underline text-emerald-700">
                    Send
                  </Link>
                  <button type="button" className="text-red-600 underline" onClick={() => remove(q.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
