import { getLocationBySlug, getPropertiesByLocation } from "@/lib/server-data";
import { mockLocations } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PageHero from "@/components/PageHero";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return mockLocations.filter((location) => location.isPublished).map((location) => ({ slug: location.slug }));
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) notFound();

  const locProperties = await getPropertiesByLocation(loc.name, 6);

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow={loc.region.replace("_", " ")} title={<>{loc.name}<i className="text-champagne">, Goa.</i></>} description={loc.description || "Explore this Goa location with the context needed for a considered property search."} image={loc.heroImage || "/images/about-goa.jpg"} number="16" />
      <section className="section-spacing">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          {loc.lifestyle && (
            <div className="content-surface shape-tall mb-6 p-6">
              <h2 className="font-[Manrope] text-[10px] tracking-[0.2em] uppercase text-champagne mb-3">Lifestyle</h2><p className="font-[Manrope] text-sm leading-7 text-sand/65">{loc.lifestyle}</p>
            </div>
          )}
          {loc.connectivity && (
            <div className="content-surface shape-tall mb-8 p-6">
              <h2 className="font-[Manrope] text-[10px] tracking-[0.2em] uppercase text-champagne mb-3">Connectivity</h2><p className="font-[Manrope] text-sm leading-7 text-sand/65">{loc.connectivity}</p>
            </div>
          )}
          {loc.latitude && loc.longitude && (
            <div className="mb-12 aspect-[16/9] overflow-hidden border border-champagne/25">
              <iframe src={`https://maps.google.com/maps?q=${loc.latitude},${loc.longitude}&z=14&output=embed`} className="w-full h-full border-0" loading="lazy" title={`${loc.name} map`} />
            </div>
          )}
          {locProperties.length > 0 && (
            <>
              <h2 className="font-[Cormorant_Garamond] text-4xl text-sand font-light mb-6">Properties in {loc.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locProperties.map((prop) => <PropertyCard key={prop.id} property={prop} />)}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
