"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SlidersHorizontal, X, ChevronRight, Search as SearchIcon } from "lucide-react";
import { PROPERTY_CATEGORIES, GOA_REGIONS, BUDGET_RANGES, LISTING_TYPES } from "@/lib/constants";
import PageHero from "@/components/PageHero";

export default function PropertiesClient() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    listingType: searchParams.get("listingType") || "",
    location: searchParams.get("location") || "",
    region: searchParams.get("region") || "",
    budget: searchParams.get("budget") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    status: searchParams.get("status") || "",
    sort: searchParams.get("sort") || "latest",
    search: searchParams.get("search") || "",
  });

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
      params.set("page", String(page));
      params.set("limit", "12");
      const res = await fetch(`/api/properties?${params}`);
      const data = await res.json();
      setProperties(data.properties || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void fetchProperties(); }, 0);
    return () => window.clearTimeout(timer);
  }, [fetchProperties]);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ category: "", listingType: "", location: "", region: "", budget: "", bedrooms: "", status: "", sort: "latest", search: "" });
    setPage(1);
  };

  const goaLocations = ["Panjim", "Porvorim", "Mapusa", "Calangute", "Candolim", "Siolim", "Anjuna", "Assagao", "Margao", "Vasco", "Ponda", "Madgaon"];

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow="The collection" title={<>Properties <i className="text-champagne">in Goa.</i></>} description="A considered collection of homes, land and investment opportunities across the state." image="/images/penthouse-calangute.jpg" number="04" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-olive/40" />
            <input
              type="text"
              placeholder="Search by name, location, or property ID..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="form-control w-full rounded-full pl-10 pr-4 py-3 text-sm font-[Manrope] focus:outline-none focus:border-champagne/50"
            />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sand hover:border-champagne/50 transition-colors font-[Manrope] text-xs">
            <SlidersHorizontal size={14} /> Filters
          </button>
          <select value={filters.sort} onChange={(e) => updateFilter("sort", e.target.value)} className="form-control rounded-full px-3 py-3 font-[Manrope] text-xs focus:outline-none">
            <option value="latest">Latest</option>
            <option value="price_asc">Price: Low–High</option>
            <option value="price_desc">Price: High–Low</option>
            <option value="featured">Featured</option>
          </select>
        </div>

        {showFilters && (
          <div className="content-surface shape-tall p-6 mb-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <span className="font-[Manrope] text-xs font-semibold uppercase tracking-[0.1em] text-sand">Filters</span>
              <button onClick={clearFilters} className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-champagne/70 hover:text-champagne">Clear All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-sand/50 mb-1">Type</label>
                <select value={filters.category} onChange={(e) => updateFilter("category", e.target.value)} className="form-control w-full px-2 py-2 text-xs font-[Manrope] focus:outline-none">
                  <option value="">All</option>
                  {PROPERTY_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-sand/50 mb-1">Purpose</label>
                <select value={filters.listingType} onChange={(e) => updateFilter("listingType", e.target.value)} className="form-control w-full px-2 py-2 text-xs font-[Manrope] focus:outline-none">
                  <option value="">All</option>
                  {LISTING_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-sand/50 mb-1">Region</label>
                <select value={filters.region} onChange={(e) => updateFilter("region", e.target.value)} className="form-control w-full px-2 py-2 text-xs font-[Manrope] focus:outline-none">
                  <option value="">All</option>
                  {GOA_REGIONS.map((r) => <option key={r.value} value={r.label}>{r.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-sand/50 mb-1">Location</label>
                <select value={filters.location} onChange={(e) => updateFilter("location", e.target.value)} className="form-control w-full px-2 py-2 text-xs font-[Manrope] focus:outline-none">
                  <option value="">All</option>
                  {goaLocations.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-sand/50 mb-1">Budget</label>
                <select value={filters.budget} onChange={(e) => updateFilter("budget", e.target.value)} className="form-control w-full px-2 py-2 text-xs font-[Manrope] focus:outline-none">
                  <option value="">Any</option>
                  {BUDGET_RANGES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-sand/50 mb-1">Bedrooms</label>
                <select value={filters.bedrooms} onChange={(e) => updateFilter("bedrooms", e.target.value)} className="form-control w-full px-2 py-2 text-xs font-[Manrope] focus:outline-none">
                  <option value="">Any</option>
                  {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}+</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="font-[Manrope] text-xs text-sand/55">{total} properties found</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="shape-tall aspect-[4/3] bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="font-[Cormorant_Garamond] text-2xl text-obsidian mb-3">We may know something that isn&apos;t listed yet.</h3>
            <p className="font-[Manrope] text-sm text-olive/60 mb-6">Tell us what you need and we&apos;ll search for you.</p>
            <Link href="/find-property" className="inline-block px-6 py-3 bg-forest text-sand font-[Manrope] text-xs tracking-[0.12em] uppercase font-medium hover:bg-forest-light transition-colors">
              Tell Us What You Need
            </Link>
          </div>
        )}

        {total > 12 && (
          <div className="flex justify-center gap-2 mt-10">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 border border-olive/10 font-[Manrope] text-xs disabled:opacity-30">Previous</button>
            <span className="px-4 py-2 font-[Manrope] text-xs text-olive">Page {page}</span>
            <button onClick={() => setPage(page + 1)} disabled={properties.length < 12} className="px-4 py-2 border border-olive/10 font-[Manrope] text-xs disabled:opacity-30">Next</button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
