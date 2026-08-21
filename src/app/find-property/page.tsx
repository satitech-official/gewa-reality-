"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PageHero from "@/components/PageHero";

const steps = [
  { title: "What are you buying for?", field: "purpose", options: ["Primary Home", "Second Home", "Holiday Home", "Investment", "Rental Income", "Commercial Use", "Land Investment"] },
  { title: "What's your budget?", field: "budget", options: ["Under ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₹2Cr", "₹2Cr – ₹5Cr", "₹5Cr+"] },
  { title: "Preferred property type?", field: "propertyType", options: ["Villa", "Apartment", "Plot", "Commercial", "Land", "Penthouse", "Farmhouse"] },
  { title: "Preferred location?", field: "location", options: ["North Goa", "South Goa", "Central Goa", "Panjim area", "Calangute/Candolim", "Siolim/Assagao", "Margao area", "Any location"] },
  { title: "How many bedrooms?", field: "bedrooms", options: ["1", "2", "3", "4", "5+", "Not applicable"] },
  { title: "Ready or under construction?", field: "construction", options: ["Ready to Move", "Near Completion", "Under Construction", "Pre-Launch", "No Preference"] },
  { title: "When do you want to buy?", field: "timeline", options: ["Immediately", "Within 3 months", "Within 6 months", "Within a year", "Just exploring"] },
  { title: "Your contact details", field: "contact" },
];

export default function FindPropertyPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleOption = (value: string) => {
    setData((prev) => ({ ...prev, [steps[step].field]: value }));
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        phone: fd.get("phone"),
        email: fd.get("email"),
        whatsapp: fd.get("whatsapp"),
        enquiryType: "property_request",
        purpose: data.purpose,
        budget: data.budget,
        propertyType: data.propertyType,
        preferredArea: data.location,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        timeline: data.timeline,
        message: JSON.stringify(data),
      }),
    });
    setSubmitted(true);
  };

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow="GEWA property concierge" title={<>Find the place<br /><i className="text-champagne">that fits you.</i></>} description="A short, considered brief that helps us understand the right properties to show you." image="/images/villa-siolim-3.jpg" number="12" />

      <section className="section-spacing">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          {submitted ? (
            <div className="content-surface shape-tall text-center py-12 px-6">
              <h2 className="font-[Cormorant_Garamond] text-4xl text-sand mb-4">Thank you.</h2><p className="font-[Manrope] text-sm text-sand/60 mb-2">Your property brief has been submitted to Gewa Realty.</p><p className="font-[Manrope] text-xs text-sand/40 mb-6">We&apos;ll review your requirements and get in touch with matching options.</p><div className="border border-white/10 bg-obsidian/35 p-6 text-left mb-8"><h3 className="font-[Manrope] text-xs font-semibold uppercase tracking-[0.1em] text-champagne mb-3">Your Goa Property Brief</h3>
                {Object.entries(data).filter(([,v]) => v).map(([k,v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-olive/5">
                    <span className="font-[Manrope] text-xs text-sand/50 capitalize">{k}</span><span className="font-[Manrope] text-xs text-sand">{v}</span>
                  </div>
                ))}
              </div>
              <Link href="/properties" className="luxury-button">
                Browse Properties
              </Link>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="content-surface mb-8 p-5">
                <div className="mb-4 flex items-center justify-between"><span className="font-[Manrope] text-[9px] tracking-[.18em] text-champagne uppercase">Your property brief</span><span className="font-[Manrope] text-[10px] text-sand/55">{step + 1} / {steps.length}</span></div>
              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <div key={i} className={`flex-1 h-1 rounded-full ${i <= step ? "bg-champagne" : "bg-white/10"}`} />
                ))}
              </div></div>

              <div className="content-surface shape-tall p-6 md:p-8"><h2 className="font-[Cormorant_Garamond] text-4xl text-sand mb-7">{steps[step].title}</h2>

              {steps[step].field === "contact" ? (
                <form onSubmit={handleSubmit} className="space-y-4"><input name="name" placeholder="Your Name" required className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><input name="phone" placeholder="Phone Number" required className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><input name="email" type="email" placeholder="Email" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><input name="whatsapp" placeholder="WhatsApp Number" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><button type="submit" className="luxury-button w-full justify-center">
                    Ask Gewa Realty to Find Matches
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps[step].options!.map((opt) => (
                    <button key={opt} onClick={() => handleOption(opt)} className={`shape-tall px-4 py-4 border text-left font-[Manrope] text-sm transition-all ${data[steps[step].field] === opt ? "border-champagne bg-champagne/10 text-champagne" : "border-white/15 text-sand hover:border-champagne/50 hover:bg-white/5"}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="flex items-center gap-1 font-[Manrope] text-xs text-sand/45 hover:text-champagne disabled:opacity-20 transition-colors">
                  <ChevronLeft size={14} /> Back
                </button>
                {step < steps.length - 1 && data[steps[step].field] && (
                  <button onClick={() => setStep(step + 1)} className="flex items-center gap-1 font-[Manrope] text-xs text-champagne hover:text-champagne-light transition-colors">
                    Next <ChevronRight size={14} />
                  </button>
                )}
              </div></div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
