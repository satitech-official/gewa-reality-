"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { STATUS_LABELS, formatPrice, PROPERTY_CATEGORIES, LISTING_TYPES } from "@/lib/constants";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/properties?isPublished=false&limit=100");
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const handleSave = async () => {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/property/${editing.slug}` : "/api/properties";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, slug: form.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""), propertyId: form.propertyId || `GR-${Date.now().toString(36).toUpperCase()}` }),
    });
    setShowForm(false);
    setEditing(null);
    setForm({});
    load();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this property?")) return;
    await fetch(`/api/property/${slug}`, { method: "DELETE" });
    load();
  };

  const handleTogglePublish = async (prop: any) => {
    await fetch(`/api/property/${prop.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !prop.isPublished }),
    });
    load();
  };

  const openEdit = (prop: any) => {
    setEditing(prop);
    setForm(prop);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[Cormorant_Garamond] text-3xl text-obsidian font-light">Properties</h1>
        <button onClick={() => { setEditing(null); setForm({}); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-forest text-sand font-[Manrope] text-xs tracking-[0.1em] uppercase">
          <Plus size={14} /> Add Property
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-obsidian/80 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-pearl max-w-3xl w-full p-8 my-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-[Cormorant_Garamond] text-2xl text-obsidian mb-6">{editing ? "Edit Property" : "Add Property"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Title</label><input value={form.title || ""} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Property ID</label><input value={form.propertyId || ""} onChange={(e) => setForm({...form, propertyId: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Category</label><select value={form.category || ""} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm"><option value="">Select</option>{PROPERTY_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Listing Type</label><select value={form.listingType || ""} onChange={(e) => setForm({...form, listingType: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm"><option value="">Select</option>{LISTING_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Status</label><select value={form.status || ""} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm"><option value="available">Available</option><option value="new">New</option><option value="featured">Featured</option><option value="exclusive">Exclusive</option><option value="pre_launch">Pre-Launch</option><option value="under_construction">Under Construction</option><option value="ready_to_move">Ready to Move</option><option value="reserved">Reserved</option><option value="sold">Sold</option></select></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Location</label><input value={form.location || ""} onChange={(e) => setForm({...form, location: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Region</label><input value={form.region || ""} onChange={(e) => setForm({...form, region: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" placeholder="North Goa" /></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Price</label><input type="number" value={form.price || ""} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Bedrooms</label><input type="number" value={form.bedrooms || ""} onChange={(e) => setForm({...form, bedrooms: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Bathrooms</label><input type="number" value={form.bathrooms || ""} onChange={(e) => setForm({...form, bathrooms: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Built-up Area</label><input value={form.builtUpArea || ""} onChange={(e) => setForm({...form, builtUpArea: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Plot Area</label><input value={form.plotArea || ""} onChange={(e) => setForm({...form, plotArea: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Hero Image URL</label><input value={form.heroImage || ""} onChange={(e) => setForm({...form, heroImage: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div className="sm:col-span-2"><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Description</label><textarea value={form.description || ""} onChange={(e) => setForm({...form, description: e.target.value})} rows={4} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm resize-none" /></div>
              <div className="sm:col-span-2"><label className="block font-[Manrope] text-[10px] uppercase text-olive/50 mb-1">Short Description</label><input value={form.shortDescription || ""} onChange={(e) => setForm({...form, shortDescription: e.target.value})} className="w-full px-3 py-2 border border-olive/10 font-[Manrope] text-sm" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.isFeatured || false} onChange={(e) => setForm({...form, isFeatured: e.target.checked})} id="featured" /><label htmlFor="featured" className="font-[Manrope] text-xs text-olive">Featured</label></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.isPublished || false} onChange={(e) => setForm({...form, isPublished: e.target.checked})} id="published" /><label htmlFor="published" className="font-[Manrope] text-xs text-olive">Published</label></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="px-6 py-2 bg-forest text-sand font-[Manrope] text-xs tracking-[0.1em] uppercase font-medium">Save</button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-olive/20 font-[Manrope] text-xs">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? <p className="font-[Manrope] text-xs text-olive/40">Loading...</p> : (
        <div className="bg-white border border-olive/10 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-olive/5">
                <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Property</th>
                <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Type</th>
                <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Location</th>
                <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Price</th>
                <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Status</th>
                <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-olive/5">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-sand/30">
                  <td className="px-4 py-3"><p className="font-[Manrope] text-sm text-obsidian">{prop.title}</p><p className="font-[Manrope] text-[10px] text-olive/30">{prop.propertyId}</p></td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60 capitalize">{prop.category}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60">{prop.location || "—"}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-obsidian">{formatPrice(prop.price, prop.priceOnRequest)}</td>
                  <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 font-[Manrope] text-[9px] tracking-[0.1em] uppercase status-${prop.status}`}>{STATUS_LABELS[prop.status] || prop.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(prop)} className="p-1 hover:text-forest transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleTogglePublish(prop)} className="p-1 hover:text-forest transition-colors">{prop.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                      <button onClick={() => handleDelete(prop.slug)} className="p-1 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
