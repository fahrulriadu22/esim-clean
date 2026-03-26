import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { region, subRegion, packageTable } from "@/database/schema";
import { asc, eq } from "drizzle-orm";
import { applyRateLimit } from "@/lib/rate-limiter";

// Define the allowed plan combinations with their margins (same as in package/route.ts)
const ALLOWED_PLANS = [
   { data: "1", duration: 7, durationUnit: "DAY", margin: 300 },
   { data: "3", duration: 15, durationUnit: "DAY", margin: 223 },
   { data: "5", duration: 30, durationUnit: "DAY", margin: 141 },
   { data: "10", duration: 30, durationUnit: "DAY", margin: 130 },
   { data: "20", duration: 30, durationUnit: "DAY", margin: 130 },
];

export async function GET(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(request, "/api/locations");
   if (rateLimitResponse) {
      return rateLimitResponse;
   }

   try {
      // Fetch regions from database
      const regionsData = await db
         .select()
         .from(region)
         .orderBy(asc(region.name));

      // Fetch sub-regions for each region
      const subRegionsData = await db.select().from(subRegion);

      // Fetch packages for each region with all necessary fields
      const packagesData = await db
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
         })
         .from(packageTable);

      // Group sub-regions by region
      const subRegionsByRegion = subRegionsData.reduce((acc, subRegion) => {
         if (!acc[subRegion.regionId]) {
            acc[subRegion.regionId] = [];
         }
         acc[subRegion.regionId].push(subRegion);
         return acc;
      }, {} as Record<string, typeof subRegionsData>);

      // Filter packages to only include those matching the allowed plan combinations
      // and exclude packages with "nonhkip" in the name
      const filteredPackages = packagesData.filter((pkg) => {
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

      // Apply margin calculation to filtered packages
      const packagesWithMargin = filteredPackages.map((pkg) => {
         // Find the matching allowed plan to get the margin
         const matchingPlan = ALLOWED_PLANS.find((allowedPlan) => {
            return (
               pkg.data === allowedPlan.data &&
               pkg.duration === allowedPlan.duration &&
               pkg.durationUnit === allowedPlan.durationUnit
            );
         });

         if (matchingPlan) {
            // Calculate final price with margin: price + (price * margin percentage)
            const finalPrice =
               pkg.price + pkg.price * (matchingPlan.margin / 100);

            return {
               ...pkg,
               price: Math.round(finalPrice * 100) / 100,
               margin: matchingPlan.margin,
               originalPrice: pkg.price,
            };
         }

         return pkg;
      });

      // Group packages by region
      const packagesByRegion = packagesWithMargin.reduce((acc, pkg) => {
         if (!acc[pkg.regionId]) {
            acc[pkg.regionId] = [];
         }
         acc[pkg.regionId].push(pkg);
         return acc;
      }, {} as Record<string, typeof packagesWithMargin>);

      // Combine all data
      const regions = regionsData.map((region) => ({
         ...region,
         subRegions: subRegionsByRegion[region.id] || [],
         packages: packagesByRegion[region.id] || [],
      }));

      // Define priority countries/regions in order
      const priorityOrder = [
         "US", // USA 🇺🇸
         "EU-30", // Europe 🇪🇺 (or similar Europe region code)
         "EU-42", // Europe (40+ areas) 🇪🇺
         "JP", // Japan 🇯🇵
         "KR", // South Korea 🇰🇷
         "TH", // Thailand 🇹🇭
         "ID", // Indonesia 🇮🇩
         "GB", // United Kingdom 🇬🇧
         "FR", // France 🇫🇷
         "IT", // Italy 🇮🇹
         "ES", // Spain 🇪🇸
      ];

      // Transform the data to match the expected API structure
      const locationList = regions.map((region) => {
         const hasSubLocations = region.subRegions.length > 0;

         // Sort packages by price (ascending) to get the cheapest first
         const sortedPackages = region.packages.sort(
            (a, b) => a.price - b.price
         );
         const cheapestPrice =
            sortedPackages.length > 0 ? sortedPackages[0].price : 0;

         return {
            code: region.code,
            name: region.name,
            type: hasSubLocations ? 2 : 1, // 1 = country (no sub-locations), 2 = region (has sub-locations)
            subLocationList: region.subRegions.map((subRegion) => ({
               code: subRegion.code,
               name: subRegion.name,
            })),
            packageCount: region.packages.length,
            startingPrice: cheapestPrice,
         };
      });

      // Sort locations with priority countries first
      const sortedLocationList = locationList.sort((a, b) => {
         const aIndex = priorityOrder.indexOf(a.code);
         const bIndex = priorityOrder.indexOf(b.code);

         // If both are in priority list, sort by priority order
         if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
         }

         // If only 'a' is in priority list, it comes first
         if (aIndex !== -1 && bIndex === -1) {
            return -1;
         }

         // If only 'b' is in priority list, it comes first
         if (aIndex === -1 && bIndex !== -1) {
            return 1;
         }

         // If neither is in priority list, sort alphabetically by name
         return a.name.localeCompare(b.name);
      });

      // Return the sorted location list in the expected format
      return NextResponse.json({
         success: true,
         data: sortedLocationList,
      });
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error:
               error instanceof Error
                  ? error.message
                  : "Failed to fetch locations",
         },
         { status: 500 }
      );
   }
}
