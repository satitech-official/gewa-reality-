import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionLanding from "@/components/CollectionLanding";

export default function VillasPage() {
  return <><Navbar /><CollectionLanding eyebrow="Private tropical residences" title={<>Villas <i className="text-champagne">in Goa.</i></>} description="Private spaces, tropical living and a more personal relationship with the landscape." heroImage="/images/villa-candolim.jpg" number="07" collectionName="villas" href="/properties?category=villa" gallery={["/images/villa-siolim.jpg", "/images/villa-candolim-1.jpg", "/images/villa-siolim-2.jpg"]} insight="From garden retreats to contemporary coastal homes, a villa is about having room for slower mornings, longer stays and your own version of Goa." points={["Private pools and gardens", "Village and coastside settings", "Holiday home potential"]} /><Footer /></>;
}
