import { getInsightsData } from "@/lib/server-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const { posts, allFaqs } = await getInsightsData();

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow="Property intelligence" title={<>Goa property<br /><i className="text-champagne">insights.</i></>} description="Guides, comparisons and the kind of context that brings clarity to property decisions." image="/images/apt-panjim-1.jpg" number="11" />
      <section className="section-spacing">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {posts.map((post, index) => (
                <Link key={post.id} href={`/insights/${post.slug}`} data-reveal data-reveal-delay={String(index * .1)} className={`group relative min-h-[360px] overflow-hidden border border-white/10 bg-obsidian ${index === 0 ? "shape-tall" : index === 1 ? "shape-arch" : "shape-slant"}`}>
                  <img src={post.heroImage || ["/images/about-goa.jpg", "/images/villa-siolim-1.jpg", "/images/plot-assagao.jpg"][index % 3]} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6"><span className="font-[Manrope] text-[10px] tracking-[.16em] uppercase text-champagne">{post.category}</span><h2 className="font-[Cormorant_Garamond] text-3xl text-sand font-light mt-3 mb-3 leading-[.95]">{post.title}</h2><p className="font-[Manrope] text-xs text-sand/60 leading-relaxed line-clamp-2">{post.excerpt}</p><span className="mt-4 inline-block font-[Manrope] text-[9px] tracking-[.15em] text-champagne uppercase">Read guide ↗</span></div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="font-[Manrope] text-sm text-olive/50 text-center py-10">Insights coming soon.</p>
          )}

          {allFaqs.length > 0 && (
            <>
              <h2 className="font-[Cormorant_Garamond] text-4xl text-sand font-light mb-8">Frequently asked questions</h2>
              <div className="space-y-4 max-w-3xl">
                {allFaqs.map((faq) => (
                  <details key={faq.id} className="content-surface shape-tall group">
                    <summary className="px-6 py-5 cursor-pointer font-[Manrope] text-sm text-sand font-medium list-none flex items-center justify-between hover:bg-white/5 transition-colors">
                      {faq.question}
                      <span className="text-champagne group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-6 pb-5 font-[Manrope] text-xs text-sand/60 leading-relaxed border-t border-white/10 pt-4">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
