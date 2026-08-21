"use client";

import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight, Play, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";

const locations = ["Assagao", "Vagator", "Siolim", "Morjim", "Candolim", "Dona Paula"];

function parseNaturalSearch(query: string) {
  const lower = query.toLowerCase();
  const location = locations.find((item) => lower.includes(item.toLowerCase())) || "";
  const type = /villa/.test(lower) ? "villa" : /apartment|flat/.test(lower) ? "apartment" : /plot|land/.test(lower) ? "plot" : "";
  const bedroomMatch = lower.match(/(\d+)\s*(bhk|bed|bedroom)/);
  const bedroom = bedroomMatch?.[1] || "";
  const croreMatch = lower.match(/(?:under|below|upto|up to)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:cr|crore)/);
  const lakhMatch = lower.match(/(?:under|below|upto|up to)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:l|lac|lakh)/);
  const budget = croreMatch ? `0-${Math.round(Number(croreMatch[1]) * 10000000)}` : lakhMatch ? `0-${Math.round(Number(lakhMatch[1]) * 100000)}` : "";
  return { location, type, bedroom, budget };
}

export default function Hero() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 70, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 70, damping: 20 });
  const [query, setQuery] = useState("");
  const [purpose, setPurpose] = useState("buy");
  const [showFilm, setShowFilm] = useState(false);

  useEffect(() => {
    const onScroll = () => heroRef.current?.style.setProperty("--hero-progress", String(Math.min(window.scrollY / 900, 1)));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseNaturalSearch(query);
    const params = new URLSearchParams({ listingType: purpose });
    if (query.trim()) params.set("q", query.trim());
    if (parsed.location) params.set("location", parsed.location);
    if (parsed.type) params.set("category", parsed.type);
    if (parsed.bedroom) params.set("bedrooms", parsed.bedroom);
    if (parsed.budget) params.set("budget", parsed.budget);
    router.push(`/properties?${params.toString()}`);
  };

  const parallax = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) / 26);
    y.set((event.clientY - box.top - box.height / 2) / 26);
  };

  return (
    <section ref={heroRef} onMouseMove={parallax} onMouseLeave={() => { x.set(0); y.set(0); }} className="hero-stage relative isolate flex min-h-[820px] overflow-hidden md:min-h-[max(760px,100svh)]">
      <div className="absolute inset-0">
        <motion.img style={{ x, y, scale: 1.08 }} src="/images/hero-goa.jpg" alt="Tropical luxury villa in Goa" className="hero-image h-full w-full object-cover" onError={(event) => { event.currentTarget.src = "/images/villa-candolim.jpg"; }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,17,27,.94)_0%,rgba(4,17,27,.50)_48%,rgba(4,17,27,.32)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,17,27,.98)_0%,rgba(4,17,27,0)_60%)]" />
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="hero-halo absolute -right-40 top-16 h-[38rem] w-[38rem] rounded-full" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <motion.div style={{ x: y, y: x }} className="hero-palm hero-palm-left" />
        <motion.div style={{ x, y }} className="hero-palm hero-palm-right" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-between px-5 pb-7 pt-28 md:px-8 md:pb-10 md:pt-32">
        <div className="flex items-center justify-between" data-reveal>
          <p className="inline-flex items-center gap-3 font-[Manrope] text-[9px] font-medium tracking-[.28em] text-champagne uppercase sm:text-[10px]"><span className="h-px w-7 bg-champagne/70" /> Premium properties. Premium lifestyle.</p>
          <p className="hidden font-[Manrope] text-[10px] tracking-[.18em] text-sand/45 uppercase md:block">Goa, India · 15.2993° N</p>
        </div>

        <div className="relative my-auto max-w-5xl py-12 md:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
            <p className="mb-5 font-[Manrope] text-[10px] tracking-[.34em] text-sand/60 uppercase">Luxury real estate, considered differently</p>
            <h1 className="max-w-4xl font-[Cormorant_Garamond] text-[clamp(4rem,9vw,9rem)] font-light leading-[.78] tracking-[-.055em] text-sand">Discover <span className="block italic text-champagne">Luxury Living</span><span className="block pl-[.18em] md:pl-[.45em]">in Goa.</span></h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-end">
            <p className="max-w-md font-[Manrope] text-sm leading-7 text-sand/64 md:text-[15px]">Handpicked villas, apartments, plots and investment opportunities across Goa&apos;s most desirable locations.</p>
            <div className="flex gap-3">
              <Link href="/properties" className="luxury-button group">Explore properties <ArrowDownRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></Link>
              <button type="button" onClick={() => setShowFilm(true)} className="film-button" aria-label="Watch Goa lifestyle film"><Play size={13} fill="currentColor" /> <span>Our Goa</span></button>
            </div>
          </motion.div>
        </div>

        <div className="hidden items-end justify-between gap-4 lg:flex">
          <motion.div style={{ x, y }} className="hero-float-card max-w-[210px] p-4"><span className="mb-6 block font-[Manrope] text-[9px] tracking-[.2em] text-champagne uppercase">Exclusive collection</span><p className="font-[Cormorant_Garamond] text-xl leading-5 text-sand">Homes that belong to the landscape.</p></motion.div>
          <div className="flex items-center gap-5 font-[Manrope] text-[10px] tracking-[.15em] text-sand/55 uppercase"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne/30 text-champagne">01</span>Scroll to explore<span className="h-12 w-px bg-gradient-to-b from-champagne/70 to-transparent" /></div>
          <motion.div style={{ x: y, y: x }} className="hero-float-card max-w-[210px] p-4"><span className="mb-6 block font-[Manrope] text-[9px] tracking-[.2em] text-champagne uppercase">Live availability</span><p className="font-[Cormorant_Garamond] text-xl leading-5 text-sand">12 exceptional properties recently added.</p></motion.div>
        </div>

        <form onSubmit={goToSearch} className="hero-search-panel mt-7 p-2 md:mt-8 md:p-2.5" data-reveal data-reveal-delay=".1">
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
            <div className="flex rounded-full border border-white/10 bg-black/15 p-1 xl:w-fit">{[["buy", "Buy"], ["rent", "Rent"], ["invest", "Invest"]].map(([value, label]) => <button type="button" key={value} onClick={() => setPurpose(value)} className={`rounded-full px-4 py-2 font-[Manrope] text-[10px] tracking-[.14em] uppercase transition-all ${purpose === value ? "bg-champagne text-obsidian" : "text-sand/55 hover:text-sand"}`}>{label}</button>)}</div>
            <label className="group flex min-w-0 flex-1 items-center gap-3 rounded-full border border-transparent px-4 py-2.5 transition-colors focus-within:border-champagne/45"><Sparkles size={16} className="shrink-0 text-champagne" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent font-[Manrope] text-sm text-sand placeholder:text-sand/38 focus:outline-none" placeholder="Try ‘3 BHK villa in Assagao under ₹5 Cr’" aria-label="Describe the property you are looking for" /></label>
            <Link href="/properties" className="hidden shrink-0 items-center gap-2 px-3 font-[Manrope] text-[10px] tracking-[.13em] text-sand/55 uppercase transition-colors hover:text-champagne md:flex"><SlidersHorizontal size={14} /> Filters</Link>
            <button type="submit" className="luxury-button shrink-0 justify-center"><Search size={15} /> Search</button>
          </div>
        </form>
      </div>

      <AnimatePresence>{showFilm ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] grid place-items-center bg-obsidian/95 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Gewa Goa lifestyle film"><motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="relative w-full max-w-5xl overflow-hidden border border-champagne/25 bg-deep-ocean p-2 shadow-2xl"><button type="button" onClick={() => setShowFilm(false)} className="absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-obsidian/70 text-sand transition-colors hover:border-champagne hover:text-champagne" aria-label="Close lifestyle film"><X size={17} /></button><div className="relative aspect-video overflow-hidden"><img src="/images/about-goa.jpg" alt="Goa coastline at golden hour" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-obsidian/35" /><div className="absolute inset-0 grid place-items-center text-center"><div><span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-champagne bg-obsidian/45 text-champagne"><Play size={17} fill="currentColor" /></span><p className="font-[Manrope] text-[10px] tracking-[.3em] text-sand uppercase">A slower, richer way of living</p><h2 className="mt-3 font-[Cormorant_Garamond] text-4xl text-sand md:text-6xl">Experience Goa Living</h2></div></div></div></motion.div></motion.div> : null}</AnimatePresence>
    </section>
  );
}
