"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Maximize2, Car, Home, Building2, Square, Calendar, Phone, Heart, Share2, ChevronLeft, ChevronRight, Check, ArrowRight } from "lucide-react";
import { formatPrice, STATUS_LABELS, FURNISHING_LABELS, WHATSAPP_NUMBER, cn, generateWhatsAppLink } from "@/lib/constants";

interface PropertyDetailClientProps {
  property: any;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "amenities" | "location" | "story">("overview");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const images = [property.heroImage, ...(property.gallery || [])].filter(Boolean);
  const isSold = property.status === "sold";
  const statusLabel = STATUS_LABELS[property.status] || "";

  const whatsappMessage = `Hello Gewa Realty 👋\n\nI'm interested in:\nProperty: ${property.title}\nLocation: ${property.location || 'Goa'}\nPrice: ${formatPrice(property.price, property.priceOnRequest)}\nProperty ID: ${property.propertyId}\n\nI would like more information / arrange a site visit.`;

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    image.onerror = null;
    image.src = "/images/hero-goa.jpg";
  };

  const handleSave = () => {
    const shortlist = JSON.parse(localStorage.getItem("gewa_shortlist") || "[]");
    if (saved) {
      const filtered = shortlist.filter((id: string) => id !== property.id);
      localStorage.setItem("gewa_shortlist", JSON.stringify(filtered));
      setSaved(false);
    } else {
      shortlist.push(property.id);
      localStorage.setItem("gewa_shortlist", JSON.stringify(shortlist));
      setSaved(true);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative aspect-[16/9] min-h-[430px] md:aspect-[21/9] md:min-h-[560px] overflow-hidden">
          <img src={images[galleryIndex] || "/images/hero-goa.jpg"} alt={property.title} onError={handleImageError} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

          {/* Gallery nav */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button onClick={() => setGalleryIndex(Math.max(0, galleryIndex - 1))} className="p-2 glass text-sand/80" aria-label="Previous image">
                <ChevronLeft size={16} />
              </button>
              <span className="px-3 py-2 glass font-[Manrope] text-xs text-sand/60">{galleryIndex + 1}/{images.length}</span>
              <button onClick={() => setGalleryIndex(Math.min(images.length - 1, galleryIndex + 1))} className="p-2 glass text-sand/80" aria-label="Next image">
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Status */}
          {property.status && (
            <span className={`absolute top-6 left-6 px-3 py-1 font-[Manrope] text-[10px] tracking-[0.15em] uppercase font-semibold status-${property.status}`}>
              {statusLabel}
            </span>
          )}
        </div>
      </section>

      {/* Property header */}
      <section className="bg-obsidian border-y border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              {property.location && (
                <span className="flex items-center gap-1 font-[Manrope] text-[10px] tracking-[0.15em] uppercase text-champagne/50 mb-2">
                  <MapPin size={10} /> {property.location}{property.region ? ` · ${property.region}` : ""}
                </span>
              )}
              <h1 className="font-[Cormorant_Garamond] text-[clamp(1.5rem,4vw,2.5rem)] text-sand font-light mb-2">{property.title}</h1>
              <div className="flex items-center gap-4 text-sand/40 font-[Manrope] text-xs">
                {property.bedrooms && <span className="flex items-center gap-1"><BedDouble size={12} /> {property.bedrooms} Beds</span>}
                {property.bathrooms && <span className="flex items-center gap-1"><Bath size={12} /> {property.bathrooms} Baths</span>}
                {property.builtUpArea && <span className="flex items-center gap-1"><Maximize2 size={12} /> {property.builtUpArea} sq.ft</span>}
                <span>{property.propertyId}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-[Cormorant_Garamond] text-3xl text-champagne">{formatPrice(property.price, property.priceOnRequest)}</span>
              <button onClick={handleSave} className="p-2 border border-white/10 hover:border-champagne/30 transition-colors" aria-label="Save">
                <Heart size={16} className={saved ? "fill-champagne text-champagne" : "text-sand/40"} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="detail-tabs flex gap-6 border-b mb-8 overflow-x-auto no-scrollbar">
              {(["overview", "details", "amenities", "location", "story"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 font-[Manrope] text-xs tracking-[0.1em] uppercase transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-forest text-forest" : "border-transparent text-olive/50 hover:text-olive"}`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="space-y-6">
                {property.description && <p className="font-[Manrope] text-sm text-obsidian/70 leading-relaxed">{property.description}</p>}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {property.propertyId && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Property ID</span><span className="font-[Manrope] text-sm font-semibold">{property.propertyId}</span></div>}
                  {property.bedrooms && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Bedrooms</span><span className="font-[Manrope] text-sm font-semibold">{property.bedrooms}</span></div>}
                  {property.bathrooms && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Bathrooms</span><span className="font-[Manrope] text-sm font-semibold">{property.bathrooms}</span></div>}
                  {property.builtUpArea && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Built-up Area</span><span className="font-[Manrope] text-sm font-semibold">{property.builtUpArea} sq.ft</span></div>}
                  {property.plotArea && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Plot Area</span><span className="font-[Manrope] text-sm font-semibold">{property.plotArea} sq.m</span></div>}
                  {property.furnishing && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Furnishing</span><span className="font-[Manrope] text-sm font-semibold">{FURNISHING_LABELS[property.furnishing] || property.furnishing}</span></div>}
                  {property.parking && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Parking</span><span className="font-[Manrope] text-sm font-semibold">{property.parking}</span></div>}
                  {property.possession && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Possession</span><span className="font-[Manrope] text-sm font-semibold">{property.possession}</span></div>}
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-3">
                {[
                  ["Property Type", property.category],
                  ["Listing Type", property.listingType],
                  ["Bedrooms", property.bedrooms],
                  ["Bathrooms", property.bathrooms],
                  ["Built-up Area", property.builtUpArea ? `${property.builtUpArea} sq.ft` : null],
                  ["Plot Area", property.plotArea ? `${property.plotArea} sq.m` : null],
                  ["Furnishing", property.furnishing ? FURNISHING_LABELS[property.furnishing] : null],
                  ["Parking", property.parking],
                  ["Floor", property.floor],
                  ["Total Floors", property.totalFloors],
                  ["Age", property.age],
                  ["Availability", property.availability],
                  ["Ownership", property.ownership],
                  ["Possession", property.possession],
                  ["Road Access", property.roadAccess],
                  ["Zone", property.zone],
                  ["Frontage", property.frontage],
                ].map(([label, value]) => (
                  value ? (
                    <div key={label as string} className="flex justify-between border-b border-olive/5 py-3">
                      <span className="font-[Manrope] text-xs text-olive/50 uppercase tracking-[0.05em]">{label as string}</span>
                      <span className="font-[Manrope] text-sm text-obsidian">{String(value)}</span>
                    </div>
                  ) : null
                ))}
              </div>
            )}

            {activeTab === "amenities" && (
              <div>
                {property.amenities && property.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity: string) => (
                      <div key={amenity} className="flex items-center gap-2 p-3 border border-olive/10">
                        <Check size={14} className="text-forest" />
                        <span className="font-[Manrope] text-sm text-obsidian">{amenity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-[Manrope] text-sm text-olive/50">Amenity information not specified for this property.</p>
                )}
              </div>
            )}

            {activeTab === "location" && (
              <div className="space-y-4">
                {property.neighbourhood && <p className="font-[Manrope] text-sm text-olive/70">{property.neighbourhood}</p>}
                {property.latitude && property.longitude && (
                  <div className="aspect-[16/9] bg-sand border border-olive/10 flex items-center justify-center">
                    <iframe
                      src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=14&output=embed`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      title="Property location"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {property.airportDistance && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Airport</span><span className="font-[Manrope] text-sm">{property.airportDistance}</span></div>}
                  {property.beachDistance && <div className="border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Beach</span><span className="font-[Manrope] text-sm">{property.beachDistance}</span></div>}
                  {property.nearbyLandmarks && <div className="col-span-2 border border-olive/10 p-4"><span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Nearby</span><span className="font-[Manrope] text-sm">{property.nearbyLandmarks}</span></div>}
                </div>
              </div>
            )}

            {activeTab === "story" && (
              <div>
                {property.story ? (
                  <p className="font-[Cormorant_Garamond] text-xl md:text-2xl text-obsidian leading-relaxed">{property.story}</p>
                ) : (
                  <p className="font-[Manrope] text-sm text-olive/50">Property story coming soon.</p>
                )}
              </div>
            )}
          </div>

          {/* Sticky sidebar */}
          <div className="lg:w-80 lg:sticky lg:top-28 lg:self-start">
            <div className="content-surface shape-tall p-6">
              <h3 className="font-[Manrope] text-xs tracking-[0.1em] uppercase text-sand/50 mb-4">Interested in this property?</h3>
              <p className="font-[Cormorant_Garamond] text-3xl text-champagne mb-1">{formatPrice(property.price, property.priceOnRequest)}</p>
              <p className="font-[Manrope] text-[10px] text-sand/40 mb-6">Property ID: {property.propertyId}</p>

              {isSold ? (
                <div className="text-center mb-4">
                  <span className="font-[Manrope] text-xs tracking-[0.1em] uppercase text-red-600 font-semibold">This property is sold</span>
                  <p className="font-[Manrope] text-xs text-olive/50 mt-2">Looking for something similar?</p>
                  <Link href="/find-property" className="inline-block mt-3 px-4 py-2 bg-forest text-sand font-[Manrope] text-xs hover:bg-forest-light transition-colors">Tell Us</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <a
                    href={generateWhatsAppLink(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxury-button w-full justify-center"
                  >
                    WhatsApp Advisor
                  </a>
                  <button
                    onClick={() => setShowVisitForm(true)}
                    className="w-full py-3 border border-champagne/50 text-champagne font-[Manrope] text-xs tracking-[0.1em] uppercase font-medium hover:bg-champagne/10 transition-colors"
                  >
                    Schedule Site Visit
                  </button>
                  <a href="tel:+918208337147" className="w-full py-3 border border-white/20 text-sand font-[Manrope] text-xs tracking-[0.1em] uppercase font-medium text-center block hover:bg-white/5 transition-colors">
                    Call Now
                  </a>
                </div>
              )}

              {/* Share */}
              <div className="mt-4 pt-4 border-t border-olive/5">
                <button
                  onClick={() => {
                    const text = `Check this Goa property from Gewa Realty:\n${property.title}\n${property.location || 'Goa'}\n${formatPrice(property.price, property.priceOnRequest)}\n${window.location.href}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
                  }}
                  className="flex items-center gap-2 font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/40 hover:text-olive transition-colors"
                >
                  <Share2 size={12} /> Share via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Site Visit Modal */}
      {showVisitForm && (
        <div className="fixed inset-0 z-[100] bg-obsidian/80 flex items-center justify-center p-4" onClick={() => setShowVisitForm(false)}>
          <div className="bg-pearl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-[Cormorant_Garamond] text-2xl text-obsidian mb-6">Schedule a Site Visit</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const data = new FormData(form);
              await fetch("/api/site-visits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: data.get("name"),
                  phone: data.get("phone"),
                  whatsapp: data.get("whatsapp"),
                  email: data.get("email"),
                  propertyId: property.id,
                  preferredDate: data.get("date"),
                  preferredTime: data.get("time"),
                  numVisitors: data.get("visitors"),
                  message: data.get("message"),
                }),
              });
              setShowVisitForm(false);
              alert("Site visit request submitted! We'll contact you shortly.");
            }} className="space-y-4">
              <input name="name" placeholder="Your Name" required className="w-full px-4 py-3 border border-olive/10 font-[Manrope] text-sm focus:outline-none focus:border-forest" />
              <input name="phone" placeholder="Phone Number" required className="w-full px-4 py-3 border border-olive/10 font-[Manrope] text-sm focus:outline-none focus:border-forest" />
              <input name="whatsapp" placeholder="WhatsApp Number" className="w-full px-4 py-3 border border-olive/10 font-[Manrope] text-sm focus:outline-none focus:border-forest" />
              <input name="email" type="email" placeholder="Email" className="w-full px-4 py-3 border border-olive/10 font-[Manrope] text-sm focus:outline-none focus:border-forest" />
              <div className="grid grid-cols-2 gap-4">
                <input name="date" type="date" placeholder="Preferred Date" className="w-full px-4 py-3 border border-olive/10 font-[Manrope] text-sm focus:outline-none focus:border-forest" />
                <input name="time" type="time" placeholder="Preferred Time" className="w-full px-4 py-3 border border-olive/10 font-[Manrope] text-sm focus:outline-none focus:border-forest" />
              </div>
              <input name="visitors" type="number" placeholder="Number of Visitors" className="w-full px-4 py-3 border border-olive/10 font-[Manrope] text-sm focus:outline-none focus:border-forest" />
              <textarea name="message" placeholder="Message" rows={3} className="w-full px-4 py-3 border border-olive/10 font-[Manrope] text-sm focus:outline-none focus:border-forest resize-none" />
              <button type="submit" className="w-full py-3 bg-forest text-sand font-[Manrope] text-xs tracking-[0.12em] uppercase font-semibold hover:bg-forest-light transition-colors">
                Schedule Site Visit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 flex">
        <a href={generateWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 text-center font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-sand/70">WhatsApp</a>
        <a href="tel:+918208337147" className="flex-1 py-4 text-center font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-sand/70 border-x border-white/5">Call</a>
        <button onClick={() => setShowVisitForm(true)} className="flex-1 py-4 text-center font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-champagne">Visit</button>
      </div>
    </>
  );
}
