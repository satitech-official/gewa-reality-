import Link from "next/link";
import { MapPin, Phone, Camera, Mail } from "lucide-react";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_NUMBER, PHONE_NUMBER_2 } from "@/lib/constants";

const footerLinks = {
  discover: [
    { href: "/properties", label: "All Properties" },
    { href: "/properties/villas", label: "Villas" },
    { href: "/properties/apartments", label: "Apartments" },
    { href: "/properties/plots", label: "Plots & Land" },
    { href: "/commercial", label: "Commercial" },
    { href: "/invest", label: "Investments" },
  ],
  services: [
    { href: "/find-property", label: "Find My Property" },
    { href: "/sell-property", label: "Sell Your Property" },
    { href: "/map", label: "Map Search" },
    { href: "/shortlist", label: "My Shortlist" },
    { href: "/compare", label: "Compare" },
  ],
  company: [
    { href: "/about", label: "About Gewa Realty" },
    { href: "/contact", label: "Contact" },
    { href: "/insights", label: "Insights & Guides" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-obsidian text-sand/60">
      {/* Main CTA */}
      <div className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0">
          <img src="/images/about-goa.jpg" alt="Goa aerial" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-obsidian/80" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 text-center">
          <p className="font-[Manrope] text-[10px] tracking-[0.4em] uppercase text-champagne/50 mb-4">YOUR GOA PROPERTY JOURNEY STARTS HERE</p>
          <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,5vw,4rem)] text-sand font-light mb-4 leading-tight">
            Tell us what<br />you&apos;re looking for.
          </h2>
          <p className="font-[Manrope] text-sm text-sand/40 max-w-md mx-auto mb-8">
            Whether you&apos;re searching for a home, plot, commercial property or investment opportunity, tell Gewa Realty what matters to you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/find-property" className="px-8 py-4 bg-champagne text-obsidian font-[Manrope] text-xs tracking-[0.15em] uppercase font-semibold hover:bg-champagne-light transition-colors">
              Find My Property
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Gewa%20Realty%20👋%20I%27d%20like%20to%20discuss%20Goa%20property%20options.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-champagne/30 text-champagne font-[Manrope] text-xs tracking-[0.15em] uppercase font-medium hover:bg-champagne/10 transition-all"
            >
              WhatsApp Advisor
            </a>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-[Cormorant_Garamond] text-2xl text-champagne font-semibold mb-1">GEWA REALTY</h3>
            <p className="font-[Manrope] text-[10px] tracking-[0.3em] uppercase text-sand/30 mb-4">Residential & Commercial Advisory · Goa</p>
            <p className="font-[Manrope] text-sm text-sand/40 leading-relaxed max-w-sm mb-6">
              Guiding property discovery, site visits, and informed decisions across North, South, and Central Goa.
            </p>
            <div className="flex items-center gap-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-sm hover:border-champagne/30 transition-colors" aria-label="WhatsApp">
                <Phone size={14} className="text-champagne/60" />
              </a>
              <a href="tel:+918208337147" className="p-2 border border-white/10 rounded-sm hover:border-champagne/30 transition-colors" aria-label="Call">
                <Phone size={14} className="text-champagne/60" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-sm hover:border-champagne/30 transition-colors" aria-label="Instagram">
                <Camera size={14} className="text-champagne/60" />
              </a>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-[Manrope] text-[10px] tracking-[0.2em] uppercase text-sand/30 mb-4">Discover</h4>
            <ul className="space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-[Manrope] text-sm text-sand/40 hover:text-champagne transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[Manrope] text-[10px] tracking-[0.2em] uppercase text-sand/30 mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-[Manrope] text-sm text-sand/40 hover:text-champagne transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[Manrope] text-[10px] tracking-[0.2em] uppercase text-sand/30 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-[Manrope] text-sm text-sand/40 hover:text-champagne transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-[Manrope] text-[10px] text-sand/20">
          © {new Date().getFullYear()} Gewa Realty. All rights reserved.
        </p>
        <p className="font-[Manrope] text-[10px] text-sand/20">
          {PHONE_NUMBER} · {PHONE_NUMBER_2} · {INSTAGRAM_HANDLE}
        </p>
      </div>
    </footer>
  );
}
