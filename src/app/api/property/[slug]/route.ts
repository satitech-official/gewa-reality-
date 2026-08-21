import { db } from "@/db";
import { properties } from "@/db/schema";
import { mockStore } from "@/lib/mock-store";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type PropertyRow = typeof properties.$inferSelect;

function findMockProperty(slug: string) {
  return mockStore.properties.find((property) => property.slug === slug);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!db) {
    const property = findMockProperty(slug);
    return property
      ? NextResponse.json({ property, demoMode: true })
      : NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  try {
    const result = await db.select().from(properties).where(eq(properties.slug, slug)).limit(1);
    if (result.length === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ property: result[0] });
  } catch (error) {
    console.error("Property detail database error; falling back to preview data:", error);
    const property = findMockProperty(slug);
    return property
      ? NextResponse.json({ property, demoMode: true })
      : NextResponse.json({ error: "Property not found" }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = await req.json();

  if (!db) {
    const index = mockStore.properties.findIndex((property) => property.slug === slug);
    if (index === -1) return NextResponse.json({ error: "Property not found" }, { status: 404 });

    const property = {
      ...mockStore.properties[index],
      ...body,
      id: mockStore.properties[index].id,
      createdAt: mockStore.properties[index].createdAt,
      updatedAt: new Date(),
    } as PropertyRow;
    mockStore.properties[index] = property;
    return NextResponse.json({ property, demoMode: true });
  }

  try {
    const result = await db
      .update(properties)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(properties.slug, slug))
      .returning();

    if (result.length === 0) return NextResponse.json({ error: "Property not found" }, { status: 404 });
    return NextResponse.json({ property: result[0] });
  } catch (error) {
    console.error("Property update error:", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!db) {
    const index = mockStore.properties.findIndex((property) => property.slug === slug);
    if (index === -1) return NextResponse.json({ error: "Property not found" }, { status: 404 });
    mockStore.properties.splice(index, 1);
    return NextResponse.json({ success: true, demoMode: true });
  }

  try {
    await db.delete(properties).where(eq(properties.slug, slug));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Property delete error:", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}
