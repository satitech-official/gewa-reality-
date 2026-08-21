"use client";

import { useState, useEffect } from "react";

export default function AdminSiteVisitsPage() {
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/site-visits").then(r => r.json()).then(d => { setVisits(d.siteVisits || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-[Cormorant_Garamond] text-3xl text-obsidian font-light mb-6">Site Visits</h1>
      {loading ? <p className="font-[Manrope] text-xs text-olive/40">Loading...</p> : (
        <div className="bg-white border border-olive/10 overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-olive/5">
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Name</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Phone</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Date</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Status</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Created</th>
            </tr></thead>
            <tbody className="divide-y divide-olive/5">
              {visits.map((v) => (
                <tr key={v.id}>
                  <td className="px-4 py-3 font-[Manrope] text-sm text-obsidian">{v.name}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60">{v.phone}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60">{v.preferredDate || "—"}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 font-[Manrope] text-[9px] tracking-[0.1em] uppercase bg-olive/10 text-olive">{v.status}</span></td>
                  <td className="px-4 py-3 font-[Manrope] text-[10px] text-olive/30">{new Date(v.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {visits.length === 0 && <p className="px-4 py-8 font-[Manrope] text-xs text-olive/40 text-center">No site visit requests yet.</p>}
        </div>
      )}
    </div>
  );
}
