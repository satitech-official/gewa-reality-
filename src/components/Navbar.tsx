"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const links = [
  { href: "/", label: "Home", note: "Begin in Goa" },
  { href: "/properties", label: "Properties", note: "A considered collection" },
  { href: "/locations", label: "Locations", note: "The addresses that matter" },
  { href: "/invest", label: "Invest in Goa", note: "A longer view" },
  { href: "/about", label: "Our story", note: "Local, by design" },
  { href: "/insights", label: "Insights", note: "For informed decisions" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${scrolled ? "px-2 pt-2 md:px-5" : "px-0 pt-0"}`}>
        <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 transition-all duration-500 md:px-8 ${scrolled ? "border border-white/10 bg-obsidian/75 shadow-[0_12px_40px_rgba(0,0,0,.16)] backdrop-blur-xl" : ""}`}>
          <Link href="/" className="group relative flex items-baseline gap-1 text-champagne"><span className="font-[Cormorant_Garamond] text-[27px] font-semibold leading-none tracking-[.08em]">GEWA</span><span className="font-[Manrope] text-[8px] tracking-[.31em] text-sand/75">REALTY</span><span className="absolute -bottom-2 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" /></Link>
          <div className="hidden items-center gap-7 xl:flex">{links.slice(1, 5).map((link) => <Link key={link.href} href={link.href} className="relative py-2 font-[Manrope] text-[10px] tracking-[.14em] text-sand/75 uppercase transition-colors hover:text-champagne"><span>{link.label}</span><span className="absolute bottom-0 left-0 h-px w-0 bg-champagne transition-all duration-300 hover:w-full" /></Link>)}</div>
          <div className="flex items-center gap-3"><Link href="/contact" className="hidden items-center gap-2 border border-champagne/50 px-4 py-2.5 font-[Manrope] text-[10px] font-semibold tracking-[.13em] text-champagne uppercase transition-colors hover:bg-champagne hover:text-obsidian md:flex">Enquire now <ArrowUpRight size={13} /></Link><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hidden p-2 text-sand/65 transition-colors hover:text-champagne sm:block" aria-label="Message Gewa Realty on WhatsApp"><MessageCircle size={18} /></a><button type="button" onClick={() => setMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-sand transition-colors hover:border-champagne hover:text-champagne" aria-label="Open menu"><Menu size={17} /></button></div>
        </div>
      </nav>

      <AnimatePresence>{menuOpen ? <motion.div initial={{ clipPath: "circle(0% at calc(100% - 45px) 45px)" }} animate={{ clipPath: "circle(150% at calc(100% - 45px) 45px)" }} exit={{ clipPath: "circle(0% at calc(100% - 45px) 45px)" }} transition={{ duration: .75, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[120] overflow-y-auto bg-obsidian"><div className="relative min-h-full overflow-hidden"><div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 78% 20%, rgba(212,168,79,.22), transparent 17%), linear-gradient(120deg, transparent 45%, rgba(225,189,114,.07) 45.1%, transparent 45.2%)" }} /><div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-8"><Link href="/" onClick={() => setMenuOpen(false)} className="text-champagne"><span className="font-[Cormorant_Garamond] text-[27px] font-semibold tracking-[.08em]">GEWA</span><span className="ml-1 font-[Manrope] text-[8px] tracking-[.31em] text-sand/75">REALTY</span></Link><button type="button" onClick={() => setMenuOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-sand transition-colors hover:border-champagne hover:text-champagne" aria-label="Close menu"><X size={18} /></button></div><div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pb-12 pt-8 md:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:pt-14"><div>{links.map((link, index) => <motion.div key={link.href} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 + index * .07, duration: .55 }}><Link href={link.href} onClick={() => setMenuOpen(false)} className="group flex items-baseline gap-4 border-b border-white/10 py-3.5 md:py-4"><span className="font-[Manrope] text-[9px] tracking-[.16em] text-champagne/70">0{index + 1}</span><span className="font-[Cormorant_Garamond] text-[clamp(2.4rem,5vw,4.7rem)] font-light leading-none text-sand transition-all duration-300 group-hover:pl-3 group-hover:text-champagne">{link.label}</span><span className="hidden font-[Manrope] text-[10px] tracking-[.1em] text-sand/40 uppercase md:inline">{link.note}</span></Link></motion.div>)}</div><motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .4, duration: .65 }} className="shape-arch relative min-h-[400px] overflow-hidden border border-champagne/20"><img src="/images/villa-candolim.jpg" alt="Featured Goa villa" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7"><p className="font-[Manrope] text-[10px] tracking-[.2em] text-champagne uppercase">A private view</p><h2 className="mt-3 font-[Cormorant_Garamond] text-4xl font-light text-sand">Find the place that feels like yours.</h2><Link href="/find-property" onClick={() => setMenuOpen(false)} className="mt-5 inline-flex items-center gap-2 font-[Manrope] text-[10px] tracking-[.15em] text-champagne uppercase">Start your search <ArrowUpRight size={14} /></Link></div></motion.div></div><div className="relative mx-auto flex max-w-[1440px] flex-col justify-between gap-4 border-t border-white/10 px-5 py-6 font-[Manrope] text-[10px] tracking-[.12em] text-sand/45 uppercase md:flex-row md:px-8"><span>Goa · India</span><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-champagne">WhatsApp a property advisor</a></div></div></motion.div> : null}</AnimatePresence>
    </>
  );
}
