import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Eye, Handshake, TrendingUp, Home, Store, Square, MapPin, Phone, Camera, ChevronRight } from "lucide-react";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_NUMBER } from "@/lib/constants";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow="The GEWA way" title={<>Property is personal.<br /><i className="text-champagne">Advice should be too.</i></>} description="An independent Goa property advisory built around attention, context and the right introductions." image="/images/villa-candolim-1.jpg" number="03" />

      <section className="section-spacing">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-[Cormorant_Garamond] text-4xl text-sand font-light mb-5">Our approach</h2>
              <p className="font-[Manrope] text-sm text-sand/65 leading-relaxed mb-4">
                Gewa Realty is a residential and commercial property advisory based in Goa. We focus on understanding what each client needs — whether it&apos;s a home, an investment, a plot to build on, or a commercial space — and guiding them through discovery, site visits, and shortlisting.
              </p>
              <p className="font-[Manrope] text-sm text-sand/65 leading-relaxed mb-4">
                Our approach is personal. We don&apos;t believe in showing you everything — we believe in showing you what matters. Every recommendation is based on your goals, budget, timeline and preferred area.
              </p>
              <p className="font-[Manrope] text-sm text-sand/65 leading-relaxed">
                With deep local understanding across North, South and Central Goa, we help you navigate the market with clarity — not pressure.
              </p>
            </div>
            <div className="relative">
              <img src="/images/villa-siolim.jpg" alt="Goa property" className="shape-arch w-full aspect-[4/3] object-cover border border-champagne/25" />
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h2 className="font-[Cormorant_Garamond] text-4xl text-sand font-light mb-8">What we do</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Search, title: "Property Discovery", desc: "Curated property recommendations based on your requirements and goals." },
                { icon: Eye, title: "Site Visits", desc: "Guided visits to shortlisted properties with local context and advisor support." },
                { icon: Handshake, title: "Buyer Advisory", desc: "End-to-end guidance from shortlisting to coordinating with appropriate professionals." },
                { icon: TrendingUp, title: "Investment Guidance", desc: "Contextual advice on property investment opportunities across Goa." },
                { icon: Home, title: "Residential Advisory", desc: "Villas, apartments and homes — for living, holidays or second-home use." },
                { icon: Store, title: "Commercial Advisory", desc: "Shops, offices and commercial spaces for business and investment." },
                { icon: Square, title: "Land & Plots", desc: "Settlement, NA and development plots — with clarity on zoning and documentation." },
                { icon: MapPin, title: "Local Market Understanding", desc: "Insight into North, South and Central Goa markets, pricing and connectivity." },
              ].map((item) => (
                <div key={item.title} className="content-surface shape-tall p-5 hover:border-champagne/40 transition-all">
                  <item.icon size={18} className="text-champagne mb-3" />
                  <h3 className="font-[Manrope] text-sm font-semibold text-sand mb-2">{item.title}</h3>
                  <p className="font-[Manrope] text-xs text-sand/55 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="font-[Cormorant_Garamond] text-4xl text-sand font-light mb-6">Gewa Realty</h2>
            <div className="content-surface shape-tall p-8 max-w-lg">
              <h3 className="font-[Cormorant_Garamond] text-2xl text-sand font-semibold mb-1">Nishad Matonkar</h3>
              <p className="font-[Manrope] text-xs text-sand/50 mb-4">Gewa Realty — Residential & Commercial Advisory, Goa</p>
              <div className="space-y-2">
                <a href="tel:+918208337147" className="flex items-center gap-2 font-[Manrope] text-xs text-champagne hover:text-champagne-light">
                  <Phone size={12} /> {PHONE_NUMBER}
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-[Manrope] text-xs text-champagne hover:text-champagne-light">
                  <Phone size={12} /> WhatsApp
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-[Manrope] text-xs text-champagne hover:text-champagne-light">
                  <Camera size={12} /> {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>

          <div className="border border-champagne/20 bg-champagne/10 p-6">
            <p className="font-[Manrope] text-xs text-sand/65 leading-relaxed">
              Gewa Realty coordinates with appropriate professionals (legal, financial) where required. We do not provide legal services directly. All property transactions should involve independent legal verification.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
