import { pgTable, uuid, text, integer, boolean, timestamp, jsonb, numeric, varchar, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const propertyStatusEnum = pgEnum("property_status", [
  "available", "new", "featured", "exclusive", "pre_launch",
  "under_construction", "ready_to_move", "reserved", "sold",
  "rented", "off_market"
]);

export const listingTypeEnum = pgEnum("listing_type", [
  "buy", "rent", "invest", "commercial"
]);

export const propertyCategoryEnum = pgEnum("property_category", [
  "villa", "apartment", "plot", "commercial", "land",
  "investment", "luxury", "penthouse", "farmhouse"
]);

export const leadStageEnum = pgEnum("lead_stage", [
  "new", "contacted", "qualified", "site_visit",
  "follow_up", "negotiation", "closed_won", "closed_lost"
]);

export const leadSourceEnum = pgEnum("lead_source", [
  "instagram", "google", "direct", "whatsapp", "website", "referral", "facebook"
]);

export const siteVisitStatusEnum = pgEnum("site_visit_status", [
  "requested", "confirmed", "completed", "rescheduled", "cancelled"
]);

export const furnishingEnum = pgEnum("furnishing", [
  "unfurnished", "semi_furnished", "fully_furnished"
]);

export const plotTypeEnum = pgEnum("plot_type", [
  "settlement", "na", "orchard", "commercial", "residential", "development"
]);

// Properties
export const properties = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  propertyId: varchar("property_id", { length: 50 }).notNull().unique(),
  category: propertyCategoryEnum("category").notNull(),
  listingType: listingTypeEnum("listing_type").notNull(),
  status: propertyStatusEnum("status").default("available"),
  plotType: plotTypeEnum("plot_type"),

  // Location
  location: varchar("location", { length: 255 }),
  area: varchar("area", { length: 100 }),
  region: varchar("region", { length: 50 }),
  latitude: numeric("latitude", { precision: 10, scale: 7 }),
  longitude: numeric("longitude", { precision: 10, scale: 7 }),
  showExactLocation: boolean("show_exact_location").default(false),
  neighbourhood: text("neighbourhood"),

  // Price
  price: numeric("price", { precision: 15, scale: 2 }),
  priceOnRequest: boolean("price_on_request").default(false),
  pricePerSqm: numeric("price_per_sqm", { precision: 15, scale: 2 }),

  // Specs
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  builtUpArea: numeric("built_up_area", { precision: 10, scale: 2 }),
  plotArea: numeric("plot_area", { precision: 10, scale: 2 }),
  furnishing: furnishingEnum("furnishing"),
  parking: integer("parking"),
  floor: integer("floor"),
  totalFloors: integer("total_floors"),
  age: varchar("age", { length: 50 }),
  availability: varchar("availability", { length: 100 }),
  ownership: varchar("ownership", { length: 100 }),
  possession: varchar("possession", { length: 100 }),

  // Content
  description: text("description"),
  shortDescription: text("short_description"),
  story: text("story"),

  // Media
  heroImage: text("hero_image"),
  gallery: jsonb("gallery").$type<string[]>(),
  videos: jsonb("videos").$type<string[]>(),
  floorPlanImages: jsonb("floor_plan_images").$type<string[]>(),
  instagramReel: text("instagram_reel"),

  // Amenities
  amenities: jsonb("amenities").$type<string[]>(),

  // Connectivity
  airportDistance: varchar("airport_distance", { length: 50 }),
  beachDistance: varchar("beach_distance", { length: 50 }),
  nearbyLandmarks: text("nearby_landmarks"),
  hospitals: text("hospitals"),
  schools: text("schools"),
  restaurants: text("restaurants"),

  // Plot-specific
  roadAccess: varchar("road_access", { length: 100 }),
  zone: varchar("zone", { length: 100 }),
  frontage: varchar("frontage", { length: 100 }),
  documentsAvailable: text("documents_available"),

  // SEO
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),

  // Flags
  isFeatured: boolean("is_featured").default(false),
  isPublished: boolean("is_published").default(false),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Locations
export const locations = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  region: varchar("region", { length: 50 }).notNull(),
  description: text("description"),
  lifestyle: text("lifestyle"),
  connectivity: text("connectivity"),
  latitude: numeric("latitude", { precision: 10, scale: 7 }),
  longitude: numeric("longitude", { precision: 10, scale: 7 }),
  heroImage: text("hero_image"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Leads
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  whatsapp: varchar("whatsapp", { length: 20 }),
  stage: leadStageEnum("stage").default("new"),
  source: leadSourceEnum("source").default("website"),
  propertyId: uuid("property_id"),
  enquiryType: varchar("enquiry_type", { length: 100 }),
  message: text("message"),
  budget: varchar("budget", { length: 100 }),
  requirements: text("requirements"),
  preferredArea: varchar("preferred_area", { length: 100 }),
  propertyType: varchar("property_type", { length: 100 }),
  bedrooms: integer("bedrooms"),
  purpose: varchar("purpose", { length: 100 }),
  timeline: varchar("timeline", { length: 100 }),
  utmSource: varchar("utm_source", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),
  page: varchar("page", { length: 255 }),
  assignedAdvisor: varchar("assigned_advisor", { length: 255 }),
  followUpDate: timestamp("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Lead Notes
export const leadNotes = pgTable("lead_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id").notNull(),
  note: text("note").notNull(),
  createdBy: varchar("created_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Site Visits
export const siteVisits = pgTable("site_visits", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id"),
  propertyId: uuid("property_id"),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }),
  email: varchar("email", { length: 255 }),
  preferredDate: varchar("preferred_date", { length: 50 }),
  preferredTime: varchar("preferred_time", { length: 50 }),
  numVisitors: integer("num_visitors"),
  message: text("message"),
  status: siteVisitStatusEnum("status").default("requested"),
  advisor: varchar("advisor", { length: 255 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Seller Submissions
export const sellerSubmissions = pgTable("seller_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerName: varchar("owner_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  propertyType: varchar("property_type", { length: 100 }),
  location: varchar("location", { length: 255 }),
  expectedPrice: numeric("expected_price", { precision: 15, scale: 2 }),
  propertyArea: numeric("property_area", { precision: 10, scale: 2 }),
  bedrooms: integer("bedrooms"),
  status: varchar("status", { length: 50 }).default("pending_review"),
  description: text("description"),
  photos: jsonb("photos").$type<string[]>(),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admin Users
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 50 }).default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }),
  testimonial: text("testimonial").notNull(),
  image: text("image"),
  location: varchar("location", { length: 255 }),
  source: varchar("source", { length: 50 }),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Blog Posts
export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 100 }),
  excerpt: text("excerpt"),
  content: text("content"),
  heroImage: text("hero_image"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// FAQs
export const faqs = pgTable("faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }),
  order: integer("order").default(0),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Website Settings
export const websiteSettings = pgTable("website_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Analytics Events
export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  event: varchar("event", { length: 100 }).notNull(),
  propertyId: uuid("property_id"),
  data: jsonb("data"),
  source: varchar("source", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});
