import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) {
    return Response.json({ ok: true, database: "preview-data", mode: "demo" });
  }

  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected", mode: "database" });
  } catch (error) {
    console.error("Database health check failed:", error);
    return Response.json({ ok: false, database: "unavailable", mode: "database" }, { status: 503 });
  }
}
