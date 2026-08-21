"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image: string;
  number?: string;
};

export default function PageHero({ eyebrow, title, description, image, number = "01" }: PageHeroProps) {
  return (
    <section className="page-hero relative isolate overflow-hidden pt-32 md:pt-40">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,17,27,.94),rgba(4,17,27,.66)_48%,rgba(4,17,27,.4))]" />
      <div className="page-hero-grid absolute inset-0 -z-10" />
      <div className="relative mx-auto grid min-h-[370px] max-w-[1440px] px-5 pb-12 md:min-h-[440px] md:px-8 md:pb-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, ease: [0.16, 1, .3, 1] }} className="self-end max-w-4xl">
          <div className="flex items-center gap-3"><span className="h-px w-9 bg-champagne" /><p className="font-[Manrope] text-[10px] tracking-[.3em] text-champagne uppercase">{eyebrow}</p></div>
          <h1 className="mt-5 font-[Cormorant_Garamond] text-[clamp(3.5rem,7vw,6.8rem)] font-light leading-[.82] tracking-[-.045em] text-sand">{title}</h1>
          {description ? <p className="mt-6 max-w-xl font-[Manrope] text-sm leading-7 text-sand/60">{description}</p> : null}
        </motion.div>
        <span className="absolute bottom-12 right-5 font-[Cormorant_Garamond] text-6xl font-light text-champagne/45 md:bottom-16 md:right-8 md:text-8xl">{number}</span>
      </div>
    </section>
  );
}
