import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import PremiumShell from "@/components/PremiumShell";

export const metadata: Metadata = {
  title: {
    default: "Gewa Realty — Premium Goa Property & Investment Advisory",
    template: "%s | Gewa Realty Goa",
  },
  description: "Curated villas, apartments, plots and investment opportunities in Goa. Guided by local property expertise. Residential & Commercial Advisory.",
  keywords: ["Goa Property", "Property for Sale in Goa", "Goa Real Estate", "Goa Villas for Sale", "Plots for Sale in Goa", "Apartments for Sale in Goa", "Luxury Property Goa", "Commercial Property Goa", "Investment Property Goa", "Ponda Property"],
  openGraph: {
    title: "Gewa Realty — Premium Goa Property & Investment Advisory",
    description: "Curated villas, apartments, plots and investment opportunities in Goa.",
    url: "https://gewarealty.com",
    siteName: "Gewa Realty",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://gewarealty.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Serif+Display&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-pearl text-obsidian antialiased font-[Manrope,sans-serif]">
        <PremiumShell>{children}</PremiumShell>
      </body>
    </html>
  );
}
