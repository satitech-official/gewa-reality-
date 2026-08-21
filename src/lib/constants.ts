export const COLORS = {
  obsidian: "#080B0A",
  forest: "#12382E",
  forestLight: "#1A4D3E",
  champagne: "#D7BE83",
  champagneLight: "#E8D5A0",
  sand: "#EEE5D5",
  pearl: "#F7F7F3",
  olive: "#768276",
  oliveLight: "#9BA69B",
  gold: "#C8A84E",
  goldLight: "#D4B866",
} as const;

export const WHATSAPP_NUMBER = "918208337147";
export const PHONE_NUMBER = "+91 8208337147";
export const PHONE_NUMBER_2 = "+91 9637212564";
export const INSTAGRAM_HANDLE = "@gewarealtygoa";
export const INSTAGRAM_URL = "https://instagram.com/gewarealtygoa";

export const PROPERTY_CATEGORIES = [
  { value: "villa", label: "Villa", icon: "Home" },
  { value: "apartment", label: "Apartment", icon: "Building2" },
  { value: "plot", label: "Plot", icon: "Square" },
  { value: "commercial", label: "Commercial", icon: "Store" },
  { value: "land", label: "Land", icon: "Trees" },
  { value: "investment", label: "Investment", icon: "TrendingUp" },
  { value: "luxury", label: "Luxury", icon: "Crown" },
  { value: "penthouse", label: "Penthouse", icon: "Building" },
  { value: "farmhouse", label: "Farmhouse", icon: "Warehouse" },
] as const;

export const GOA_REGIONS = [
  { value: "north_goa", label: "North Goa" },
  { value: "south_goa", label: "South Goa" },
  { value: "central_goa", label: "Central Goa" },
] as const;

export const BUDGET_RANGES = [
  { value: "0-5000000", label: "Under ₹50L" },
  { value: "5000000-10000000", label: "₹50L – ₹1Cr" },
  { value: "10000000-20000000", label: "₹1Cr – ₹2Cr" },
  { value: "20000000-50000000", label: "₹2Cr – ₹5Cr" },
  { value: "50000000+", label: "₹5Cr+" },
] as const;

export const LISTING_TYPES = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "invest", label: "Invest" },
  { value: "commercial", label: "Commercial" },
] as const;

export const AMENITIES_LIST = [
  "Swimming Pool", "Private Garden", "Parking", "Security", "Power Backup",
  "Lift", "Clubhouse", "Gym", "Balcony", "Sea View", "River View",
  "Forest View", "Gated Community", "Furnished", "Modular Kitchen",
] as const;

export const PROPERTY_STATUSES = [
  "available", "new", "featured", "exclusive", "pre_launch",
  "under_construction", "ready_to_move", "reserved", "sold", "rented", "off_market",
] as const;

export const STATUS_LABELS: Record<string, string> = {
  available: "Available",
  new: "New",
  featured: "Featured",
  exclusive: "Exclusive",
  pre_launch: "Pre-Launch",
  under_construction: "Under Construction",
  ready_to_move: "Ready to Move",
  reserved: "Reserved",
  sold: "Sold",
  rented: "Rented",
  off_market: "Off Market",
};

export const FURNISHING_LABELS: Record<string, string> = {
  unfurnished: "Unfurnished",
  semi_furnished: "Semi-Furnished",
  fully_furnished: "Fully Furnished",
};

export function formatPrice(price: string | number | null, priceOnRequest?: boolean): string {
  if (priceOnRequest) return "Price on Request";
  if (!price) return "Price on Request";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${num.toLocaleString("en-IN")}`;
}

export function generateWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
