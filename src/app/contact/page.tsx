"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Camera, Mail } from "lucide-react";
import { WHATSAPP_NUMBER, PHONE_NUMBER, PHONE_NUMBER_2, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow="Private consultation" title={<>Talk to a<br /><i className="text-champagne">property advisor.</i></>} description="Tell us about the way you want to live, invest or build in Goa." image="/images/villa-candolim-3.jpg" number="05" />
      <section className="section-spacing">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-[Cormorant_Garamond] text-4xl text-sand font-light mb-8">Contact Gewa Realty</h2>
              <div className="space-y-6 mb-8">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="content-surface shape-tall flex items-center gap-4 p-4 hover:border-champagne/40 transition-colors">
                  <Phone size={18} className="text-champagne" />
                  <div>
                    <p className="font-[Manrope] text-xs text-sand/50 uppercase tracking-[0.1em]">WhatsApp</p><p className="font-[Manrope] text-sm text-sand">{PHONE_NUMBER}</p>
                  </div>
                </a>
                <a href="tel:+918208337147" className="content-surface shape-tall flex items-center gap-4 p-4 hover:border-champagne/40 transition-colors">
                  <Phone size={18} className="text-champagne" />
                  <div>
                    <p className="font-[Manrope] text-xs text-sand/50 uppercase tracking-[0.1em]">Call</p><p className="font-[Manrope] text-sm text-sand">{PHONE_NUMBER}</p><p className="font-[Manrope] text-xs text-sand/40">{PHONE_NUMBER_2}</p>
                  </div>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="content-surface shape-tall flex items-center gap-4 p-4 hover:border-champagne/40 transition-colors">
                  <Camera size={18} className="text-champagne" />
                  <div>
                    <p className="font-[Manrope] text-xs text-sand/50 uppercase tracking-[0.1em]">Instagram</p><p className="font-[Manrope] text-sm text-sand">{INSTAGRAM_HANDLE}</p>
                  </div>
                </a>
                <div className="content-surface shape-tall flex items-center gap-4 p-4">
                  <MapPin size={18} className="text-champagne" />
                  <div>
                    <p className="font-[Manrope] text-xs text-sand/50 uppercase tracking-[0.1em]">Office</p><p className="font-[Manrope] text-sm text-sand">Ponda, Goa</p>
                  </div>
                </div>
              </div>
              <div className="aspect-[16/9] overflow-hidden border border-champagne/20">
                <iframe src="https://maps.google.com/maps?q=15.4053,74.0202&z=13&output=embed" className="w-full h-full border-0" loading="lazy" title="Office location" />
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="text-center py-16">
                  <h2 className="font-[Cormorant_Garamond] text-3xl text-sand mb-3">Message Sent</h2><p className="font-[Manrope] text-sm text-sand/60">We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target as HTMLFormElement);
                  await fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email"),
                      message: fd.get("message"), enquiryType: "contact",
                    }),
                  });
                  setSubmitted(true);
                }} className="content-surface shape-tall space-y-4 p-6 md:p-8"><h2 className="font-[Cormorant_Garamond] text-3xl text-sand font-light mb-6">Send a message</h2><input name="name" placeholder="Your Name" required className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><input name="phone" placeholder="Phone Number" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><input name="email" type="email" placeholder="Email" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><textarea name="message" placeholder="Your message" rows={5} className="form-control w-full resize-none px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><button type="submit" className="luxury-button w-full justify-center">Send message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
