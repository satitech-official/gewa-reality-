"use client";

import Link from "next/link";
import { Heart, MapPin, BedDouble, Bath, Maximize2, Eye } from "lucide-react";
import { formatPrice, STATUS_LABELS } from "@/lib/constants";
import { useEffect, useState } from "react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    slug: string;
    propertyId: string;
    category: string;
    listingType: string;
    status: string | null;
    location: string | null;
    area: string | null;
    region: string | null;
    price: string | null;
    priceOnRequest: boolean | null;
    bedrooms: number | null;
    bathrooms: number | null;
    builtUpArea: string | null;
    plotArea: string | null;
    heroImage: string | null;
    shortDescription: string | null;
    isFeatured: boolean | null;
  };
  variant?: "default" | "featured" | "compact";
}

export default function PropertyCard({ property, variant = "default" }: PropertyCardProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const shortlist: string[] = JSON.parse(localStorage.getItem("gewa_shortlist") || "[]");
        setSaved(shortlist.includes(property.id));
      } catch {
        setSaved(false);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [property.id]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    image.onerror = null;
    image.src = "/images/hero-goa.jpg";
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shortlist: string[] = JSON.parse(localStorage.getItem("gewa_shortlist") || "[]");
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

  const handleCardMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    card.style.setProperty("--mouse-x", `${x * 100}%`);
    card.style.setProperty("--mouse-y", `${y * 100}%`);
    card.style.setProperty("--rotate-x", `${(0.5 - y) * 5}deg`);
    card.style.setProperty("--rotate-y", `${(x - 0.5) * 5}deg`);
  };

  const resetCard = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--rotate-x", "0deg");
    event.currentTarget.style.setProperty("--rotate-y", "0deg");
  };

  const statusLabel = (property.status && STATUS_LABELS[property.status]) || "";
  const showStatus = property.status ? ["new", "featured", "exclusive", "pre_launch", "ready_to_move", "under_construction", "sold"].includes(property.status) : false;

  if (variant === "featured") {
    return (
      <Link href={`/property/${property.slug}`} className="group block">
        <div className="property-card shape-tall relative overflow-hidden border border-white/10 bg-obsidian" onMouseMove={handleCardMove} onMouseLeave={resetCard}>
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={property.heroImage || "/images/hero-goa.jpg"}
              alt={property.title}
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

            {/* Status tag */}
            {showStatus && (
              <span className={`absolute top-4 left-4 px-3 py-1 font-[Manrope] text-[10px] tracking-[0.15em] uppercase font-semibold status-${property.status}`}>
                {statusLabel}
              </span>
            )}

            {/* Save */}
            <button
              onClick={handleSave}
              className="absolute top-4 right-4 p-2 bg-obsidian/50 rounded-full transition-all hover:bg-obsidian/80"
              aria-label={saved ? "Remove from shortlist" : "Add to shortlist"}
            >
              <Heart size={16} className={saved ? "fill-champagne text-champagne" : "text-sand/60"} />
            </button>
          </div>

          {/* Info */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              {property.location && (
                <span className="flex items-center gap-1 font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-champagne/60">
                  <MapPin size={10} />
                  {property.location}
                </span>
              )}
            </div>
            <h3 className="font-[Cormorant_Garamond] text-2xl md:text-3xl text-sand font-light mb-2 group-hover:text-champagne transition-colors duration-300">
              {property.title}
            </h3>
            {property.shortDescription && (
              <p className="font-[Manrope] text-sm text-sand/40 mb-4 line-clamp-2">{property.shortDescription}</p>
            )}
            <div className="flex items-center gap-4 mb-4 text-sand/50">
              {property.bedrooms && (
                <span className="flex items-center gap-1 font-[Manrope] text-xs">
                  <BedDouble size={14} /> {property.bedrooms} Bed
                </span>
              )}
              {property.bathrooms && (
                <span className="flex items-center gap-1 font-[Manrope] text-xs">
                  <Bath size={14} /> {property.bathrooms} Bath
                </span>
              )}
              {property.builtUpArea && (
                <span className="flex items-center gap-1 font-[Manrope] text-xs">
                  <Maximize2 size={14} /> {property.builtUpArea} sq.ft
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-[Cormorant_Garamond] text-2xl text-champagne">
                {formatPrice(property.price, property.priceOnRequest ?? false)}
              </span>
              <span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-sand/30">
                {property.propertyId}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/property/${property.slug}`} className="group block">
      <div className="property-card shape-tall relative overflow-hidden border border-white/10 bg-pearl" onMouseMove={handleCardMove} onMouseLeave={resetCard}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.heroImage || "/images/hero-goa.jpg"}
            alt={property.title}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />

          {showStatus && (
            <span className={`absolute top-3 left-3 px-2.5 py-0.5 font-[Manrope] text-[9px] tracking-[0.15em] uppercase font-semibold status-${property.status}`}>
              {statusLabel}
            </span>
          )}

          <button
            onClick={handleSave}
            className="absolute top-3 right-3 p-1.5 bg-obsidian/40 rounded-full transition-all hover:bg-obsidian/70"
            aria-label={saved ? "Remove from shortlist" : "Add to shortlist"}
          >
            <Heart size={14} className={saved ? "fill-champagne text-champagne" : "text-sand/60"} />
          </button>
        </div>

        <div className="p-4 md:p-5">
          {property.location && (
            <span className="flex items-center gap-1 font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive mb-1">
              <MapPin size={10} />
              {property.location}{property.region ? ` · ${property.region}` : ""}
            </span>
          )}
          <h3 className="font-[Cormorant_Garamond] text-lg md:text-xl text-obsidian font-semibold mb-1 group-hover:text-forest transition-colors duration-300">
            {property.title}
          </h3>
          <div className="flex items-center gap-3 mb-3 text-olive/70">
            {property.bedrooms && (
              <span className="flex items-center gap-1 font-[Manrope] text-xs">
                <BedDouble size={12} /> {property.bedrooms}
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1 font-[Manrope] text-xs">
                <Bath size={12} /> {property.bathrooms}
              </span>
            )}
            {(property.builtUpArea || property.plotArea) && (
              <span className="flex items-center gap-1 font-[Manrope] text-xs">
                <Maximize2 size={12} /> {property.builtUpArea || property.plotArea} sq.ft
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[Cormorant_Garamond] text-xl text-forest">
              {formatPrice(property.price, property.priceOnRequest ?? false)}
            </span>
            <span className="font-[Manrope] text-[9px] tracking-[0.1em] uppercase text-olive/40">
              {property.propertyId}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
