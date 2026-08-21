import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionLanding from "@/components/CollectionLanding";

export default function PlotsPage() {
  return <><Navbar /><CollectionLanding eyebrow="Build your own Goa story" title={<>Plots &amp; land<br /><i className="text-champagne">in Goa.</i></>} description="Land that gives your plans a foundation — evaluated with proper local context." heroImage="/images/plot-assagao.jpg" number="09" collectionName="plots & land" href="/properties?category=plot" gallery={["/images/plot-ponda.jpg", "/images/about-goa.jpg", "/images/plot-assagao.jpg"]} insight="A piece of land carries possibilities as well as responsibility. We help orient conversations around location, zoning and the professionals required for a considered purchase." points={["Settlement and NA plot options", "Zoning context and connections", "Land suited to a long view"]} /><Footer /></>;
}
