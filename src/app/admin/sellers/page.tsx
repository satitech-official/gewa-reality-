"use client";

import { useState, useEffect } from "react";

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sell-property").then(r => r.json()).then(d => { setSellers(d.submissions || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-[Cormorant_Garamond] text-3xl text-obsidian font-light mb-6">Seller Submissions</h1>
      {loading ? <p>Loading...</p> : (
        <div className="bg-white border border-olive/10 overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-olive/5">
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Owner</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Phone</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Type</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Location</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Status</th>
              <th className="px-4 py-3 text-left font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40">Date</th>
            </tr></thead>
            <tbody className="divide-y divide-olive/5">
              {sellers.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 font-[Manrope] text-sm text-obsidian">{s.ownerName}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60">{s.phone}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60">{s.propertyType || "—"}</td>
                  <td className="px-4 py-3 font-[Manrope] text-xs text-olive/60">{s.location || "—"}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 font-[Manrope] text-[9px] tracking-[0.1em] uppercase bg-olive/10 text-olive">{s.status}</span></td>
                  <td className="px-4 py-3 font-[Manrope] text-[10px] text-olive/30">{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {sellers.length === 0 && <p className="px-4 py-8 font-[Manrope] text-xs text-olive/40 text-center">No seller submissions yet.</p>}
        </div>
      )}
    </div>
  );
}
