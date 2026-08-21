"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function SellPropertyPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow="Sell with GEWA Realty" title={<>Bring the right<br /><i className="text-champagne">buyers closer.</i></>} description="Tell us about your property and we&apos;ll help position it with the care it deserves." image="/images/villa-candolim-2.jpg" number="13" />

      <section className="section-spacing">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          {submitted ? (
            <div className="content-surface shape-tall text-center py-16 px-6"><h2 className="font-[Cormorant_Garamond] text-4xl text-sand mb-4">Thank you.</h2><p className="font-[Manrope] text-sm text-sand/60">Your property submission has been received. Our team will review it and contact you.</p><p className="font-[Manrope] text-xs text-sand/40 mt-2">Submissions are reviewed before being published.</p>
            </div>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.target as HTMLFormElement);
              await fetch("/api/sell-property", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(fd)),
              });
              setSubmitted(true);
            }} className="content-surface shape-tall space-y-4 p-6 md:p-9"><h2 className="font-[Cormorant_Garamond] text-4xl text-sand mb-7">Submit your property</h2><div className="grid gap-4 md:grid-cols-2"><input name="ownerName" placeholder="Owner Name" required className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><input name="phone" placeholder="Phone Number" required className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /></div><input name="email" type="email" placeholder="Email" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><select name="propertyType" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne">
                <option value="">Property Type</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
              <div className="grid gap-4 md:grid-cols-2"><input name="location" placeholder="Location" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><input name="expectedPrice" type="number" placeholder="Expected Price (₹)" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><input name="propertyArea" type="number" placeholder="Property Area (sq.ft / sq.m)" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><input name="bedrooms" type="number" placeholder="Bedrooms" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /></div><textarea name="description" placeholder="Describe the setting, highlights and condition" rows={4} className="form-control w-full resize-none px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" /><button type="submit" className="luxury-button w-full justify-center">
                Submit Property
              </button>
              <p className="font-[Manrope] text-[10px] text-sand/40 text-center">Your submission will be reviewed before being published.</p>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
