import { db } from "@/db";
import { blogPosts, faqs, locations, properties } from "@/db/schema";
import { mockBlogPosts, mockFaqs, mockLocations, mockProperties } from "@/lib/mock-data";
import { desc, eq } from "drizzle-orm";

function warnFallback(scope: string, error: unknown) {
  console.warn(`[Gewa Realty] ${scope}: using bundled preview data.`, error);
}

export async function getHomeData() {
  if (db) {
    try {
      const [allProperties, allLocations, recentPosts] = await Promise.all([
        db
          .select()
          .from(properties)
          .where(eq(properties.isPublished, true))
          .orderBy(desc(properties.isFeatured), desc(properties.createdAt))
          .limit(8),
        db.select().from(locations).where(eq(locations.isPublished, true)).limit(12),
        db
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.isPublished, true))
          .orderBy(desc(blogPosts.publishedAt))
          .limit(3),
      ]);

      return { allProperties, allLocations, recentPosts };
    } catch (error) {
      warnFallback("home data", error);
    }
  }

  const allProperties = mockProperties
    .filter((property) => property.isPublished)
    .sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)))
    .slice(0, 8);
  const allLocations = mockLocations.filter((location) => location.isPublished).slice(0, 12);
  const recentPosts = mockBlogPosts.filter((post) => post.isPublished).slice(0, 3);

  return { allProperties, allLocations, recentPosts };
}

export async function getLocations() {
  if (db) {
    try {
      return await db.select().from(locations).where(eq(locations.isPublished, true));
    } catch (error) {
      warnFallback("locations", error);
    }
  }
  return mockLocations.filter((location) => location.isPublished);
}

export async function getLocationBySlug(slug: string) {
  if (db) {
    try {
      const result = await db.select().from(locations).where(eq(locations.slug, slug)).limit(1);
      if (result[0]) return result[0];
    } catch (error) {
      warnFallback("location detail", error);
    }
  }
  return mockLocations.find((location) => location.slug === slug) ?? null;
}

export async function getPropertiesByLocation(locationName: string, limit = 6) {
  if (db) {
    try {
      return await db
        .select()
        .from(properties)
        .where(eq(properties.location, locationName))
        .limit(limit);
    } catch (error) {
      warnFallback("properties by location", error);
    }
  }
  return mockProperties.filter((property) => property.location === locationName && property.isPublished).slice(0, limit);
}

export async function getInsightsData() {
  if (db) {
    try {
      const [posts, allFaqs] = await Promise.all([
        db
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.isPublished, true))
          .orderBy(desc(blogPosts.publishedAt)),
        db.select().from(faqs).where(eq(faqs.isPublished, true)),
      ]);
      return { posts, allFaqs };
    } catch (error) {
      warnFallback("insights", error);
    }
  }

  return {
    posts: mockBlogPosts.filter((post) => post.isPublished),
    allFaqs: mockFaqs.filter((faq) => faq.isPublished),
  };
}

export async function getBlogPostBySlug(slug: string) {
  if (db) {
    try {
      const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
      if (result[0]) return result[0];
    } catch (error) {
      warnFallback("insight detail", error);
    }
  }
  return mockBlogPosts.find((post) => post.slug === slug && post.isPublished) ?? null;
}

export async function getPropertyBySlug(slug: string) {
  if (db) {
    try {
      const result = await db.select().from(properties).where(eq(properties.slug, slug)).limit(1);
      if (result[0]) return result[0];
    } catch (error) {
      warnFallback("property detail", error);
    }
  }
  return mockProperties.find((property) => property.slug === slug && property.isPublished) ?? null;
}
