import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-center px-6">
        <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-champagne/50 mb-4">404</p>
        <h1 className="font-[Cormorant_Garamond] text-[clamp(2rem,5vw,4rem)] text-sand font-light mb-4 leading-tight">
          This property is off the map.
        </h1>
        <p className="font-[Manrope] text-sm text-sand/40 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/properties" className="inline-block px-8 py-4 bg-champagne text-obsidian font-[Manrope] text-xs tracking-[0.15em] uppercase font-semibold hover:bg-champagne-light transition-colors">
          Explore Goa Properties
        </Link>
      </div>
    </main>
  );
}
