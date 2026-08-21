import { getLocations } from "@/lib/server-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const locs = await getLocations();

  const regions = [
    { name: "North Goa", locs: locs.filter((l) => l.region === "north_goa") },
    { name: "South Goa", locs: locs.filter((l) => l.region === "south_goa") },
    { name: "Central Goa", locs: locs.filter((l) => l.region === "central_goa") },
  ];

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow="The Goa address book" title={<>Where in <i className="text-champagne">Goa?</i></>} description="From leafier village lanes to the coastline, explore the context behind every location." image="/images/about-goa.jpg" number="02" />
      <section className="section-spacing">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          {regions.map((region) => (
            <div key={region.name} className="mb-14" data-reveal>
              <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4"><h2 className="font-[Cormorant_Garamond] text-4xl text-sand font-light">{region.name}</h2><span className="font-[Manrope] text-[10px] tracking-[.16em] text-champagne uppercase">{region.locs.length} destinations</span></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {region.locs.map((loc, index) => (
                  <Link key={loc.id} href={`/location/${loc.slug}`} className={`group relative min-h-[310px] overflow-hidden border border-white/10 bg-obsidian ${index % 3 === 0 ? "shape-arch" : index % 3 === 1 ? "shape-tall" : "shape-slant"}`}>
                    <img src={loc.heroImage || "/images/hero-goa.jpg"} alt={loc.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6"><p className="font-[Manrope] text-[9px] tracking-[.18em] text-champagne uppercase">Explore area</p><h3 className="mt-2 font-[Cormorant_Garamond] text-3xl text-sand font-light">{loc.name}</h3>{loc.description && <p className="mt-2 font-[Manrope] text-xs leading-5 text-sand/55 line-clamp-2">{loc.description}</p>}<span className="mt-4 inline-flex items-center gap-2 font-[Manrope] text-[9px] tracking-[.14em] text-champagne uppercase">Discover <span>↗</span></span></div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
