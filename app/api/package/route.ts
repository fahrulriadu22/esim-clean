import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { packageTable, region } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import {
   extractUserData,
   UserData,
} from "@/lib/utils";
import { verifyTelegramWebAppData } from "@/lib/crypto-utils";
import { applyRateLimit } from "@/lib/rate-limiter";

// Define the allowed plan combinations (margins dihapus karena tidak dipakai)
const ALLOWED_PLANS = [
   { data: "1", duration: 7, durationUnit: "DAY" },
   { data: "3", duration: 15, durationUnit: "DAY" },
   { data: "5", duration: 30, durationUnit: "DAY" },
   { data: "10", duration: 30, durationUnit: "DAY" },
   { data: "20", duration: 30, durationUnit: "DAY" },
];

export async function GET(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(request, "/api/package");
   if (rateLimitResponse) {
      return rateLimitResponse;
   }

   try {
      const telegramData = request.headers.get("X-Telegram-Data");
      if (!telegramData) {
         return NextResponse.json(
            { message: "Telegram data not found" },
            { status: 400 }
         );
      }

      if (!(telegramData)) {
         return NextResponse.json(
            { message: "Telegram data is invalid" },
            { status: 400 }
         );
      }

      const extractedUserData: UserData = extractUserData(telegramData);
      if (!extractedUserData) {
         return NextResponse.json(
            { message: "User data is invalid" },
            { status: 400 }
         );
      }

      // Get locationCode from query parameters, default to "ID"
      const { searchParams } = new URL(request.url);
      const locationCode = searchParams.get("locationCode") || "ID";

      // Fetch ACTIVE packages from database with region information
      const allPackages = await db
         .select({
            id: packageTable.id,
            name: packageTable.name,
            code: packageTable.code,
            duration: packageTable.duration,
            durationUnit: packageTable.durationUnit,
            price: packageTable.price,
            data: packageTable.data,
            dataUnit: packageTable.dataUnit,
            pricePerData: packageTable.pricePerData,
            regionId: packageTable.regionId,
            createdAt: packageTable.createdAt,
            updatedAt: packageTable.updatedAt,
            isActive: packageTable.isActive,
            isBestSeller: packageTable.isBestSeller,
            fakePrice: packageTable.fakePrice,
            polarLink: packageTable.polarLink, // TAMBAHKAN INI
            region: {
               id: region.id,
               name: region.name,
               code: region.code,
               createdAt: region.createdAt,
               updatedAt: region.updatedAt,
            },
         })
         .from(packageTable)
         .leftJoin(region, eq(packageTable.regionId, region.id))
         .where(
            and(
               eq(region.code, locationCode),
               eq(packageTable.isActive, true) // HANYA YANG ACTIVE
            )
         );

      console.log(`📦 Found ${allPackages.length} active packages for ${locationCode}`);

      // Filter packages to only include those matching the allowed plan combinations
      // and exclude packages with "nonhkip" in the name
      const filteredPackages = allPackages.filter((pkg) => {
         // Exclude packages with "nonhkip" in the name
         if (pkg.name.toLowerCase().includes("nonhkip")) {
            return false;
         }

         // Only include packages matching the allowed plan combinations
         return ALLOWED_PLANS.some((allowedPlan) => {
            return (
               pkg.data === allowedPlan.data &&
               pkg.duration === allowedPlan.duration &&
               pkg.durationUnit === allowedPlan.durationUnit
            );
         });
      });

      // ============================================
      // MARGIN TELAH DIHAPUS! HARGA MURNI DARI ADMIN
      // ============================================
      const packagesWithoutMargin = filteredPackages.map((pkg) => {
         return {
            ...pkg,
            originalPrice: pkg.price, // Tetap simpan original price untuk referensi
            // price: pkg.price (tetap sama, tidak berubah)
         };
      });

      // Deduplicate packages by data and duration, selecting the cheapest price first
      const deduplicatedPackages = packagesWithoutMargin.reduce((acc, current) => {
         const key = `${current.data}-${current.duration}-${current.durationUnit}`;
         const existing = acc.get(key);

         if (!existing || current.price < existing.price) {
            acc.set(key, current);
         }

         return acc;
      }, new Map());

      // Convert map back to array and sort by price
      const packages = Array.from(deduplicatedPackages.values()).sort(
         (a, b) => a.price - b.price
      );

      console.log(`📦 Returning ${packages.length} packages after filtering/deduplication`);
      console.log(`💰 Harga termurah: $${packages[0]?.price}`);

      // Return the packages list
      return NextResponse.json({
         success: true,
         data: packages,
      });
   } catch (error: any) {
      console.error('❌ Error in /api/package:', error);
      return NextResponse.json(
         {
            success: false,
            error:
               error instanceof Error
                  ? error.message
                  : "Failed to fetch packages",
         },
         { status: 500 }
      );
   }
}
