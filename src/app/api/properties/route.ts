import { db } from "@/db";
import { properties } from "@/db/schema";
import { mockStore, mockId } from "@/lib/mock-store";
import { eq, and, gte, lte, ilike, or, desc, asc, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type PropertyRow = typeof properties.$inferSelect;

function mockPropertiesResponse(req: NextRequest) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const listingType = url.searchParams.get("listingType");
  const location = url.searchParams.get("location");
  const region = url.searchParams.get("region");
  const budget = url.searchParams.get("budget");
  const bedrooms = url.searchParams.get("bedrooms");
  const status = url.searchParams.get("status");
  const featured = url.searchParams.get("featured");
  const sort = url.searchParams.get("sort") || "latest";
  const page = Math.max(1, Number.parseInt(url.searchParams.get("page") || "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(url.searchParams.get("limit") || "12", 10) || 12));
  const search = url.searchParams.get("search")?.trim().toLowerCase();
  const isPublished = url.searchParams.get("isPublished");

  let result = [...mockStore.properties];

  if (isPublished !== "false") result = result.filter((property) => property.isPublished);
  if (category) result = result.filter((property) => property.category === category);
  if (listingType) result = result.filter((property) => property.listingType === listingType);
  if (location) result = result.filter((property) => property.location === location);
  if (region) result = result.filter((property) => property.region === region);
  if (status) result = result.filter((property) => property.status === status);
  if (featured === "true") result = result.filter((property) => property.isFeatured);
  if (bedrooms) {
    const minimumBedrooms = Number.parseInt(bedrooms, 10);
    if (Number.isFinite(minimumBedrooms)) {
      result = result.filter((property) => (property.bedrooms ?? 0) >= minimumBedrooms);
    }
  }

  if (budget) {
    if (budget.endsWith("+")) {
      const minimum = Number(budget.replace("+", ""));
      result = result.filter((property) => Number(property.price ?? 0) >= minimum);
    } else {
      const [minimum, maximum] = budget.split("-").map(Number);
      if (Number.isFinite(minimum)) result = result.filter((property) => Number(property.price ?? 0) >= minimum);
      if (Number.isFinite(maximum)) result = result.filter((property) => Number(property.price ?? 0) <= maximum);
    }
  }

  if (search) {
    result = result.filter((property) =>
      [property.title, property.location, property.area, property.propertyId]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search)),
    );
  }

  result.sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return Number(a.price ?? 0) - Number(b.price ?? 0);
      case "price_desc":
        return Number(b.price ?? 0) - Number(a.price ?? 0);
      case "featured":
        return Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
      default:
        return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
    }
  });

  const total = result.length;
  const offset = (page - 1) * limit;
  return { properties: result.slice(offset, offset + limit), total, page, limit, demoMode: true };
}

export async function GET(req: NextRequest) {
  if (!db) {
    return NextResponse.json(mockPropertiesResponse(req));
  }

  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const listingType = url.searchParams.get("listingType");
    const location = url.searchParams.get("location");
    const region = url.searchParams.get("region");
    const budget = url.searchParams.get("budget");
    const bedrooms = url.searchParams.get("bedrooms");
    const status = url.searchParams.get("status");
    const featured = url.searchParams.get("featured");
    const sort = url.searchParams.get("sort") || "latest";
    const page = Math.max(1, Number.parseInt(url.searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(url.searchParams.get("limit") || "12", 10) || 12));
    const search = url.searchParams.get("search");
    const isPublished = url.searchParams.get("isPublished");

    const conditions = [];

    if (isPublished !== "false") conditions.push(eq(properties.isPublished, true));
    if (category) conditions.push(eq(properties.category, category as PropertyRow["category"]));
    if (listingType) conditions.push(eq(properties.listingType, listingType as PropertyRow["listingType"]));
    if (location) conditions.push(eq(properties.location, location));
    if (region) conditions.push(eq(properties.region, region));
    if (status) conditions.push(eq(properties.status, status as NonNullable<PropertyRow["status"]>));
    if (featured === "true") conditions.push(eq(properties.isFeatured, true));
    if (bedrooms) {
      const minimumBedrooms = Number.parseInt(bedrooms, 10);
      if (Number.isFinite(minimumBedrooms)) conditions.push(gte(properties.bedrooms, minimumBedrooms));
    }

    if (budget) {
      if (budget.endsWith("+")) {
        conditions.push(gte(properties.price, budget.replace("+", "")));
      } else {
        const [minimum, maximum] = budget.split("-");
        if (minimum) conditions.push(gte(properties.price, minimum));
        if (maximum) conditions.push(lte(properties.price, maximum));
      }
    }

    if (search) {
      conditions.push(
        or(
          ilike(properties.title, `%${search}%`),
          ilike(properties.location, `%${search}%`),
          ilike(properties.area, `%${search}%`),
          ilike(properties.propertyId, `%${search}%`),
        )!,
      );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(properties).where(where);
    const total = Number(countResult[0]?.count || 0);

    let orderBy;
    switch (sort) {
      case "price_asc": orderBy = asc(properties.price); break;
      case "price_desc": orderBy = desc(properties.price); break;
      case "featured": orderBy = desc(properties.isFeatured); break;
      default: orderBy = desc(properties.createdAt);
    }

    const offset = (page - 1) * limit;
    const result = await db.select().from(properties).where(where).orderBy(orderBy).limit(limit).offset(offset);

    return NextResponse.json({ properties: result, total, page, limit });
  } catch (error) {
    console.error("Properties API database error; falling back to preview data:", error);
    return NextResponse.json(mockPropertiesResponse(req));
  }
}

function createMockProperty(body: Record<string, unknown>) {
  const now = new Date();
  const property = {
    ...body,
    id: mockId("property"),
    status: body.status ?? "available",
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    videos: Array.isArray(body.videos) ? body.videos : [],
    floorPlanImages: Array.isArray(body.floorPlanImages) ? body.floorPlanImages : [],
    amenities: Array.isArray(body.amenities) ? body.amenities : [],
    isFeatured: Boolean(body.isFeatured),
    isPublished: body.isPublished !== false,
    createdAt: now,
    updatedAt: now,
  } as unknown as PropertyRow;
  mockStore.properties.unshift(property);
  return property;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Record<string, unknown>;

  if (!db) {
    return NextResponse.json({ property: createMockProperty(body), demoMode: true }, { status: 201 });
  }

  try {
    const result = await db.insert(properties).values(body as typeof properties.$inferInsert).returning();
    return NextResponse.json({ property: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Property create database error; saving to preview store instead:", error);
    return NextResponse.json(
      { property: createMockProperty(body), demoMode: true, databaseFallback: true },
      { status: 201 },
    );
  }
}
