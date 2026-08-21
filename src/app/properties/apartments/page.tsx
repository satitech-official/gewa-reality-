import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionLanding from "@/components/CollectionLanding";

export default function ApartmentsPage() {
  return <><Navbar /><CollectionLanding eyebrow="Contemporary coastal living" title={<>Apartments <i className="text-champagne">in Goa.</i></>} description="Modern homes, thoughtful amenities and the simplicity of lock-and-go ownership." heroImage="/images/apt-panjim.jpg" number="08" collectionName="apartments" href="/properties?category=apartment" gallery={["/images/apt-panjim-1.jpg", "/images/apt-porvorim.jpg", "/images/apt-panjim-2.jpg"]} insight="For buyers who value a lighter ownership experience, apartments bring location, security and shared amenities into an easy everyday rhythm." points={["Modern community amenities", "Convenient city and coastal addresses", "Designed for easy ownership"]} /><Footer /></>;
}
