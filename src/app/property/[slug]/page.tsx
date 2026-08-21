import { getPropertyBySlug } from "@/lib/server-data";
import { mockProperties } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyDetailClient from "./PropertyDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return mockProperties.filter((property) => property.isPublished).map((property) => ({ slug: property.slug }));
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  return (
    <main className="interior-page min-h-screen bg-pearl">
      <Navbar />
      <PropertyDetailClient property={property} />
      <Footer />
    </main>
  );
}
