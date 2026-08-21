import { db } from "@/db";
import { analyticsEvents } from "@/db/schema";
import { mockId, mockStore } from "@/lib/mock-store";
import { NextRequest, NextResponse } from "next/server";

function saveMockEvent(body: Record<string, unknown>) {
  mockStore.analyticsEvents.push({
    id: mockId("event"),
    event: body.event,
    propertyId: body.propertyId || null,
    data: body.data || null,
    source: body.source || null,
    createdAt: new Date(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (!body.event) return NextResponse.json({ error: "Event is required" }, { status: 400 });

    if (!db) {
      saveMockEvent(body);
      return NextResponse.json({ success: true, demoMode: true });
    }

    try {
      await db.insert(analyticsEvents).values({
        event: String(body.event),
        propertyId: body.propertyId ? String(body.propertyId) : null,
        data: body.data || null,
        source: body.source ? String(body.source) : null,
      });
      return NextResponse.json({ success: true });
    } catch (databaseError) {
      console.error("Analytics database error; saving to preview store instead:", databaseError);
      saveMockEvent(body);
      return NextResponse.json({ success: true, demoMode: true, databaseFallback: true });
    }
  } catch (error) {
    console.error("Analytics event error:", error);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
