"use client";

import { useEffect, useState } from "react";

const empty = {
  title: "",
  slug: "",
  subtitle: "",
  category: "Custom",
  excerpt: "",
  description: "",
  image: "",
  featured: false,
  order: 99,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data.services || []);
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
    setMessage("");
    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { ...form, id: editingId } : form;
    const res = await fetch("/api/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
      setMessage("Default/demo items are read-only until seeded into MongoDB");
      return;
    }
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    load();
  }

  function edit(service) {
    setEditingId(service.id || null);
    setForm({
      title: service.title || "",
      slug: service.slug || "",
      subtitle: service.subtitle || "",
      category: service.category || "Custom",
      excerpt: service.excerpt || "",
      description: service.description || "",
      image: service.image || "",
      featured: Boolean(service.featured),
      order: service.order || 99,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Services</h1>
        <p className="text-sm text-zinc-500">CRUD for public service pages</p>
      </div>

      <form onSubmit={save} className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
        {[
          ["title", "Title"],
          ["slug", "Slug"],
          ["subtitle", "Subtitle"],
          ["category", "Category"],
          ["image", "Image URL"],
          ["order", "Order"],
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
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" checked={form.featured} onChange={update} />
          Featured on home
        </label>
        <div className="flex items-center gap-3 md:col-span-2">
          <button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              className="text-sm text-zinc-500"
              onClick={() => {
                setEditingId(null);
                setForm(empty);
              }}
            >
              Cancel
            </button>
          )}
          {message && <span className="text-sm text-zinc-600">{message}</span>}
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-zinc-50 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id || s.slug} className="border-b">
                <td className="px-4 py-3">{s.title}</td>
                <td className="px-4 py-3">{s.category}</td>
                <td className="px-4 py-3">{s.order}</td>
                <td className="px-4 py-3 space-x-3">
                  <button type="button" className="text-zinc-700 underline" onClick={() => edit(s)}>
                    Edit
                  </button>
                  <button type="button" className="text-red-600 underline" onClick={() => remove(s.id)}>
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
