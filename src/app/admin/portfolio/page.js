"use client";

import { useEffect, useState } from "react";

const empty = {
  title: "",
  slug: "",
  category: "Wedding",
  city: "Hyderabad",
  year: String(new Date().getFullYear()),
  excerpt: "",
  description: "",
  image: "",
  gallery: "",
  featured: false,
};

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects || []);
  }

  useEffect(() => {
    load();
  }, []);

  function update(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  }

  async function save(e) {
    e.preventDefault();
    const payload = {
      ...form,
      gallery: form.gallery
        ? form.gallery
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    };
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...payload, id: editingId } : payload;
    const res = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Save failed");
      return;
    }
    setForm(empty);
    setEditingId(null);
    setMessage("Saved");
    load();
  }

  async function remove(id) {
    if (!id || id.length < 10) {
      setMessage("Seed into MongoDB before deleting defaults");
      return;
    }
    if (!confirm("Delete project?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    load();
  }

  function edit(p) {
    setEditingId(p.id || null);
    setForm({
      title: p.title || "",
      slug: p.slug || "",
      category: p.category || "Wedding",
      city: p.city || "Hyderabad",
      year: p.year || "",
      excerpt: p.excerpt || "",
      description: p.description || "",
      image: p.image || "",
      gallery: (p.gallery || []).join("\n"),
      featured: Boolean(p.featured),
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Portfolio</h1>
        <p className="text-sm text-zinc-500">Projects & case studies</p>
      </div>

      <form onSubmit={save} className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
        {[
          ["title", "Title"],
          ["slug", "Slug"],
          ["category", "Category"],
          ["city", "City"],
          ["year", "Year"],
          ["image", "Cover image URL"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="admin-label">{label}</label>
            <input className="admin-input" name={name} value={form[name]} onChange={update} required={name === "title"} />
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="admin-label">Excerpt</label>
          <textarea className="admin-input" name="excerpt" rows={2} value={form.excerpt} onChange={update} />
        </div>
        <div className="md:col-span-2">
          <label className="admin-label">Description</label>
          <textarea className="admin-input" name="description" rows={4} value={form.description} onChange={update} />
        </div>
        <div className="md:col-span-2">
          <label className="admin-label">Gallery image URLs (one per line)</label>
          <textarea className="admin-input" name="gallery" rows={4} value={form.gallery} onChange={update} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" checked={form.featured} onChange={update} />
          Featured
        </label>
        <div className="flex items-center gap-3 md:col-span-2">
          <button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white">
            {editingId ? "Update" : "Create"}
          </button>
          {message && <span className="text-sm text-zinc-600">{message}</span>}
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-zinc-50 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id || p.slug} className="border-b">
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3">{p.city}</td>
                <td className="px-4 py-3">{p.year}</td>
                <td className="px-4 py-3 space-x-3">
                  <button type="button" className="underline" onClick={() => edit(p)}>
                    Edit
                  </button>
                  <button type="button" className="text-red-600 underline" onClick={() => remove(p.id)}>
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
