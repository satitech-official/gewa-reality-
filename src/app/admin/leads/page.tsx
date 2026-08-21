"use client";

import { useState, useEffect } from "react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads").then(r => r.json()).then(d => { setLeads(d.leads || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-[Cormorant_Garamond] text-3xl text-obsidian font-light mb-6">Leads</h1>
      {loading ? <p className="font-[Manrope] text-xs text-olive/40">Loading...</p> : (
        <div className="bg-white border border-olive/10 overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-olive/5">
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Name</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Contact</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Type</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Source</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Message</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Date</th>
            </tr></thead>
            <tbody className="divide-y divide-olive/5">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3 font-[Manrope] text-sm text-obsidian">{lead.name}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60">{lead.phone || lead.email || "—"}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60">{lead.enquiryType || "—"}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60 capitalize">{lead.source}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60 max-w-xs truncate">{lead.message || "—"}</td>
                  <td className="px-4 py-3 font-[Manrope] text-[10px] text-olive/30">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && <p className="px-4 py-8 font-[Manrope] text-xs text-olive/40 text-center">No leads yet.</p>}
        </div>
      )}
    </div>
  );
}
