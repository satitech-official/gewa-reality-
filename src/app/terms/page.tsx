import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const terms = [
  ["Purpose of this website", "Gewa Realty provides property information and advisory services for buyers, sellers and investors considering Goa. The information presented here is intended to support discovery and informed conversations."],
  ["Listing information", "Property availability, pricing, areas, specifications and images may change. Please verify current details with Gewa Realty before making a decision or arranging a visit."],
  ["Independent advice", "Gewa Realty does not provide legal, financial or tax advice. Every property transaction should involve independent verification by qualified professionals."],
  ["Indicative estimates", "Investment calculators and rental yield estimates are illustrative only. They are not promises, guarantees or projections of future returns."],
  ["Seller submissions", "Seller property submissions are reviewed before publication. Gewa Realty may decline a listing where appropriate."],
];

export default function TermsPage() { return <main className="interior-page min-h-screen bg-pearl"><Navbar /><PageHero eyebrow="Clear, considered terms" title={<>Terms of<br /><i className="text-champagne">use.</i></>} description="A few important details about how Gewa Realty&apos;s website and advisory service work." image="/images/plot-ponda.jpg" number="18" /><section className="section-spacing"><div className="mx-auto max-w-3xl space-y-4 px-5 md:px-8">{terms.map(([heading, text], index) => <article key={heading} data-reveal data-reveal-delay={String(index * .06)} className="content-surface shape-tall p-6 md:p-8"><span className="font-[Manrope] text-[9px] tracking-[.18em] text-champagne uppercase">0{index + 1}</span><h2 className="mt-3 font-[Cormorant_Garamond] text-3xl font-light text-sand">{heading}</h2><p className="mt-4 font-[Manrope] text-sm leading-7 text-sand/62">{text}</p></article>)}</div></section><Footer /></main>; }
