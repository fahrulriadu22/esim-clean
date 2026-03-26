import { NextRequest, NextResponse } from "next/server";
import { getPackage } from "@/utils/esim-api";
import {
   extractUserData,
   UserData,
} from "@/lib/utils";
import { verifyTelegramWebAppData } from "@/lib/crypto-utils";
import { applyRateLimit } from "@/lib/rate-limiter";

// Get USD exchange rate (same as cron route)
async function getUSDRate() {
   const response = await fetch(
      "https://v6.exchangerate-api.com/v6/ceb0b73fdbdbb7854a766621/pair/USD/IDR"
   );
   const data = await response.json();
   return data.conversion_rate;
}

// Define the allowed plan combinations with their margins
const ALLOWED_PLANS = [
   { data: "1", duration: 7, durationUnit: "DAY", margin: 300 },
   { data: "3", duration: 15, durationUnit: "DAY", margin: 223 },
   { data: "5", duration: 30, durationUnit: "DAY", margin: 141 },
   { data: "10", duration: 30, durationUnit: "DAY", margin: 130 },
   { data: "20", duration: 30, durationUnit: "DAY", margin: 130 },
];

// Map region names to their package slugs
// Note: Region names should match exactly as they appear in the UI
const REGION_SLUGS: Record<string, string[]> = {
   Europe: [
      "EU-30_10_30",
      "EU-30_1_7",
      "EU-30_3_15",
      "EU-30_5_30",
      "EU-30_20_30",
   ],
   Asia: [
      "AS-21_10_30",
      "AS-21_1_7",
      "AS-21_3_15",
      "AS-21_5_30",
      "AS-21_20_30",
   ],
   "North America": [
      "NA-3_10_30",
      "NA-3_1_7",
      "NA-3_3_15",
      "NA-3_5_30",
      "NA-3_20_30",
   ],
   "Middle East & North Africa": [
      "ME-12_10_30",
      "ME-12_1_7",
      "ME-12_3_30",
      "ME-12_5_30",
      "ME-12_20_30",
   ],
   "Middle east & North Africa": [
      "ME-12_10_30",
      "ME-12_1_7",
      "ME-12_3_30",
      "ME-12_5_30",
      "ME-12_20_30",
   ],
   "South America": ["SA-18_10_30", "SA-18_1_7", "SA-18_3_15", "SA-18_5_30"],
   Africa: ["SA-18_10_30", "AF-29_1_7", "AF-29_3_30", "AF-29_5_30"],
   "Central Asia": ["AS-5_10_30", "AS-5_1_7", "AS-5_5_30"],
   Global: ["GL-139_10_30", "GL-139_1_7", "GL-139_5_30"],
};

// Helper function to normalize region names (case-insensitive lookup)
function getRegionSlugs(regionName: string): string[] | null {
   // Try exact match first
   if (REGION_SLUGS[regionName]) {
      return REGION_SLUGS[regionName];
   }

   // Try case-insensitive match
   const normalizedName = Object.keys(REGION_SLUGS).find(
      (key) => key.toLowerCase() === regionName.toLowerCase()
   );

   if (normalizedName) {
      return REGION_SLUGS[normalizedName];
   }

   return null;
}

export async function GET(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(
      request,
      "/api/region-packages"
   );
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

      // Get regionName from query parameters
      const { searchParams } = new URL(request.url);
      const regionName = searchParams.get("regionName");

      if (!regionName) {
         return NextResponse.json(
            { message: "Region name is required" },
            { status: 400 }
         );
      }

      const slugs = getRegionSlugs(regionName);
      if (!slugs || slugs.length === 0) {
         return NextResponse.json(
            { message: "Region not found or no packages available" },
            { status: 404 }
         );
      }

      // Get USD rate for price conversion (same as database logic)
      const usdRate = await getUSDRate();

      // Fetch packages for all slugs in parallel
      const packagePromises = slugs.map((slug) => getPackage(slug));
      const responses = await Promise.allSettled(packagePromises);

      const allPackages: any[] = [];
      let supportedCountries: string[] = [];

      responses.forEach((result, index) => {
         if (result.status === "fulfilled" && result.value.success) {
            const response = result.value;
            const packageList = response.obj?.packageList || [];

            // Extract countries from locationNetworkList at response level
            if (
               response.obj?.locationNetworkList &&
               Array.isArray(response.obj.locationNetworkList)
            ) {
               response.obj.locationNetworkList.forEach((location: any) => {
                  const countryName =
                     location.locationName || location.name || "";
                  if (
                     countryName &&
                     !supportedCountries.includes(countryName)
                  ) {
                     supportedCountries.push(countryName);
                  }
               });
            }

            packageList.forEach((pkg: any) => {
               // Extract data and duration from package name or use provided values
               const nameMatch = pkg.name?.match(/(\d+(?:\.\d+)?)\s*(GB|MB)/i);
               const data = nameMatch ? nameMatch[1] : pkg.data || "0";
               const duration = pkg.duration || 30;
               const durationUnit = pkg.durationUnit || "DAY";

               // Check if this package matches any allowed plan combination
               const matchingPlan = ALLOWED_PLANS.find((allowedPlan) => {
                  return (
                     data === allowedPlan.data &&
                     duration === allowedPlan.duration &&
                     durationUnit === allowedPlan.durationUnit
                  );
               });

               if (matchingPlan) {
                  // Price calculation logic (same as database/cron route)
                  // retailPrice is in cents, convert to USD using exchange rate
                  const priceInCents = pkg.retailPrice || pkg.price || 0;
                  const price = priceInCents / usdRate;
                  
                  // Round up to nearest 0.1 (same as database storage logic)
                  const basePrice = Math.ceil(price * 10) / 10;

                  // Calculate final price with margin (same as database route)
                  const finalPrice =
                     basePrice + basePrice * (matchingPlan.margin / 100);

                  // Calculate price per data unit
                  const dataAmount = parseFloat(data);
                  const pricePerData =
                     dataAmount > 0 ? finalPrice / dataAmount : 0;

                  allPackages.push({
                     id: pkg.packageCode || `pkg-${index}-${data}-${duration}`,
                     code: pkg.packageCode,
                     name: pkg.name,
                     duration: duration,
                     durationUnit: durationUnit,
                     price: Math.round(finalPrice * 100) / 100,
                     data: data,
                     dataUnit: nameMatch ? nameMatch[2].toUpperCase() : "GB",
                     pricePerData: Math.round(pricePerData * 100) / 100,
                     margin: matchingPlan.margin,
                     originalPrice: basePrice,
                  });
               }

               // Collect supported countries from locationNetworkList (priority)
               if (
                  pkg.locationNetworkList &&
                  Array.isArray(pkg.locationNetworkList)
               ) {
                  pkg.locationNetworkList.forEach((location: any) => {
                     const countryName =
                        location.locationName || location.name || "";
                     if (
                        countryName &&
                        !supportedCountries.includes(countryName)
                     ) {
                        supportedCountries.push(countryName);
                     }
                  });
               } else if (pkg.countryList && Array.isArray(pkg.countryList)) {
                  pkg.countryList.forEach((country: any) => {
                     const countryName =
                        typeof country === "string"
                           ? country
                           : country.countryName ||
                             country.name ||
                             country.country ||
                             "";
                     if (
                        countryName &&
                        !supportedCountries.includes(countryName)
                     ) {
                        supportedCountries.push(countryName);
                     }
                  });
               } else if (pkg.countries && Array.isArray(pkg.countries)) {
                  pkg.countries.forEach((country: any) => {
                     const countryName =
                        typeof country === "string"
                           ? country
                           : country.countryName ||
                             country.name ||
                             country.country ||
                             "";
                     if (
                        countryName &&
                        !supportedCountries.includes(countryName)
                     ) {
                        supportedCountries.push(countryName);
                     }
                  });
               }
            });
         }
      });

      // Deduplicate packages by data and duration, selecting the cheapest price first
      const deduplicatedPackages = allPackages.reduce((acc, current) => {
         const key = `${current.data}-${current.duration}-${current.durationUnit}`;
         const existing = acc.get(key);

         if (!existing || current.price < existing.price) {
            acc.set(key, current);
         }

         return acc;
      }, new Map());

      // Convert map back to array and sort by price
      const packages = Array.from(deduplicatedPackages.values()).sort(
         (a: any, b: any) => a.price - b.price
      );

      // Sort supported countries alphabetically
      supportedCountries.sort();

      return NextResponse.json({
         success: true,
         data: {
            packages,
            supportedCountries,
         },
      });
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error:
               error instanceof Error
                  ? error.message
                  : "Failed to fetch region packages",
         },
         { status: 500 }
      );
   }
}
