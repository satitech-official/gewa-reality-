"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { TrendingUp, Calculator, ChevronRight, Info } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function InvestPage() {
  const [calcPrice, setCalcPrice] = useState("");
  const [calcRent, setCalcRent] = useState("");
  const [calcOccupancy, setCalcOccupancy] = useState("80");
  const [calcMaintenance, setCalcMaintenance] = useState("");
  const [calcResult, setCalcResult] = useState<any>(null);

  const calculateYield = () => {
    const price = parseFloat(calcPrice);
    const rent = parseFloat(calcRent);
    const occupancy = parseFloat(calcOccupancy) / 100;
    const maintenance = parseFloat(calcMaintenance) || 0;
    if (!price || !rent) return;
    const annualGross = rent * 12;
    const annualNet = (annualGross * occupancy) - maintenance;
    const grossYield = (annualGross / price) * 100;
    const netYield = (annualNet / price) * 100;
    setCalcResult({ annualGross, annualNet, grossYield, netYield, monthlyProjected: annualNet / 12 });
  };

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow="Investment advisory" title={<>Invest in Goa<br /><i className="text-champagne">with context.</i></>} description="Understand opportunities, not promises. Data-oriented guidance for property investors." image="/images/apt-panjim-2.jpg" number="06" />

      <section className="section-spacing">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          {/* Investment property discovery */}
          <div className="content-surface shape-tall mb-16 p-7 md:p-10">
            <h2 className="font-[Cormorant_Garamond] text-4xl text-sand font-light mb-4">Investment properties</h2>
            <Link href="/properties?listingType=invest" className="luxury-button">
              Explore Investment Properties <ChevronRight size={14} />
            </Link>
          </div>

          {/* Rental Yield Calculator */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Calculator size={18} className="text-champagne" />
              <h2 className="font-[Cormorant_Garamond] text-4xl text-sand font-light">Indicative rental yield</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="content-surface shape-tall space-y-4 p-6">
                <div>
                  <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 mb-1">Purchase Price (₹)</label>
                  <input type="number" value={calcPrice} onChange={(e) => setCalcPrice(e.target.value)} placeholder="e.g. 15000000" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" />
                </div>
                <div>
                  <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 mb-1">Estimated Monthly Rent (₹)</label>
                  <input type="number" value={calcRent} onChange={(e) => setCalcRent(e.target.value)} placeholder="e.g. 50000" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" />
                </div>
                <div>
                  <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 mb-1">Expected Occupancy (%)</label>
                  <input type="number" value={calcOccupancy} onChange={(e) => setCalcOccupancy(e.target.value)} className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" />
                </div>
                <div>
                  <label className="block font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 mb-1">Annual Maintenance (₹)</label>
                  <input type="number" value={calcMaintenance} onChange={(e) => setCalcMaintenance(e.target.value)} placeholder="e.g. 50000" className="form-control w-full px-4 py-3 font-[Manrope] text-sm focus:outline-none focus:border-champagne" />
                </div>
                <button onClick={calculateYield} className="luxury-button w-full justify-center">Calculate</button>
              </div>
              <div>
                {calcResult ? (
                  <div className="space-y-4">
                    <div className="border border-olive/10 p-5">
                      <span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Estimated Gross Yield</span>
                      <span className="font-[Cormorant_Garamond] text-3xl text-forest">{calcResult.grossYield.toFixed(2)}%</span>
                    </div>
                    <div className="border border-olive/10 p-5">
                      <span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Estimated Net Yield</span>
                      <span className="font-[Cormorant_Garamond] text-3xl text-forest">{calcResult.netYield.toFixed(2)}%</span>
                    </div>
                    <div className="border border-olive/10 p-5">
                      <span className="font-[Manrope] text-[10px] tracking-[0.1em] uppercase text-olive/50 block mb-1">Projected Annual Rental Revenue</span>
                      <span className="font-[Cormorant_Garamond] text-2xl text-obsidian">₹{Math.round(calcResult.annualNet).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="bg-sand border border-olive/10 p-4 flex items-start gap-2">
                      <Info size={14} className="text-olive mt-0.5 shrink-0" />
                      <p className="font-[Manrope] text-xs text-olive/70"><strong>Indicative calculation only.</strong> Actual returns may vary. This does not constitute a guarantee or projection of future performance.</p>
                    </div>
                  </div>
                ) : (
                  <div className="content-surface shape-tall h-full flex items-center justify-center p-10">
                    <p className="font-[Manrope] text-sm text-sand/45 text-center">Enter values and click Calculate to see estimated yields.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Investment considerations */}
          <div className="mb-16">
            <h2 className="font-[Cormorant_Garamond] text-2xl text-obsidian font-light mb-6">Investment Considerations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Rental Demand", desc: "Goa's tourism creates seasonal and long-term rental demand, especially in North Goa beach areas and Panjim." },
                { title: "Area Selection", desc: "North Goa offers higher rental visibility. South Goa offers lower entry prices. Central Goa offers connectivity advantages." },
                { title: "Property Type", desc: "Apartments often offer better rental yield relative to price. Villas may offer stronger capital appreciation potential." },
                { title: "Due Diligence", desc: "Title verification, zoning confirmation, and RERA status are essential. Always engage a qualified legal professional." },
              ].map((item) => (
                <div key={item.title} className="border border-olive/10 p-5">
                  <h3 className="font-[Manrope] text-sm font-semibold text-obsidian mb-2">{item.title}</h3>
                  <p className="font-[Manrope] text-xs text-olive/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-forest p-10">
            <h3 className="font-[Cormorant_Garamond] text-2xl text-sand mb-3">Discuss Your Investment Goals</h3>
            <p className="font-[Manrope] text-xs text-sand/50 mb-6">Tell us what you&apos;re looking to achieve. We&apos;ll share relevant opportunities.</p>
            <Link href="/find-property" className="inline-block px-6 py-3 bg-champagne text-obsidian font-[Manrope] text-xs tracking-[0.12em] uppercase font-semibold hover:bg-champagne-light transition-colors">
              Speak to an Advisor
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
