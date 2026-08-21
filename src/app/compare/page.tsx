import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Columns3, Sparkles } from "lucide-react";

export default function ComparePage() { return <main className="interior-page min-h-screen bg-pearl"><Navbar /><PageHero eyebrow="A clearer comparison" title={<>See the details<br /><i className="text-champagne">side by side.</i></>} description="Bring up to four saved properties together and compare the things that genuinely matter." image="/images/apt-panjim-2.jpg" number="15" /><section className="section-spacing"><div className="content-surface shape-tall mx-auto max-w-3xl px-6 py-14 text-center md:px-14"><span className="inline-grid h-14 w-14 place-items-center rounded-full border border-champagne/40 text-champagne"><Columns3 size={21} /></span><h2 className="mt-6 font-[Cormorant_Garamond] text-4xl font-light text-sand">Make a considered choice.</h2><p className="mx-auto mt-4 max-w-md font-[Manrope] text-sm leading-7 text-sand/55">Save the properties that interest you, then select up to four to compare location, space, price and key features.</p><Link href="/properties" className="luxury-button mt-8">Browse the collection <Sparkles size={14} /></Link></div></section><Footer /></main>; }
