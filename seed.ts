import { db } from "./src/db/index";
import { properties, locations, blogPosts, faqs, adminUsers } from "./src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function seed() {
  if (!db) {
    throw new Error("DATABASE_URL is required to seed the PostgreSQL database.");
  }

  // Create admin user only when secure credentials are supplied.
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const existingAdmin = await db.select().from(adminUsers).where(eq(adminUsers.email, adminEmail)).limit(1);
    if (existingAdmin.length === 0) {
      const hash = await bcrypt.hash(adminPassword, 12);
      await db.insert(adminUsers).values({
        name: process.env.ADMIN_NAME?.trim() || "Gewa Realty Admin",
        email: adminEmail,
        passwordHash: hash,
        role: "admin",
      });
      console.log("Admin user created");
    }
  } else {
    console.log("Admin user skipped. Set ADMIN_EMAIL and ADMIN_PASSWORD to create one.");
  }

  // Locations
  const locData = [
    { name: "Panjim", slug: "panjim", region: "north_goa", description: "The capital city of Goa, offering a blend of Portuguese heritage and modern urban living.", lifestyle: "Urban coastal living with heritage charm", connectivity: "30 min to airport, well connected to all major areas", latitude: "15.4909", longitude: "73.8278" },
    { name: "Porvorim", slug: "porvorim", region: "north_goa", description: "A rapidly developing residential hub near Panjim with excellent connectivity.", lifestyle: "Suburban comfort with easy city access", connectivity: "15 min to Panjim, 35 min to airport", latitude: "15.5192", longitude: "73.8290" },
    { name: "Mapusa", slug: "mapusa", region: "north_goa", description: "A bustling commercial town known for its Friday market and growing residential options.", lifestyle: "Traditional Goan town life with commercial energy", connectivity: "20 min to Panjim, 40 min to airport", latitude: "15.5948", longitude: "73.8018" },
    { name: "Calangute", slug: "calangute", region: "north_goa", description: "One of Goa's most popular beach areas with strong rental and investment potential.", lifestyle: "Beach lifestyle with tourism energy", connectivity: "25 min to Panjim, 45 min to airport", latitude: "15.5449", longitude: "73.7550" },
    { name: "Candolim", slug: "candolim", region: "north_goa", description: "An upscale beachside location favored for luxury homes and holiday properties.", lifestyle: "Premium beachside living", connectivity: "25 min to Panjim, 45 min to airport", latitude: "15.5178", longitude: "73.7522" },
    { name: "Siolim", slug: "siolim", region: "north_goa", description: "A charming village along the Chapora River, popular for luxury villas and quiet living.", lifestyle: "Riverside village charm with luxury homes", connectivity: "30 min to Panjim, 50 min to airport", latitude: "15.6152", longitude: "73.7540" },
    { name: "Anjuna", slug: "anjuna", region: "north_goa", description: "Known for its bohemian vibe, Wednesday flea market, and cliff-backed beaches.", lifestyle: "Creative coastal living with vibrant community", connectivity: "30 min to Panjim, 50 min to airport", latitude: "15.5930", longitude: "73.7362" },
    { name: "Assagao", slug: "assagao", region: "north_goa", description: "A quiet, upscale village attracting luxury villa developments and second-home buyers.", lifestyle: "Peaceful village luxury with green surroundings", connectivity: "35 min to Panjim, 50 min to airport", latitude: "15.6031", longitude: "73.7400" },
    { name: "Margao", slug: "margao", region: "south_goa", description: "South Goa's commercial capital with strong infrastructure and residential growth.", lifestyle: "Urban South Goa living with commercial convenience", connectivity: "35 min to Dabolim airport, well connected", latitude: "15.2843", longitude: "74.0320" },
    { name: "Vasco", slug: "vasco", region: "south_goa", description: "A port city near the airport with affordable housing options and commercial activity.", lifestyle: "Port city practicality with good connectivity", connectivity: "5 min to Dabolim airport", latitude: "15.3900", longitude: "73.8100" },
    { name: "Ponda", slug: "ponda", region: "central_goa", description: "A central Goa town with growing real estate activity and cultural significance.", lifestyle: "Central Goa convenience with traditional roots", connectivity: "30 min to Panjim, 40 min to Margao", latitude: "15.4053", longitude: "74.0202" },
    { name: "Madgaon", slug: "madgaon", region: "south_goa", description: "A bustling area with excellent railway connectivity and growing property demand.", lifestyle: "Well-connected urban living in South Goa", connectivity: "Railway hub, 35 min to airport", latitude: "15.2993", longitude: "74.0866" },
  ];

  for (const loc of locData) {
    await db.insert(locations).values(loc).onConflictDoNothing();
  }
  console.log("Locations seeded");

  // Properties
  const propertyData = [
    {
      title: "Tropical Villa in Siolim",
      slug: "tropical-villa-siolim",
      propertyId: "GR-001",
      category: "villa" as const,
      listingType: "buy" as const,
      status: "featured" as const,
      location: "Siolim",
      area: "Siolim",
      region: "North Goa",
      latitude: "15.6152",
      longitude: "73.7540",
      showExactLocation: false,
      price: "3500000",
      bedrooms: 4,
      bathrooms: 4,
      builtUpArea: "3500",
      plotArea: "500",
      furnishing: "semi_furnished" as const,
      parking: 2,
      description: "A stunning 4BHK villa nestled along the Chapora River in Siolim. This property features contemporary tropical architecture with open-plan living, a private swimming pool, and lush landscaped gardens. Perfect as a primary residence or luxury second home.",
      shortDescription: "4BHK river-view villa with pool and gardens in Siolim",
      story: "A tropical residence designed for people who want the calm of Goa without disconnecting from everyday convenience. Set along the Chapora River, this villa lets you wake up to water views and end the day by the pool under a canopy of palms.",
      heroImage: "/images/villa-siolim.jpg",
      gallery: ["/images/villa-siolim-1.jpg", "/images/villa-siolim-2.jpg", "/images/villa-siolim-3.jpg"],
      amenities: ["Swimming Pool", "Private Garden", "Parking", "Security", "Balcony", "River View", "Gated Community", "Power Backup"],
      airportDistance: "50 min",
      beachDistance: "15 min",
      nearbyLandmarks: "Chapora Fort, Saturday Night Market",
      neighbourhood: "Quiet riverside village with upscale residential community",
      isFeatured: true,
      isPublished: true,
      seoTitle: "4BHK Villa for Sale in Siolim, Goa | Gewa Realty",
      seoDescription: "Premium 4BHK tropical villa with pool and river views in Siolim, North Goa. Listed by Gewa Realty.",
    },
    {
      title: "Luxury Apartment in Panjim",
      slug: "luxury-apartment-panjim",
      propertyId: "GR-002",
      category: "apartment" as const,
      listingType: "buy" as const,
      status: "new" as const,
      location: "Panjim",
      area: "Panjim",
      region: "North Goa",
      latitude: "15.4909",
      longitude: "73.8278",
      showExactLocation: true,
      price: "1200000",
      bedrooms: 3,
      bathrooms: 2,
      builtUpArea: "1800",
      plotArea: null,
      furnishing: "fully_furnished" as const,
      parking: 1,
      floor: 5,
      totalFloors: 8,
      description: "A beautifully appointed 3BHK apartment in the heart of Panjim with panoramic city views. This ready-to-move home features modern interiors, a modular kitchen, and access to premium amenities including a rooftop pool and gym.",
      shortDescription: "3BHK furnished apartment with rooftop pool in Panjim",
      story: "City living meets coastal ease. This Panjim apartment places you at the centre of Goa's capital — close to heritage lanes, waterfront promenades, and everyday conveniences — while offering the comfort of a premium gated community.",
      heroImage: "/images/apt-panjim.jpg",
      gallery: ["/images/apt-panjim-1.jpg", "/images/apt-panjim-2.jpg"],
      amenities: ["Swimming Pool", "Gym", "Lift", "Security", "Parking", "Power Backup", "Modular Kitchen", "Balcony"],
      airportDistance: "30 min",
      beachDistance: "10 min",
      nearbyLandmarks: "Fontainhas, Mandovi Riverfront, Immaculate Conception Church",
      neighbourhood: "Central Panjim with walkable access to all amenities",
      isFeatured: true,
      isPublished: true,
      seoTitle: "3BHK Apartment for Sale in Panjim, Goa | Gewa Realty",
      seoDescription: "Luxury 3BHK furnished apartment in Panjim, Goa with rooftop pool and gym. Listed by Gewa Realty.",
    },
    {
      title: "NA Plot in Assagao",
      slug: "na-plot-assagao",
      propertyId: "GR-003",
      category: "plot" as const,
      listingType: "buy" as const,
      status: "exclusive" as const,
      location: "Assagao",
      area: "Assagao",
      region: "North Goa",
      latitude: "15.6031",
      longitude: "73.7400",
      showExactLocation: false,
      price: "800000",
      pricePerSqm: "16000",
      plotArea: "500",
      plotType: "na" as const,
      description: "A well-located NA plot in the peaceful village of Assagao, suitable for a villa or boutique development. The plot has good road access and is in a zone with several premium residential projects nearby.",
      shortDescription: "500 sq.m. NA plot with road access in Assagao",
      story: "Assagao is one of North Goa's most desirable villages for villa development. This plot offers the opportunity to create a custom home in a green, peaceful setting that's still minutes from Anjuna and Mapusa.",
      heroImage: "/images/plot-assagao.jpg",
      gallery: [],
      amenities: ["Gated Community"],
      roadAccess: "Tar road, 6m wide",
      zone: "Residential NA",
      frontage: "15m",
      documentsAvailable: "7/12 extract, NA order, property tax receipts",
      airportDistance: "50 min",
      beachDistance: "15 min",
      isFeatured: true,
      isPublished: true,
      seoTitle: "NA Plot for Sale in Assagao, Goa | Gewa Realty",
      seoDescription: "500 sq.m. NA plot in Assagao, North Goa — ideal for villa construction. Listed by Gewa Realty.",
    },
    {
      title: "Sea-View Villa in Candolim",
      slug: "sea-view-villa-candolim",
      propertyId: "GR-004",
      category: "villa" as const,
      listingType: "buy" as const,
      status: "featured" as const,
      location: "Candolim",
      area: "Candolim",
      region: "North Goa",
      latitude: "15.5178",
      longitude: "73.7522",
      showExactLocation: false,
      price: "5500000",
      bedrooms: 5,
      bathrooms: 5,
      builtUpArea: "4500",
      plotArea: "600",
      furnishing: "fully_furnished" as const,
      parking: 3,
      description: "An exceptional 5BHK sea-view villa in Candolim with infinity pool, private garden, and direct beach proximity. Designed for luxury living with high-end finishes throughout.",
      shortDescription: "5BHK sea-view villa with infinity pool in Candolim",
      story: "Where the sound of waves becomes your morning alarm. This Candolim villa is for those who want the beach not as a visit but as a neighbour — with the privacy and scale that only a truly premium property can provide.",
      heroImage: "/images/villa-candolim.jpg",
      gallery: ["/images/villa-candolim-1.jpg", "/images/villa-candolim-2.jpg", "/images/villa-candolim-3.jpg"],
      amenities: ["Swimming Pool", "Private Garden", "Parking", "Security", "Balcony", "Sea View", "Gated Community", "Furnished", "Modular Kitchen", "Power Backup"],
      airportDistance: "45 min",
      beachDistance: "2 min walk",
      nearbyLandmarks: "Candolim Beach, Aguada Fort, Sinquerim",
      isFeatured: true,
      isPublished: true,
      seoTitle: "5BHK Sea-View Villa in Candolim, Goa | Gewa Realty",
      seoDescription: "Premium 5BHK sea-view villa with infinity pool in Candolim, North Goa. Listed by Gewa Realty.",
    },
    {
      title: "Penthouse in Calangute",
      slug: "penthouse-calangute",
      propertyId: "GR-005",
      category: "penthouse" as const,
      listingType: "invest" as const,
      status: "pre_launch" as const,
      location: "Calangute",
      area: "Calangute",
      region: "North Goa",
      latitude: "15.5449",
      longitude: "73.7550",
      showExactLocation: false,
      price: "2100000",
      bedrooms: 3,
      bathrooms: 3,
      builtUpArea: "2200",
      furnishing: "semi_furnished" as const,
      parking: 2,
      floor: 7,
      totalFloors: 7,
      description: "A pre-launch 3BHK penthouse in Calangute with a private terrace and ocean views. Strong rental potential in one of Goa's most visited areas.",
      shortDescription: "3BHK penthouse with private terrace in Calangute",
      heroImage: "/images/penthouse-calangute.jpg",
      gallery: [],
      amenities: ["Swimming Pool", "Gym", "Lift", "Security", "Parking", "Balcony", "Sea View", "Clubhouse"],
      airportDistance: "45 min",
      beachDistance: "5 min walk",
      isFeatured: false,
      isPublished: true,
      seoTitle: "3BHK Penthouse in Calangute, Goa | Gewa Realty",
      seoDescription: "Pre-launch 3BHK penthouse with ocean views in Calangute, Goa. Investment opportunity listed by Gewa Realty.",
    },
    {
      title: "Commercial Space in Margao",
      slug: "commercial-space-margao",
      propertyId: "GR-006",
      category: "commercial" as const,
      listingType: "commercial" as const,
      status: "available" as const,
      location: "Margao",
      area: "Margao",
      region: "South Goa",
      latitude: "15.2843",
      longitude: "74.0320",
      showExactLocation: true,
      price: "950000",
      builtUpArea: "1200",
      description: "A well-positioned commercial space on a main road in Margao, suitable for retail, office, or showroom use. High footfall area with excellent visibility.",
      shortDescription: "1200 sq.ft. commercial space on main road in Margao",
      heroImage: "/images/commercial-margao.jpg",
      gallery: [],
      amenities: ["Parking", "Power Backup"],
      airportDistance: "35 min",
      nearbyLandmarks: "Margao Municipal Market, Bus Stand",
      isFeatured: false,
      isPublished: true,
      seoTitle: "Commercial Space for Sale in Margao, Goa | Gewa Realty",
      seoDescription: "1200 sq.ft. commercial space on main road in Margao, South Goa. Listed by Gewa Realty.",
    },
    {
      title: "Settlement Plot in Ponda",
      slug: "settlement-plot-ponda",
      propertyId: "GR-007",
      category: "land" as const,
      listingType: "buy" as const,
      status: "available" as const,
      location: "Ponda",
      area: "Ponda",
      region: "Central Goa",
      latitude: "15.4053",
      longitude: "74.0202",
      showExactLocation: false,
      price: "450000",
      pricePerSqm: "9000",
      plotArea: "300",
      plotType: "settlement" as const,
      description: "A 300 sq.m. settlement plot in a residential area of Ponda with road access and basic infrastructure available. Suitable for a family home.",
      shortDescription: "300 sq.m. settlement plot in Ponda with road access",
      heroImage: "/images/plot-ponda.jpg",
      gallery: [],
      amenities: [],
      roadAccess: "Internal road, 4m wide",
      zone: "Settlement",
      documentsAvailable: "7/12 extract, property tax receipts",
      airportDistance: "40 min",
      isFeatured: false,
      isPublished: true,
      seoTitle: "Settlement Plot in Ponda, Goa | Gewa Realty",
      seoDescription: "300 sq.m. settlement plot for sale in Ponda, Central Goa. Listed by Gewa Realty.",
    },
    {
      title: "Modern 2BHK in Porvorim",
      slug: "modern-2bhk-porvorim",
      propertyId: "GR-008",
      category: "apartment" as const,
      listingType: "buy" as const,
      status: "ready_to_move" as const,
      location: "Porvorim",
      area: "Porvorim",
      region: "North Goa",
      latitude: "15.5192",
      longitude: "73.8290",
      showExactLocation: true,
      price: "650000",
      bedrooms: 2,
      bathrooms: 2,
      builtUpArea: "950",
      furnishing: "unfurnished" as const,
      parking: 1,
      floor: 3,
      totalFloors: 6,
      description: "A ready-to-move 2BHK apartment in Porvorim with modern amenities and proximity to schools, hospitals, and the Panjim-Margao highway.",
      shortDescription: "Ready 2BHK apartment in Porvorim near Panjim",
      heroImage: "/images/apt-porvorim.jpg",
      gallery: [],
      amenities: ["Lift", "Security", "Parking", "Power Backup", "Gym"],
      airportDistance: "35 min",
      beachDistance: "15 min",
      isFeatured: false,
      isPublished: true,
      seoTitle: "2BHK Apartment in Porvorim, Goa | Gewa Realty",
      seoDescription: "Ready-to-move 2BHK apartment in Porvorim, North Goa. Listed by Gewa Realty.",
    },
  ];

  for (const prop of propertyData) {
    await db.insert(properties).values(prop).onConflictDoNothing();
  }
  console.log("Properties seeded");

  // FAQs
  const faqData = [
    { question: "What is the difference between NA and Settlement plots in Goa?", answer: "NA (Non-Agricultural) plots have conversion orders allowing non-agricultural construction. Settlement plots are within designated settlement zones. Both allow residential construction, but NA plots typically have clearer development permissions. Always verify through a legal professional.", category: "Plots & Land" },
    { question: "Can a non-Goan buy property in Goa?", answer: "Yes, Indian citizens from any state can purchase property in Goa. There are no restrictions on Indian citizens buying residential or commercial property. Foreign nationals are subject to FEMA regulations.", category: "Buying in Goa" },
    { question: "What documents should I verify before buying property in Goa?", answer: "Key documents include the Sale Deed, 7/12 extract, property tax receipts, building permissions, and RERA registration where applicable. For plots, additionally check NA order, zoning, and survey maps. Always engage a qualified legal professional for due diligence.", category: "Property Documents" },
    { question: "Is North Goa or South Goa better for property investment?", answer: "Both have distinct advantages. North Goa offers established infrastructure, tourism-driven rental demand, and higher visibility. South Goa provides relatively lower entry prices, growing infrastructure, and quieter surroundings. The right choice depends on your specific goals, budget, and intended use.", category: "Investing in Goa" },
    { question: "What are the typical stamp duty and registration charges in Goa?", answer: "Stamp duty and registration rates in Goa may vary and are subject to government revision. We recommend checking current rates with the Sub-Registrar's office or your legal advisor at the time of transaction.", category: "Buying in Goa" },
    { question: "How does Gewa Realty help with site visits?", answer: "We arrange guided site visits to shortlisted properties, including transportation coordination and property walkthroughs. Our advisors accompany you to provide local context and answer questions about the area and property.", category: "Gewa Realty" },
  ];

  for (const faq of faqData) {
    await db.insert(faqs).values(faq);
  }
  console.log("FAQs seeded");

  // Blog posts
  const blogData = [
    {
      title: "Villa vs Apartment in Goa: What Suits You?",
      slug: "villa-vs-apartment-goa",
      category: "Buying in Goa",
      excerpt: "Understanding the key differences between villa and apartment ownership in Goa to help you make an informed decision.",
      content: "When choosing between a villa and an apartment in Goa, consider factors like budget, maintenance commitment, rental potential, and lifestyle preference.\n\n**Villas** offer privacy, outdoor space, and customisation but require more maintenance and typically have higher entry prices. They're ideal for those seeking a standalone home or a premium second residence.\n\n**Apartments** provide shared amenities, lower maintenance, and better security. They often offer stronger rental yields relative to price and suit buyers who want lock-and-go convenience.\n\nBoth can work for investment — the right choice depends on your specific goals, budget, and how you plan to use the property.",
      isPublished: true,
      publishedAt: new Date(),
      seoTitle: "Villa vs Apartment in Goa — Which to Buy? | Gewa Realty",
      seoDescription: "Compare villas and apartments in Goa. Understand the pros, cons, and investment positioning of each. Advisory by Gewa Realty.",
    },
    {
      title: "Understanding Settlement and NA Plots in Goa",
      slug: "understanding-settlement-na-plots-goa",
      category: "Plots & Land",
      excerpt: "A clear guide to settlement plots, NA plots, and what each means for your construction plans in Goa.",
      content: "Land in Goa is broadly classified into different zones, and understanding these is essential before purchasing a plot.\n\n**Settlement Zone plots** are within areas designated for residential development in the Regional Plan. Construction is generally permitted subject to prevailing zoning regulations and building permissions.\n\n**NA (Non-Agricultural) plots** have a specific conversion order that changes the land's use from agricultural to non-agricultural. This provides clearer permission for construction but requires that the NA order be properly obtained and verified.\n\nOther categories include orchard land, industrial zones, and commercial zones.\n\n**Important:** Always verify land classification, zoning, and all permissions through a qualified legal professional before purchasing. Regulations and their interpretation can change.",
      isPublished: true,
      publishedAt: new Date(),
      seoTitle: "Settlement vs NA Plots in Goa — Explained | Gewa Realty",
      seoDescription: "Understand settlement plots and NA plots in Goa before buying land. Clear advisory from Gewa Realty.",
    },
    {
      title: "North Goa vs South Goa: Where Should You Buy?",
      slug: "north-goa-vs-south-goa",
      category: "Location Guides",
      excerpt: "A comparison of North and South Goa for property buyers — lifestyle, infrastructure, pricing, and investment considerations.",
      content: "Goa's two districts offer distinctly different property landscapes.\n\n**North Goa** is the more established market with areas like Panjim, Porvorim, Calangute, Candolim, Siolim, and Assagao. It offers greater tourism activity, more developed infrastructure, higher property visibility, and typically higher rental demand. Prices are generally higher, especially in beach-adjacent areas.\n\n**South Goa** includes Margao, Vasco, and areas like Colva and Benaulim. It offers relatively lower entry prices, quieter surroundings, growing infrastructure, and a more relaxed lifestyle. The airport (Dabolim) is in South Goa, which benefits Vasco and nearby areas.\n\n**Central Goa** towns like Ponda offer central connectivity and moderate pricing.\n\nNeither is universally 'better' — the right area depends on your budget, purpose (home vs investment), preferred lifestyle, and connectivity needs.",
      isPublished: true,
      publishedAt: new Date(),
      seoTitle: "North Goa vs South Goa Property Guide | Gewa Realty",
      seoDescription: "Compare North Goa and South Goa for property purchase. Lifestyle, prices, and investment positioning — Gewa Realty advisory.",
    },
  ];

  for (const post of blogData) {
    await db.insert(blogPosts).values(post).onConflictDoNothing();
  }
  console.log("Blog posts seeded");

  console.log("Seed complete!");
}

seed().catch(console.error);
