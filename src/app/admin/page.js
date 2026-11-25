"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [seedMsg, setSeedMsg] = useState("");

  async function load() {
    const res = await fetch("/api/dashboard");
    if (res.ok) setStats(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function seed() {
    setSeedMsg("Seeding…");
    const res = await fetch("/api/seed", { method: "POST" });
    const data = await res.json();
    setSeedMsg(data.message || data.error || "Done");
    load();
  }

  const cards = [
    { label: "Leads", value: stats?.leadsTotal ?? "—", href: "/admin/leads" },
    { label: "New leads", value: stats?.leadsNew ?? "—", href: "/admin/leads" },
    { label: "Quotations", value: stats?.quotes?.total ?? "—", href: "/admin/quotations" },
    { label: "Accepted", value: stats?.quotes?.accepted ?? "—", href: "/admin/quotations" },
    { label: "Services", value: stats?.services ?? "—", href: "/admin/services" },
    { label: "Portfolio", value: stats?.projects ?? "—", href: "/admin/portfolio" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Overview of leads, quotations, and content
          </p>
        </div>
        <button
          type="button"
          onClick={seed}
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm"
        >
          Seed defaults
        </button>
      </div>
      {seedMsg && <p className="mt-2 text-sm text-zinc-600">{seedMsg}</p>}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
          </Link>
        ))}
      </div>

      {stats?.quotes && (
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-medium">Quote pipeline</h2>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {["draft", "sent", "accepted", "rejected", "expired"].map((s) => (
              <span key={s} className="rounded-full bg-zinc-100 px-3 py-1 capitalize">
                {s}: {stats.quotes[s] || 0}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
