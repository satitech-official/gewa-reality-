import { db } from "@/db";
import { sellerSubmissions } from "@/db/schema";
import { mockId, mockStore } from "@/lib/mock-store";
import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) {
    return NextResponse.json({ submissions: [...mockStore.sellerSubmissions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()), demoMode: true });
  }

  try {
    const result = await db.select().from(sellerSubmissions).orderBy(desc(sellerSubmissions.createdAt));
    return NextResponse.json({ submissions: result });
  } catch (error) {
    console.error("Sellers fetch error:", error);
    return NextResponse.json({ submissions: mockStore.sellerSubmissions, demoMode: true });
  }
}

function saveMockSubmission(values: Record<string, unknown>) {
  const submission = {
    ...values,
    id: mockId("seller"),
    ownerName: String(values.ownerName),
    phone: String(values.phone),
    status: "pending_review",
    isApproved: false,
    createdAt: new Date(),
  };
  mockStore.sellerSubmissions.unshift(submission);
  return submission;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.ownerName?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: "Owner name and phone are required" }, { status: 400 });
    }

    const values = {
      ownerName: String(body.ownerName).trim(),
      phone: String(body.phone).trim(),
      email: body.email || null,
      propertyType: body.propertyType || null,
      location: body.location || null,
      expectedPrice: body.expectedPrice || null,
      propertyArea: body.propertyArea || null,
      bedrooms: body.bedrooms ? Number(body.bedrooms) : null,
      description: body.description || null,
      photos: Array.isArray(body.photos) ? body.photos : null,
    };

    if (!db) {
      return NextResponse.json({ submission: saveMockSubmission(values), demoMode: true }, { status: 201 });
    }

    try {
      const result = await db.insert(sellerSubmissions).values(values).returning();
      return NextResponse.json({ submission: result[0] }, { status: 201 });
    } catch (databaseError) {
      console.error("Seller database error; saving to preview store instead:", databaseError);
      return NextResponse.json({ submission: saveMockSubmission(values), demoMode: true, databaseFallback: true }, { status: 201 });
    }
  } catch (error) {
    console.error("Seller submission error:", error);
    return NextResponse.json({ error: "Failed to submit property" }, { status: 500 });
  }
}
