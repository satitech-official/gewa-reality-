"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Building2, ChevronRight, CircleDollarSign, MapPin, MoveRight, Sparkles, TrendingUp, Waves } from "lucide-react";
import { formatPrice } from "@/lib/constants";

export type PremiumProperty = {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  price: string | null;
  priceOnRequest: boolean | null;
  bedrooms: number | null;
  bathrooms: number | null;
  builtUpArea: string | null;
  heroImage: string | null;
  status: string | null;
};

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 1100;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target]);
  return <>{value}{suffix}</>;
}

function InvestmentCalculator() {
  const [price, setPrice] = useState(50000000);
  const [rent, setRent] = useState(3600000);
  const [occupancy, setOccupancy] = useState(68);
  const [years, setYears] = useState(5);
  const annualIncome = rent * (occupancy / 100);
  const netYield = (annualIncome * 0.76 / price) * 100;
  const projection = price * Math.pow(1.1, years) + annualIncome * years;
  const money = (amount: number) => `₹${(amount / 10000000).toFixed(amount >= 100000000 ? 1 : 2)} Cr`;

  return (
    <section className="section-spacing relative overflow-hidden bg-obsidian">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 85% 20%, rgba(212,168,79,.3), transparent 20%), radial-gradient(circle at 16% 85%, rgba(18,67,74,.35), transparent 25%)" }} />
      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div data-reveal>
          <p className="mb-3 font-[Manrope] text-[10px] tracking-[.3em] text-champagne uppercase">Investment intelligence</p>
          <h2 className="max-w-xl font-[Cormorant_Garamond] text-[clamp(3rem,5vw,5.2rem)] font-light leading-[.88] tracking-[-.045em] text-sand">Goa feels good.<br /><span className="italic text-champagne">It can perform, too.</span></h2>
          <p className="mt-6 max-w-md font-[Manrope] text-sm leading-7 text-sand/55">Explore how purchase price, seasonality and time horizon can change a property&apos;s potential. These figures are illustrative, not investment advice.</p>
          <div className="mt-9 grid max-w-md grid-cols-2 gap-3">
            {[{ value: "8–12%", label: "Potential gross yield" }, { value: "15–20%", label: "5-year appreciation" }].map((item) => <div key={item.label} className="shape-tall border border-champagne/20 bg-deep-ocean/70 p-4"><strong className="block font-[Cormorant_Garamond] text-3xl font-light text-champagne">{item.value}</strong><span className="mt-1 block font-[Manrope] text-[10px] tracking-[.1em] text-sand/50 uppercase">{item.label}</span></div>)}
          </div>
        </div>

        <div className="relative border border-white/10 bg-[#0b2732]/80 p-5 shadow-[0_30px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7" data-reveal data-reveal-delay=".12">
          <div className="mb-8 flex items-start justify-between gap-5"><div><p className="font-[Manrope] text-[10px] tracking-[.25em] text-champagne uppercase">Illustrative return calculator</p><h3 className="mt-2 font-[Cormorant_Garamond] text-3xl font-light text-sand">Build your perspective</h3></div><CircleDollarSign className="text-champagne" size={26} /></div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Purchase price", price, 20000000, 120000000, 1000000, setPrice, money(price)],
              ["Expected annual rent", rent, 1000000, 10000000, 100000, setRent, money(rent)],
              ["Occupancy", occupancy, 30, 95, 1, setOccupancy, `${occupancy}%`],
              ["Holding period", years, 1, 10, 1, setYears, `${years} years`],
            ].map(([label, value, min, max, step, setter, display]) => <label key={String(label)} className="block"><span className="mb-3 flex items-center justify-between font-[Manrope] text-[10px] tracking-[.12em] text-sand/55 uppercase"><span>{String(label)}</span><strong className="font-medium text-champagne normal-case tracking-normal">{String(display)}</strong></span><input type="range" min={Number(min)} max={Number(max)} step={Number(step)} value={Number(value)} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} className="gold-range w-full" /></label>)}
          </div>
          <div className="mt-8 grid grid-cols-3 border-t border-white/10 pt-6">
            {[{ label: "Net yield", value: `${netYield.toFixed(1)}%` }, { label: "Annual income", value: money(annualIncome) }, { label: `${years}-year outlook`, value: money(projection) }].map((item) => <div key={item.label} className="border-r border-white/10 px-3 first:pl-0 last:border-0"><span className="block font-[Manrope] text-[9px] tracking-[.1em] text-sand/40 uppercase">{item.label}</span><strong className="mt-1 block font-[Cormorant_Garamond] text-xl font-light text-sand md:text-2xl">{item.value}</strong></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyDeck({ properties }: { properties: PremiumProperty[] }) {
  const [current, setCurrent] = useState(0);
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { damping: 25, stiffness: 180 });
  const property = properties[current];
  const rotate = (index: number) => (index - current) * 5;

  if (!property) return null;
  return (
    <section className="premium-surface section-spacing">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end" data-reveal>
          <div><p className="mb-3 font-[Manrope] text-[10px] tracking-[.3em] text-champagne uppercase">Curated collection</p><h2 className="font-[Cormorant_Garamond] text-[clamp(3rem,5vw,5.2rem)] font-light leading-[.82] tracking-[-.045em] text-sand">Featured<br /><span className="italic text-champagne">properties.</span></h2></div>
          <p className="max-w-sm font-[Manrope] text-sm leading-7 text-sand/50">A small edit of places where architecture, setting and opportunity meet.</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="relative min-h-[390px] touch-pan-y select-none sm:min-h-[500px]" data-reveal>
            {properties.slice(0, 5).map((item, index) => {
              const distance = (index - current + properties.length) % properties.length;
              const position = distance > 2 ? distance - properties.length : distance;
              return <motion.button key={item.id} type="button" drag="x" dragConstraints={{ left: 0, right: 0 }} style={{ ...(index === current ? { x: springX } : {}), zIndex: 10 - Math.abs(position), pointerEvents: Math.abs(position) > 1 ? "none" : "auto" }} onDragEnd={(_, info) => { dragX.set(0); if (info.offset.x < -50) setCurrent((current + 1) % properties.length); if (info.offset.x > 50) setCurrent((current - 1 + properties.length) % properties.length); }} onClick={() => setCurrent(index)} animate={{ x: position * 42, y: Math.abs(position) * 18, rotate: rotate(index), scale: 1 - Math.abs(position) * .05, opacity: Math.abs(position) > 2 ? 0 : 1 }} transition={{ type: "spring", stiffness: 160, damping: 22 }} className="absolute inset-x-[3%] top-0 h-[88%] overflow-hidden text-left shadow-[0_35px_70px_rgba(0,0,0,.45)] first:shape-tall" aria-label={`Select ${item.title}`}>
                <img src={item.heroImage || "/images/hero-goa.jpg"} onError={(event) => { event.currentTarget.src = "/images/hero-goa.jpg"; }} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8"><p className="font-[Manrope] text-[10px] tracking-[.2em] text-champagne uppercase">{item.location || "Goa"}</p><h3 className="mt-2 font-[Cormorant_Garamond] text-3xl font-light text-sand md:text-4xl">{item.title}</h3></div>
              </motion.button>;
            })}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3"><span className="font-[Manrope] text-[10px] tracking-[.18em] text-sand/45 uppercase">Drag to discover</span><div className="flex gap-2">{properties.slice(0, 5).map((item, index) => <button type="button" key={item.id} onClick={() => setCurrent(index)} className={`h-1.5 rounded-full transition-all ${index === current ? "w-8 bg-champagne" : "w-1.5 bg-sand/25"}`} aria-label={`View ${item.title}`} />)}</div></div>
          </div>
          <div data-reveal data-reveal-delay=".12">
            <span className="inline-flex items-center gap-2 rounded-full border border-champagne/30 px-3 py-1 font-[Manrope] text-[9px] tracking-[.16em] text-champagne uppercase"><Sparkles size={11} /> {property.status === "exclusive" ? "Exclusive" : "Selected residence"}</span>
            <h3 className="mt-6 font-[Cormorant_Garamond] text-[clamp(2.5rem,4vw,4.3rem)] font-light leading-[.9] text-sand">{property.title}</h3>
            <p className="mt-3 flex items-center gap-2 font-[Manrope] text-xs tracking-[.12em] text-sand/55 uppercase"><MapPin size={14} className="text-champagne" /> {property.location || "Goa"}</p>
            <p className="mt-8 font-[Cormorant_Garamond] text-4xl font-light text-champagne">{formatPrice(property.price, property.priceOnRequest ?? false)}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-y border-white/10 py-5 font-[Manrope] text-[10px] tracking-[.13em] text-sand/55 uppercase"><span>{property.bedrooms || "—"} beds</span><span>{property.bathrooms || "—"} baths</span><span>{property.builtUpArea || "—"} sq.ft</span></div>
            <Link href={`/property/${property.slug}`} className="mt-8 inline-flex items-center gap-3 font-[Manrope] text-[10px] font-semibold tracking-[.17em] text-champagne uppercase transition-colors hover:text-champagne-light">View residence <span className="grid h-8 w-8 place-items-center rounded-full border border-champagne/40"><ArrowUpRight size={14} /></span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CleanPropertyShowcase({ properties }: { properties: PremiumProperty[] }) {
  const [selected, setSelected] = useState(0);
  const active = properties[selected];
  if (!active) return null;

  return (
    <section className="premium-surface section-spacing">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end" data-reveal>
          <div><p className="mb-3 font-[Manrope] text-[10px] tracking-[.3em] text-champagne uppercase">Curated collection</p><h2 className="font-[Cormorant_Garamond] text-[clamp(3rem,5vw,5.2rem)] font-light leading-[.82] tracking-[-.045em] text-sand">Featured<br /><span className="italic text-champagne">properties.</span></h2></div>
          <p className="max-w-sm font-[Manrope] text-sm leading-7 text-sand/50">A small edit of places where architecture, setting and opportunity meet.</p>
        </div>
        <div className="grid overflow-hidden border border-white/10 bg-[#08202c] shadow-[0_32px_90px_rgba(0,0,0,.28)] lg:grid-cols-[1.1fr_.9fr]" data-reveal>
          <motion.div key={active.id} initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .55, ease: [0.16, 1, .3, 1] }} className="relative min-h-[360px] overflow-hidden md:min-h-[500px]"><img src={active.heroImage || "/images/hero-goa.jpg"} onError={(event) => { event.currentTarget.src = "/images/hero-goa.jpg"; }} alt={active.title} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent" /><div className="absolute bottom-0 left-0 p-6 md:p-9"><span className="font-[Manrope] text-[10px] tracking-[.2em] text-champagne uppercase">{active.location || "Goa"}</span><h3 className="mt-2 font-[Cormorant_Garamond] text-3xl font-light text-sand md:text-5xl">{active.title}</h3></div></motion.div>
          <div className="flex flex-col p-6 md:p-9"><div><span className="inline-flex items-center gap-2 rounded-full border border-champagne/30 px-3 py-1 font-[Manrope] text-[9px] tracking-[.16em] text-champagne uppercase"><Sparkles size={11} /> {active.status === "exclusive" ? "Exclusive" : "Selected residence"}</span><h3 className="mt-7 font-[Cormorant_Garamond] text-[clamp(2.7rem,4vw,4.6rem)] font-light leading-[.86] text-sand">{active.title}</h3><p className="mt-4 flex items-center gap-2 font-[Manrope] text-[10px] tracking-[.14em] text-sand/55 uppercase"><MapPin size={13} className="text-champagne" /> {active.location || "Goa"}</p><p className="mt-9 font-[Cormorant_Garamond] text-4xl font-light text-champagne">{formatPrice(active.price, active.priceOnRequest ?? false)}</p><div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-y border-white/10 py-5 font-[Manrope] text-[10px] tracking-[.13em] text-sand/55 uppercase"><span>{active.bedrooms || "—"} beds</span><span>{active.bathrooms || "—"} baths</span><span>{active.builtUpArea || "—"} sq.ft</span></div><Link href={`/property/${active.slug}`} className="mt-7 inline-flex items-center gap-3 font-[Manrope] text-[10px] font-semibold tracking-[.17em] text-champagne uppercase transition-colors hover:text-champagne-light">View residence <span className="grid h-8 w-8 place-items-center rounded-full border border-champagne/40"><ArrowUpRight size={14} /></span></Link></div><div className="mt-8 grid grid-cols-4 gap-2">{properties.slice(0, 4).map((item, index) => <button type="button" key={item.id} onClick={() => setSelected(index)} className={`relative aspect-[1.15] overflow-hidden border transition-all ${selected === index ? "border-champagne" : "border-transparent opacity-55 hover:opacity-100"}`} aria-label={`Show ${item.title}`}><img src={item.heroImage || "/images/hero-goa.jpg"} alt="" className="h-full w-full object-cover" />{selected === index ? <span className="absolute inset-0 bg-champagne/10" /> : null}</button>)}</div></div>
        </div>
      </div>
    </section>
  );
}

function LocationJourney() {
  const places = [
    { name: "Assagao", zone: "North Goa", count: "24 residences", image: "/images/plot-assagao.jpg", shape: "shape-arch", slug: "assagao" },
    { name: "Vagator", zone: "North Goa", count: "18 residences", image: "/images/hero-goa.jpg", shape: "shape-oval", slug: "vagator" },
    { name: "Siolim", zone: "North Goa", count: "31 residences", image: "/images/villa-siolim.jpg", shape: "shape-tall", slug: "siolim" },
    { name: "Candolim", zone: "North Goa", count: "16 residences", image: "/images/villa-candolim.jpg", shape: "shape-slant", slug: "candolim" },
  ];
  return (
    <section className="section-spacing bg-sand text-obsidian">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end" data-reveal><div><p className="mb-3 font-[Manrope] text-[10px] tracking-[.3em] text-forest uppercase">The coastline edit</p><h2 className="font-[Cormorant_Garamond] text-[clamp(3rem,5vw,5.2rem)] font-light leading-[.82] tracking-[-.05em]">Explore top <span className="italic text-forest">locations.</span></h2></div><Link href="/locations" className="inline-flex items-center gap-2 font-[Manrope] text-[10px] font-semibold tracking-[.15em] text-forest uppercase">View every location <ChevronRight size={15} /></Link></div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {places.map((place, index) => <Link key={place.name} href={`/location/${place.slug}`} data-reveal data-reveal-delay={String(index * .08)} className={`group relative block aspect-[.72] overflow-hidden bg-obsidian ${place.shape}`}><img src={place.image} alt={place.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-4 md:p-5"><span className="font-[Manrope] text-[9px] tracking-[.14em] text-champagne uppercase">{place.zone}</span><h3 className="mt-1 font-[Cormorant_Garamond] text-2xl font-light text-sand md:text-3xl">{place.name}</h3><span className="mt-3 block font-[Manrope] text-[9px] tracking-[.1em] text-sand/55 uppercase">{place.count}</span></div><span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/30 bg-obsidian/30 text-sand opacity-0 transition-all group-hover:opacity-100"><ArrowUpRight size={14} /></span></Link>)}
        </div>
      </div>
    </section>
  );
}

export default function LuxuryHomeSections({ properties }: { properties: PremiumProperty[] }) {
  const trustedProperties = useMemo(() => properties.slice(0, 5), [properties]);
  return (
    <>
      <section className="relative z-20 -mt-1 border-y border-champagne/15 bg-obsidian"><div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 md:grid-cols-4 md:px-8">{[{ value: 500, suffix: "+", label: "Curated properties" }, { value: 10, suffix: "+", label: "Prime locations" }, { value: 250, suffix: "+", label: "Families advised" }, { value: 5, suffix: "+", label: "Years of trust" }].map((item, index) => <div key={item.label} className={`py-7 text-center ${index ? "border-l border-white/10" : ""}`}><strong className="block font-[Cormorant_Garamond] text-3xl font-light text-champagne md:text-4xl"><CountUp target={item.value} suffix={item.suffix} /></strong><span className="mt-1 block font-[Manrope] text-[9px] tracking-[.13em] text-sand/50 uppercase">{item.label}</span></div>)}</div></section>
      <CleanPropertyShowcase properties={trustedProperties} />
      <InvestmentCalculator />
      <LocationJourney />
      <section className="premium-surface section-spacing overflow-hidden"><div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 md:px-8 lg:grid-cols-[1.25fr_.75fr] lg:items-center"><div className="shape-slant relative min-h-[360px] overflow-hidden border border-champagne/20" data-reveal><img src="/images/about-goa.jpg" alt="Goa coastline" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/30 to-transparent" /><div className="relative flex min-h-[360px] max-w-md flex-col justify-end p-7 md:p-10"><p className="font-[Manrope] text-[10px] tracking-[.3em] text-champagne uppercase">A different side of Goa</p><h2 className="mt-3 font-[Cormorant_Garamond] text-5xl font-light leading-[.85] text-sand">The address is<br /><i>only the beginning.</i></h2></div></div><div data-reveal data-reveal-delay=".1"><Waves className="text-champagne" size={28} /><p className="mt-5 font-[Cormorant_Garamond] text-3xl font-light leading-tight text-sand">From quiet village lanes to a coastline that holds its value, we help you choose the rhythm that fits.</p><Link href="/find-property" className="luxury-button mt-7">Find my Goa property <MoveRight size={15} /></Link></div></div></section>
    </>
  );
}
