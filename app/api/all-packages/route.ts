import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { sql } from "drizzle-orm";

export async function GET() {
   try {
      console.log('📍 Fetching all packages data...');
      
      // Query dengan LEFT JOIN yang bener
      const result = await db.execute(sql`
         SELECT 
            r.code,
            COUNT(p.id) as package_count,
            MIN(p.price) as cheapest_price
         FROM "Region" r
         LEFT JOIN "Package" p ON p."regionId" = r.id AND p."isActive" = true
         GROUP BY r.code
         ORDER BY r.code
      `);
      
      const rows = result.rows || [];
      console.log(`📦 Total regions in DB: ${rows.length}`);
      
      // Convert ke format yang diharapkan
      const prices: Record<string, { cheapest: number, count: number }> = {};
      
      rows.forEach((row: any) => {
         prices[row.code] = {
            cheapest: row.cheapest_price ? parseFloat(row.cheapest_price) : 0,
            count: row.package_count ? parseInt(row.package_count) : 0
         };
         console.log(`📍 ${row.code}: count=${row.package_count}, cheapest=${row.cheapest_price}`);
      });

      // Cek apakah HK ada di hasil
      if (!prices['HK']) {
         console.log('⚠️ HK tidak muncul di query, cek data...');
         
         // Cek apakah region HK ada
         const regionCheck = await db.execute(sql`
            SELECT * FROM "Region" WHERE code = 'HK'
         `);
         
         if (regionCheck.rows.length === 0) {
            console.log('❌ Region HK tidak ditemukan di database!');
         } else {
            console.log('✅ Region HK ada di database');
            
            // Cek packages HK
            const packageCheck = await db.execute(sql`
               SELECT COUNT(*) as count FROM "Package" p
               WHERE p."regionId" = (SELECT id FROM "Region" WHERE code = 'HK')
               AND p."isActive" = true
            `);
            
            console.log(`📦 Packages HK: ${packageCheck.rows[0]?.count}`);
         }
      }

      return NextResponse.json({
         success: true,
         data: prices
      });

   } catch (error: any) {
      console.error("❌ All packages error:", error);
      return NextResponse.json({ 
         success: false, 
         error: error.message 
      }, { status: 500 });
   }
}
