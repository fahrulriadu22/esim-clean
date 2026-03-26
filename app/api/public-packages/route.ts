import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
   try {
      const { searchParams } = new URL(request.url);
      const locationCode = searchParams.get("locationCode") || "ID";

      console.log(`📍 Public packages fetching for ${locationCode}`);

      // PAKE SQL LANGSUNG (LEBIH AMAN)
      const result = await db.execute(
         sql`
            SELECT 
               p.id, 
               p.code, 
               p.name, 
               p.price, 
               p."fakePrice", 
               p."isBestSeller",
               p.data, 
               p."dataUnit", 
               p.duration, 
               p."durationUnit",
               r.code as "regionCode",
               r.name as "regionName"
            FROM "Package" p
            LEFT JOIN "Region" r ON p."regionId" = r.id
            WHERE r.code = ${locationCode} AND p."isActive" = true
            ORDER BY p.price ASC
         `
      );

      // Pastikan result.rows itu array
      const packages = Array.isArray(result) ? result : (result.rows || []);
      
      console.log(`📦 Found ${packages.length} packages for ${locationCode}`);

      return NextResponse.json({
         success: true,
         data: packages,
         count: packages.length
      });

   } catch (error: any) {
      console.error("❌ Public packages error:", error);
      return NextResponse.json({ 
         success: false, 
         error: error.message,
         stack: error.stack 
      }, { status: 500 });
   }
}
