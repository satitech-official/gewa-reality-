"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Building2, Users, Calendar, TreePine, Store, Settings, FileText, TrendingUp, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/site-visits", label: "Site Visits", icon: Calendar },
  { href: "/admin/sellers", label: "Sellers", icon: TreePine },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell min-h-screen bg-sand flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-obsidian transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-white/5">
          <h1 className="font-[Cormorant_Garamond] text-2xl text-champagne font-semibold">GEWA REALTY</h1>
          <p className="font-[Manrope] text-[9px] tracking-[0.3em] uppercase text-sand/30 mt-1">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sand/50 hover:text-champagne hover:bg-white/5 transition-colors font-[Manrope] text-sm">
              <item.icon size={16} /> {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sand/30 hover:text-sand/50 font-[Manrope] text-xs">
            <LogOut size={14} /> View Website
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-h-screen">
        <header className="sticky top-0 z-20 border-b border-olive/10 bg-pearl/90 px-5 py-4 backdrop-blur-xl md:px-8 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2" aria-label="Open sidebar">
            <Home size={18} />
          </button>
          <span className="font-[Manrope] text-[10px] tracking-[.16em] uppercase text-olive/70">Admin Panel · Gewa Realty</span>
        </header>
        <main className="p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
