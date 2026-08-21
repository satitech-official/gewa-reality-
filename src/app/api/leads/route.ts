import { db } from "@/db";
import { leads } from "@/db/schema";
import { mockId, mockStore } from "@/lib/mock-store";
import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) {
    return NextResponse.json({ leads: [...mockStore.leads].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()), demoMode: true });
  }

  try {
    const result = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return NextResponse.json({ leads: result });
  } catch (error) {
    console.error("Leads fetch error:", error);
    return NextResponse.json({ leads: mockStore.leads, demoMode: true });
  }
}

function saveMockLead(values: Record<string, unknown>) {
  const now = new Date();
  const lead = { ...values, id: mockId("lead"), name: String(values.name), stage: "new", createdAt: now, updatedAt: now };
  mockStore.leads.unshift(lead);
  return lead;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const values = {
      name: String(body.name).trim(),
      phone: body.phone || null,
      email: body.email || null,
      whatsapp: body.whatsapp || null,
      source: body.source || "website",
      propertyId: body.propertyId || null,
      enquiryType: body.enquiryType || null,
      message: body.message || null,
      budget: body.budget || null,
      requirements: body.requirements || null,
      preferredArea: body.preferredArea || null,
      propertyType: body.propertyType || null,
      bedrooms: body.bedrooms ? Number(body.bedrooms) : null,
      purpose: body.purpose || null,
      timeline: body.timeline || null,
      utmSource: body.utmSource || null,
      utmCampaign: body.utmCampaign || null,
      page: body.page || null,
    };

    if (!db) {
      return NextResponse.json({ lead: saveMockLead(values), demoMode: true }, { status: 201 });
    }

    try {
      const result = await db.insert(leads).values(values).returning();
      return NextResponse.json({ lead: result[0] }, { status: 201 });
    } catch (databaseError) {
      console.error("Lead database error; saving to preview store instead:", databaseError);
      return NextResponse.json({ lead: saveMockLead(values), demoMode: true, databaseFallback: true }, { status: 201 });
    }
  } catch (error) {
    console.error("Lead create error:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
