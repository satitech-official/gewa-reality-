import { db } from "@/db";
import { siteVisits } from "@/db/schema";
import { mockId, mockStore } from "@/lib/mock-store";
import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) {
    return NextResponse.json({ siteVisits: [...mockStore.siteVisits].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()), demoMode: true });
  }

  try {
    const result = await db.select().from(siteVisits).orderBy(desc(siteVisits.createdAt));
    return NextResponse.json({ siteVisits: result });
  } catch (error) {
    console.error("Site visits fetch error:", error);
    return NextResponse.json({ siteVisits: mockStore.siteVisits, demoMode: true });
  }
}

function saveMockSiteVisit(values: Record<string, unknown>) {
  const now = new Date();
  const siteVisit = {
    ...values,
    id: mockId("visit"),
    name: String(values.name),
    phone: String(values.phone),
    status: "requested",
    createdAt: now,
    updatedAt: now,
  };
  mockStore.siteVisits.unshift(siteVisit);
  return siteVisit;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const values = {
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      whatsapp: body.whatsapp || null,
      email: body.email || null,
      propertyId: body.propertyId || null,
      preferredDate: body.preferredDate || null,
      preferredTime: body.preferredTime || null,
      numVisitors: body.numVisitors ? Number(body.numVisitors) : null,
      message: body.message || null,
    };

    if (!db) {
      return NextResponse.json({ siteVisit: saveMockSiteVisit(values), demoMode: true }, { status: 201 });
    }

    try {
      const result = await db.insert(siteVisits).values(values).returning();
      return NextResponse.json({ siteVisit: result[0] }, { status: 201 });
    } catch (databaseError) {
      console.error("Site visit database error; saving to preview store instead:", databaseError);
      return NextResponse.json({ siteVisit: saveMockSiteVisit(values), demoMode: true, databaseFallback: true }, { status: 201 });
    }
  } catch (error) {
    console.error("Site visit create error:", error);
    return NextResponse.json({ error: "Failed to create site visit" }, { status: 500 });
  }
}
