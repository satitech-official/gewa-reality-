"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ properties: 0, leads: 0, siteVisits: 0, sellers: 0 });
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [propRes, leadRes, visitRes, sellRes] = await Promise.all([
          fetch("/api/properties?isPublished=false&limit=1000"),
          fetch("/api/leads"),
          fetch("/api/site-visits"),
          fetch("/api/sell-property"),
        ]);
        const propData = await propRes.json();
        const leadData = await leadRes.json();
        const visitData = await visitRes.json();
        const sellData = await sellRes.json();
        setStats({
          properties: propData.total || 0,
          leads: leadData.leads?.length || 0,
          siteVisits: visitData.siteVisits?.length || 0,
          sellers: sellData.submissions?.length || 0,
        });
        setLeads((leadData.leads || []).slice(0, 5));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="font-[Cormorant_Garamond] text-3xl text-obsidian font-light mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Properties", value: stats.properties, color: "bg-forest" },
          { label: "New Leads", value: stats.leads, color: "bg-champagne" },
          { label: "Site Visits", value: stats.siteVisits, color: "bg-olive" },
          { label: "Seller Requests", value: stats.sellers, color: "bg-obsidian" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-olive/10 p-6">
            <p className="font-[Manrope] text-[10px] tracking-[0.15em] uppercase text-olive/50 mb-2">{stat.label}</p>
            <p className="font-[Cormorant_Garamond] text-3xl text-obsidian">{loading ? "..." : stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-white border border-olive/10">
        <div className="px-6 py-4 border-b border-olive/5">
          <h2 className="font-[Manrope] text-sm font-semibold text-obsidian">Recent Leads</h2>
        </div>
        {leads.length > 0 ? (
          <div className="divide-y divide-olive/5">
            {leads.map((lead) => (
              <div key={lead.id} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="font-[Manrope] text-sm text-obsidian">{lead.name}</p>
                  <p className="font-[Manrope] text-xs text-olive/50">{lead.phone || lead.email || "No contact"}</p>
                </div>
                <div className="text-right">
                  <p className="font-[Manrope] text-xs text-olive/40">{lead.enquiryType || "General"}</p>
                  <p className="font-[Manrope] text-[10px] text-olive/30">{new Date(lead.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="px-6 py-8 font-[Manrope] text-xs text-olive/40 text-center">No leads yet.</p>
        )}
      </div>
    </div>
  );
}
