import { getHomeData } from "@/lib/server-data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import LuxuryHomeSections, { type PremiumProperty } from "@/components/LuxuryHomeSections";
import Link from "next/link";
import { Home, Building2, Square, Store, TreePine, TrendingUp, Crown, Building, Warehouse, MapPin, ChevronRight, Phone, Shield, Search, Eye, Handshake, FileCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { allProperties, allLocations, recentPosts } = await getHomeData();

  const featuredProp = allProperties.find((p) => p.isFeatured);
  const otherProps = allProperties.filter((p) => p.id !== featuredProp?.id).slice(0, 6);
  const premiumProperties: PremiumProperty[] = allProperties.slice(0, 5).map((property) => ({
    id: property.id,
    slug: property.slug,
    title: property.title,
    location: property.location,
    price: property.price,
    priceOnRequest: property.priceOnRequest,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    builtUpArea: property.builtUpArea,
    heroImage: property.heroImage,
    status: property.status,
  }));

  const categories = [
    { href: "/properties/villas", label: "Villas", sublabel: "Private tropical homes", icon: Home, image: "/images/villa-siolim.jpg" },
    { href: "/properties/apartments", label: "Apartments", sublabel: "Modern coastal living", icon: Building2, image: "/images/apt-panjim.jpg" },
    { href: "/properties/plots", label: "Plots & Land", sublabel: "Build your vision", icon: Square, image: "/images/plot-assagao.jpg" },
    { href: "/commercial", label: "Commercial", sublabel: "Business spaces", icon: Store, image: "/images/commercial-margao.jpg" },
    { href: "/invest", label: "Investment", sublabel: "Opportunity-focused", icon: TrendingUp, image: "/images/hero-goa.jpg" },
    { href: "/properties?category=luxury", label: "Luxury", sublabel: "Premium Goa properties", icon: Crown, image: "/images/villa-candolim.jpg" },
  ];

  const journeySteps = [
    { num: "01", title: "Tell Us What You Need", desc: "Share your requirements, budget and preferred area." },
    { num: "02", title: "Discover Matching Properties", desc: "We curate options that fit your goals." },
    { num: "03", title: "Schedule Site Visits", desc: "Visit shortlisted properties with our advisor." },
    { num: "04", title: "Shortlist & Evaluate", desc: "Compare, analyse and narrow your choices." },
    { num: "05", title: "Property Due Diligence", desc: "Coordinate with appropriate professionals for verification." },
    { num: "06", title: "Negotiation & Purchase", desc: "Support through negotiation and transaction coordination." },
  ];

  const northGoaLocations = allLocations.filter((l) => l.region === "north_goa");
  const southGoaLocations = allLocations.filter((l) => l.region === "south_goa");
  const centralGoaLocations = allLocations.filter((l) => l.region === "central_goa");

  return (
    <main className="min-h-screen bg-pearl">
      <Navbar />
      <Hero />
      <LuxuryHomeSections properties={premiumProperties} />

      {/* Featured Properties */}
      <section className="section-spacing bg-pearl">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-olive mb-2">CURATED FOR YOU</p>
          <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.5rem)] text-obsidian font-light mb-10 leading-tight">
            Properties Worth<br />Discovering.
          </h2>

          {featuredProp && (
            <div className="mb-8">
              <PropertyCard property={featuredProp} variant="featured" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProps.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/properties" className="inline-flex items-center gap-2 font-[Manrope] text-xs tracking-[0.15em] uppercase text-forest hover:text-forest-light transition-colors">
              View All Properties <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Buy vs Invest */}
      <section className="section-spacing bg-obsidian">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-champagne/50 mb-2">WHAT BRINGS YOU TO GOA?</p>
            <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.5rem)] text-sand font-light leading-tight">
              Live. Or Invest.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/properties?listingType=buy" className="group relative overflow-hidden border border-white/5 p-10 md:p-14 hover:border-champagne/20 transition-all duration-500">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <img src="/images/villa-siolim.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <span className="font-[Cormorant_Garamond] text-[clamp(3rem,5vw,5rem)] text-champagne/20 font-light leading-none block mb-4">LIVE</span>
                <h3 className="font-[Cormorant_Garamond] text-2xl md:text-3xl text-sand font-light mb-3">Find a Home</h3>
                <p className="font-[Manrope] text-sm text-sand/40 mb-6 max-w-sm">
                  A home made for slow mornings, green views and coastal living.
                </p>
                <span className="font-[Manrope] text-[10px] tracking-[0.15em] uppercase text-champagne group-hover:text-champagne-light transition-colors">
                  Explore Homes →
                </span>
              </div>
            </Link>
            <Link href="/invest" className="group relative overflow-hidden border border-white/5 p-10 md:p-14 hover:border-champagne/20 transition-all duration-500">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <img src="/images/penthouse-calangute.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <span className="font-[Cormorant_Garamond] text-[clamp(3rem,5vw,5rem)] text-champagne/20 font-light leading-none block mb-4">INVEST</span>
                <h3 className="font-[Cormorant_Garamond] text-2xl md:text-3xl text-sand font-light mb-3">Discover Opportunities</h3>
                <p className="font-[Manrope] text-sm text-sand/40 mb-6 max-w-sm">
                  Opportunities aligned with your property goals and time horizon.
                </p>
                <span className="font-[Manrope] text-[10px] tracking-[0.15em] uppercase text-champagne group-hover:text-champagne-light transition-colors">
                  Explore Investments →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="section-spacing bg-sand">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-olive mb-2">EXPLORE BY TYPE</p>
            <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3rem)] text-obsidian font-light">
              What Are You Looking For?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="group relative overflow-hidden aspect-[4/3] border border-olive/10">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <cat.icon size={20} className="text-champagne/60 mb-2" />
                  <h3 className="font-[Cormorant_Garamond] text-xl text-sand font-semibold mb-1">{cat.label}</h3>
                  <p className="font-[Manrope] text-xs text-sand/40">{cat.sublabel}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Goa Area Explorer */}
      <section className="section-spacing bg-pearl">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-olive mb-2">WHERE IN GOA?</p>
            <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3rem)] text-obsidian font-light">
              Explore by Region
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "North Goa", locations: northGoaLocations, desc: "Established markets, tourism, beaches, premium residential areas", image: "/images/villa-candolim.jpg" },
              { title: "Central Goa", locations: centralGoaLocations, desc: "Strategic connectivity, growing development, moderate pricing", image: "/images/plot-ponda.jpg" },
              { title: "South Goa", locations: southGoaLocations, desc: "Quieter lifestyle, emerging infrastructure, airport proximity", image: "/images/commercial-margao.jpg" },
            ].map((region) => (
              <div key={region.title} className="relative overflow-hidden border border-olive/10 group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={region.image} alt={region.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-[Cormorant_Garamond] text-2xl text-sand font-light mb-1">{region.title}</h3>
                  <p className="font-[Manrope] text-xs text-sand/40 mb-3">{region.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {region.locations.map((loc) => (
                      <Link key={loc.id} href={`/location/${loc.slug}`} className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-champagne/60 hover:text-champagne border border-white/10 px-2 py-0.5 transition-colors">
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find My Property CTA */}
      <section className="section-spacing bg-forest">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.5rem)] text-sand font-light mb-4 leading-tight">
            Not Sure Where<br />to Start?
          </h2>
          <p className="font-[Manrope] text-sm text-sand/50 max-w-lg mx-auto mb-8">
            Tell us what you&apos;re looking for. We&apos;ll match you with suitable properties and arrange site visits.
          </p>
          <Link href="/find-property" className="inline-block px-8 py-4 bg-champagne text-obsidian font-[Manrope] text-xs tracking-[0.15em] uppercase font-semibold hover:bg-champagne-light transition-colors">
            Find My Property
          </Link>
        </div>
      </section>

      {/* Property Journey */}
      <section className="section-spacing bg-pearl">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-olive mb-2">YOUR JOURNEY</p>
            <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3rem)] text-obsidian font-light">
              From Search to Signature.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeySteps.map((step) => (
              <div key={step.num} className="relative pl-16 md:pl-20">
                <span className="absolute left-0 top-0 font-[Cormorant_Garamond] text-4xl md:text-5xl text-champagne/30 font-light">{step.num}</span>
                <h3 className="font-[Manrope] text-sm font-semibold text-obsidian mb-1">{step.title}</h3>
                <p className="font-[Manrope] text-xs text-olive leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Gewa Realty */}
      <section className="section-spacing bg-obsidian">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-champagne/50 mb-2">WHY GEWA REALTY?</p>
              <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3rem)] text-sand font-light mb-6 leading-tight">
                Property Is Personal.<br />Advice Should Be Too.
              </h2>
              <p className="font-[Manrope] text-sm text-sand/40 leading-relaxed mb-8">
                Gewa Realty provides residential and commercial property advisory across Goa. From discovery to site visits to shortlisting, the focus is on understanding what you need — and helping you find it.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 font-[Manrope] text-xs tracking-[0.15em] uppercase text-champagne hover:text-champagne-light transition-colors">
                Learn More <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Search, label: "Property Discovery" },
                { icon: Eye, label: "Site Visits" },
                { icon: Handshake, label: "Buyer Advisory" },
                { icon: TrendingUp, label: "Investment Guidance" },
                { icon: Home, label: "Residential" },
                { icon: Store, label: "Commercial" },
                { icon: Square, label: "Land & Plots" },
                { icon: FileCheck, label: "Due Diligence Support" },
              ].map((item, idx) => (
                <div key={idx} className="border border-white/5 p-5 hover:border-champagne/20 transition-colors group">
                  <item.icon size={18} className="text-champagne/40 mb-2 group-hover:text-champagne transition-colors" />
                  <p className="font-[Manrope] text-xs text-sand/50 group-hover:text-sand/70 transition-colors">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights */}
      {recentPosts.length > 0 && (
        <section className="section-spacing bg-sand">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8">
            <div className="text-center mb-10">
              <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-olive mb-2">INSIGHTS</p>
              <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3rem)] text-obsidian font-light">
                Goa Property Guides
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link key={post.id} href={`/insights/${post.slug}`} className="group border border-olive/10 p-6 bg-pearl hover:border-champagne/30 transition-all">
                  <span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/60">{post.category}</span>
                  <h3 className="font-[Cormorant_Garamond] text-xl text-obsidian font-semibold mt-2 mb-2 group-hover:text-forest transition-colors">{post.title}</h3>
                  <p className="font-[Manrope] text-xs text-olive/60 leading-relaxed line-clamp-3">{post.excerpt}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/insights" className="font-[Manrope] text-xs tracking-[0.15em] uppercase text-forest hover:text-forest-light transition-colors">
                All Insights →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Sell Property */}
      <section className="section-spacing bg-forest">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 text-center">
          <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-champagne/50 mb-2">SELLING PROPERTY?</p>
          <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3rem)] text-sand font-light mb-4">
            List Your Goa Property
          </h2>
          <p className="font-[Manrope] text-sm text-sand/40 max-w-lg mx-auto mb-8">
            Tell us about your property. We&apos;ll help position it for the right buyers.
          </p>
          <Link href="/sell-property" className="inline-block px-8 py-4 border border-champagne/30 text-champagne font-[Manrope] text-xs tracking-[0.15em] uppercase font-medium hover:bg-champagne/10 transition-all">
            Sell Your Property
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
