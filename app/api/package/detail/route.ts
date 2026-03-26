import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { packageTable } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    
    if (!code) {
      return NextResponse.json(
        { success: false, error: "Package code required" },
        { status: 400 }
      );
    }

    const pkg = await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.code, code))
      .limit(1);

    if (pkg.length === 0) {
      return NextResponse.json(
        { success: false, error: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: pkg[0]
    });
  } catch (error) {
    console.error("Error fetching package detail:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
