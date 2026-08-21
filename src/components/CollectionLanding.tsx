import Link from "next/link";
import { ArrowUpRight, Check, Compass } from "lucide-react";
import PageHero from "@/components/PageHero";
import type { ReactNode } from "react";

type CollectionLandingProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  heroImage: string;
  number: string;
  collectionName: string;
  href: string;
  gallery: [string, string, string];
  points: string[];
  insight: string;
};

export default function CollectionLanding({ eyebrow, title, description, heroImage, number, collectionName, href, gallery, points, insight }: CollectionLandingProps) {
  return (
    <main className="interior-page min-h-screen bg-pearl">
      <PageHero eyebrow={eyebrow} title={title} description={description} image={heroImage} number={number} />
      <section className="section-spacing relative overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div className="relative min-h-[390px] sm:min-h-[480px]" data-reveal>
            <img src={gallery[0]} alt="Goa real estate" className="shape-tall absolute inset-y-0 left-0 h-[88%] w-[70%] object-cover shadow-[0_25px_55px_rgba(0,0,0,.3)]" />
            <img src={gallery[1]} alt="Goa lifestyle" className="shape-arch absolute right-0 top-0 h-[50%] w-[44%] border border-champagne/25 object-cover shadow-[0_25px_55px_rgba(0,0,0,.3)]" />
            <div className="concave-corner absolute bottom-0 right-[5%] w-[50%] border border-champagne/30 bg-obsidian p-5 shadow-[0_25px_55px_rgba(0,0,0,.4)]"><span className="font-[Manrope] text-[9px] tracking-[.18em] text-champagne uppercase">The GEWA edit</span><p className="mt-3 font-[Cormorant_Garamond] text-2xl font-light leading-[.95] text-sand">Spaces selected for the way Goa is actually lived.</p></div>
          </div>
          <div data-reveal data-reveal-delay=".1"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/35 text-champagne"><Compass size={16} /></span><h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(2.8rem,4vw,4.5rem)] font-light leading-[.86] text-sand">Made for a <i className="text-champagne">different rhythm.</i></h2><p className="mt-6 max-w-md font-[Manrope] text-sm leading-7 text-sand/58">{insight}</p><ul className="mt-7 space-y-3">{points.map((point) => <li key={point} className="flex items-center gap-3 border-b border-white/10 pb-3 font-[Manrope] text-[11px] tracking-[.1em] text-sand/72 uppercase"><Check size={14} className="text-champagne" />{point}</li>)}</ul><Link href={href} className="luxury-button mt-8">Explore {collectionName} <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>
      <section className="border-y border-champagne/15 bg-obsidian"><div className="mx-auto grid max-w-[1440px] grid-cols-1 px-5 md:grid-cols-3 md:px-8"><div className="py-7 md:border-r md:border-white/10"><span className="font-[Manrope] text-[9px] tracking-[.18em] text-sand/45 uppercase">01 — Considered discovery</span></div><div className="py-7 md:border-r md:border-white/10"><span className="font-[Manrope] text-[9px] tracking-[.18em] text-sand/45 uppercase">02 — Local market context</span></div><div className="py-7"><span className="font-[Manrope] text-[9px] tracking-[.18em] text-sand/45 uppercase">03 — Guided site visits</span></div></div></section>
    </main>
  );
}
