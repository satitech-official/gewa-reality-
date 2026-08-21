"use client";

import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-center px-6">
        <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-champagne/50 mb-4">500</p>
        <h1 className="font-[Cormorant_Garamond] text-[clamp(2rem,5vw,4rem)] text-sand font-light mb-4">Something went wrong.</h1>
        <p className="font-[Manrope] text-sm text-sand/40 mb-8">We&apos;re working on fixing this. Please try again.</p>
        <Link href="/" className="inline-block px-8 py-4 bg-champagne text-obsidian font-[Manrope] text-xs tracking-[0.15em] uppercase font-semibold hover:bg-champagne-light transition-colors">
          Go Home
        </Link>
      </div>
    </main>
  );
}
