import { getBlogPostBySlug } from "@/lib/server-data";
import { mockBlogPosts } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { notFound } from "next/navigation";

export const dynamic = process.env.GITHUB_PAGES === "true" ? "force-static" : "force-dynamic";

export function generateStaticParams() {
  return mockBlogPosts.filter((post) => post.isPublished).map((post) => ({ slug: post.slug }));
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PageHero eyebrow={post.category || "Property guide"} title={<>{post.title}</>} description={post.excerpt || "A considered guide from Gewa Realty."} image={post.heroImage || "/images/about-goa.jpg"} number="17" />
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="content-surface shape-tall p-6 md:p-10"><div className="font-[Manrope] text-sm text-sand/75 leading-8 whitespace-pre-line">{post.content}</div><div className="mt-12 pt-6 border-t border-white/10"><p className="font-[Manrope] text-[10px] text-sand/40">Always verify property-related information through qualified professionals. This content is for general guidance only.</p></div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
