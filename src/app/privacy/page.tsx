import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const principles = [
  ["What we collect", "When you submit an enquiry, property brief, site-visit request or seller submission, we use the contact information and details you provide to respond to that request."],
  ["How it is used", "Your information is used by Gewa Realty to provide relevant property advisory and follow up on your enquiry. It is not shared with third parties for unrelated marketing."],
  ["Your shortlist", "Saved properties remain in local storage on your device. They are not sent to Gewa Realty unless you choose to submit an enquiry."],
  ["Analytics", "This website may use aggregated analytics to understand how visitors use the site. That information is intended to improve the experience and does not identify individual visitors."],
  ["Questions", "For questions about how your information is handled, contact Gewa Realty directly."],
];

export default function PrivacyPage() { return <main className="interior-page min-h-screen bg-pearl"><Navbar /><PageHero eyebrow="Your information, respected" title={<>Privacy<br /><i className="text-champagne">policy.</i></>} description="A clear view of what information is collected and how it is used to help with your Goa property search." image="/images/villa-candolim-3.jpg" number="19" /><section className="section-spacing"><div className="mx-auto max-w-3xl space-y-4 px-5 md:px-8">{principles.map(([heading, text], index) => <article key={heading} data-reveal data-reveal-delay={String(index * .06)} className="content-surface shape-tall p-6 md:p-8"><span className="font-[Manrope] text-[9px] tracking-[.18em] text-champagne uppercase">0{index + 1}</span><h2 className="mt-3 font-[Cormorant_Garamond] text-3xl font-light text-sand">{heading}</h2><p className="mt-4 font-[Manrope] text-sm leading-7 text-sand/62">{text}</p></article>)}</div></section><Footer /></main>; }
