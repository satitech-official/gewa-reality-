import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Heart, Sparkles } from "lucide-react";

export default function ShortlistPage() { return <main className="interior-page min-h-screen bg-pearl"><Navbar /><PageHero eyebrow="Your private edit" title={<>Saved<br /><i className="text-champagne">residences.</i></>} description="Keep the places that spoke to you together, ready for a more considered look." image="/images/villa-siolim-1.jpg" number="14" /><section className="section-spacing"><div className="content-surface shape-tall mx-auto max-w-3xl px-6 py-14 text-center md:px-14"><span className="inline-grid h-14 w-14 place-items-center rounded-full border border-champagne/40 text-champagne"><Heart size={21} /></span><h2 className="mt-6 font-[Cormorant_Garamond] text-4xl font-light text-sand">Start your shortlist.</h2><p className="mx-auto mt-4 max-w-md font-[Manrope] text-sm leading-7 text-sand/55">Your saved homes are stored privately on this device. Tap the heart on any residence to bring it here.</p><Link href="/properties" className="luxury-button mt-8">Discover properties <Sparkles size={14} /></Link></div></section><Footer /></main>; }
