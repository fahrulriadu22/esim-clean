import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { esim, order, packageTable, region } from "@/database/schema";
import { eq, desc, inArray } from "drizzle-orm";
import {
   extractUserData,
   UserData,
} from "@/lib/utils";
import { verifyTelegramWebAppData } from "@/lib/crypto-utils";
import { applyRateLimit } from "@/lib/rate-limiter";

// Helper function to map eSIM status to display status
function mapESIMStatus(
   esimStatus: string,
   isExpired: boolean,
   daysLeft: number
): "new" | "active" | "low-data" | "expired" {
   // Handle expired status first
   if (isExpired) {
      return "expired";
   }

   // Map webhook status values to display status
   switch (esimStatus) {
      case "GOT_RESOURCE":
         // New eSIM that hasn't been used yet
         return "new";
      case "IN_USE":
         // eSIM has been installed/activated on a device
         // Check if low on data or days
         if (daysLeft <= 3) {
            return "low-data";
         }
         return "active";
      case "USED_UP":
         // eSIM data allowance has been fully consumed
         return "expired";
      case "USED_EXPIRED":
         // eSIM data is used up, and expired
         return "expired";
      case "UNUSED_EXPIRED":
         // eSIM expired with data remaining
         return "expired";
      case "CANCEL":
         // eSIM has been canceled / refunded
         return "expired";
      case "REVOKED":
         // eSIM profile has been revoked
         return "expired";
      default:
         // Fallback for unknown statuses
         if (daysLeft <= 3) {
            return "low-data";
         }
         return "active";
   }
}

export async function GET(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(request, "/api/esims");
   if (rateLimitResponse) {
      return rateLimitResponse;
   }

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

   // Get pagination parameters from URL
   const { searchParams } = new URL(request.url);
   const page = parseInt(searchParams.get("page") || "1");
   const limit = parseInt(searchParams.get("limit") || "5");
   const offset = (page - 1) * limit;

   try {
      // Get total count for pagination info
      const totalCountResult = await db
         .select({ count: esim.id })
         .from(esim)
         .where(eq(esim.telegramId, extractedUserData.id.toString()));
      const totalCount = totalCountResult.length;

      // Fetch ESIMs with pagination
      const esims = await db
         .select()
         .from(esim)
         .where(eq(esim.telegramId, extractedUserData.id.toString()))
         .orderBy(desc(esim.createdAt))
         .limit(limit)
         .offset(offset);

      // Get unique package codes from all esims
      const packageCodes = [...new Set(esims.map((esim) => esim.packageCode))];

      // Fetch package and region information for all packages
      const packages =
         packageCodes.length > 0
            ? await db
                 .select({
                    id: packageTable.id,
                    name: packageTable.name,
                    code: packageTable.code,
                    data: packageTable.data,
                    duration: packageTable.duration,
                    durationUnit: packageTable.durationUnit,
                    regionId: packageTable.regionId,
                    region: {
                       id: region.id,
                       name: region.name,
                       code: region.code,
                    },
                 })
                 .from(packageTable)
                 .leftJoin(region, eq(packageTable.regionId, region.id))
                 .where(inArray(packageTable.code, packageCodes))
            : [];

      // Fetch orders for all esims
      const orderNos = esims.map((esim) => esim.orderNo);
      const orders =
         orderNos.length > 0
            ? await db
                 .select()
                 .from(order)
                 .where(inArray(order.orderNo, orderNos))
            : [];

      // Create maps for quick lookup
      const packageMap = new Map(packages.map((pkg) => [pkg.code, pkg]));
      const orderMap = new Map(orders.map((order) => [order.orderNo, order]));

      // Transform the data to match the frontend expectations
      const transformedESIMs = esims.map((esim) => {
         const packageInfo = packageMap.get(esim.packageCode);
         const orderInfo = orderMap.get(esim.orderNo);
         const regionCode = packageInfo?.region?.code || "UN";
         const now = new Date();
         const expiredAt = new Date(esim.expiredAt);
         const isExpired = expiredAt < now;
         const daysLeft = Math.max(
            0,
            Math.ceil(
               (expiredAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            )
         );

         // Map the actual eSIM status to display status
         const status = mapESIMStatus(esim.status, isExpired, daysLeft);

         return {
            id: esim.id,
            country: packageInfo?.region?.name || esim.packageName || "Unknown",
            flag: `https://flagsapi.com/${regionCode}/flat/64.png`,
            plan: formatPlan(
               packageInfo?.name || esim.packageName || "",
               packageInfo?.duration || esim.totalDuration || 0,
               packageInfo?.durationUnit || esim.durationUnit || ""
            ),
            dataUsed: calculateDataUsed(
               packageInfo?.data || "0",
               esim.remainingData
            ),
            dataTotal: parseFloat(packageInfo?.data || "0"),
            daysLeft,
            status,
            color: getCountryColor(
               packageInfo?.region?.name || esim.packageName || ""
            ),
            purchaseDate: orderInfo?.createdAt
               ? orderInfo.createdAt.toISOString().split("T")[0]
               : esim.createdAt.toISOString().split("T")[0],
            activationDate: esim.createdAt.toISOString().split("T")[0],
            // ESIM specific data
            iccid: esim.iccid,
            imsi: esim.imsi,
            ac: esim.ac,
            shortUrl: esim.shortUrl,
            originalStatus: esim.status, // Include original status for connection checking
            remainingData: Number(esim.remainingData) / (1024 * 1024 * 1024), // Convert BigInt bytes to GB
            remainingDataFormatted: formatDataSize(esim.remainingData), // Formatted display
            expiredAt: esim.expiredAt,
            orderNo: esim.orderNo,
         };
      });

      return NextResponse.json({
         success: true,
         data: transformedESIMs,
         pagination: {
            page,
            limit,
            total: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            hasNextPage: page < Math.ceil(totalCount / limit),
            hasPrevPage: page > 1,
         },
      });
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch ESIMs",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}

// Helper function to format plan display
function formatPlan(
   packageName: string,
   duration: number,
   durationUnit: string
): string {
   // Extract data amount from package name if possible
   const dataMatch = packageName.match(/(\d+)\s*(GB|MB)/i);
   const dataAmount = dataMatch ? dataMatch[1] : "Unknown";
   const dataUnit = dataMatch ? dataMatch[2] : "GB";

   return `${dataAmount} ${dataUnit} / ${duration} ${durationUnit}`;
}

// Helper function to format data in appropriate units
function formatDataSize(bytes: bigint | number): {
   value: number;
   unit: string;
} {
   // Convert BigInt to number for calculations
   const bytesNum = typeof bytes === "bigint" ? Number(bytes) : bytes;

   const gb = bytesNum / (1024 * 1024 * 1024);
   const mb = bytesNum / (1024 * 1024);
   const kb = bytesNum / 1024;

   if (gb >= 1) {
      return { value: gb, unit: "GB" };
   } else if (mb >= 1) {
      return { value: mb, unit: "MB" };
   } else if (kb >= 1) {
      return { value: kb, unit: "KB" };
   } else {
      return { value: bytesNum, unit: "B" };
   }
}

// Helper function to calculate data used
function calculateDataUsed(
   totalDataStr: string,
   remainingData: bigint | number
): number {
   const totalData = parseFloat(totalDataStr);
   // Convert remainingData from bytes to GB (1 GB = 1024^3 bytes)
   const remainingDataNum =
      typeof remainingData === "bigint" ? Number(remainingData) : remainingData;
   const remainingDataGB = remainingDataNum / (1024 * 1024 * 1024);
   return Math.max(0, totalData - remainingDataGB);
}

// Helper function to get country color
function getCountryColor(countryName: string): string {
   const colorMap: { [key: string]: string } = {
      Turkey: "bg-red-500",
      Europe: "bg-blue-500",
      UAE: "bg-green-500",
      Georgia: "bg-red-600",
      "Russian Federation": "bg-blue-600",
      USA: "bg-blue-700",
      Japan: "bg-red-400",
      "South Korea": "bg-blue-400",
      China: "bg-red-700",
      India: "bg-orange-500",
      Thailand: "bg-red-500",
      Singapore: "bg-red-600",
      Malaysia: "bg-blue-500",
      Indonesia: "bg-red-500",
      Philippines: "bg-blue-600",
      Vietnam: "bg-red-500",
      Australia: "bg-green-600",
      "New Zealand": "bg-blue-500",
      Canada: "bg-red-500",
      Mexico: "bg-green-500",
      Brazil: "bg-green-600",
      Argentina: "bg-blue-500",
      Chile: "bg-red-500",
      Colombia: "bg-yellow-500",
      Peru: "bg-red-500",
      "South Africa": "bg-green-500",
      Egypt: "bg-red-500",
      Morocco: "bg-red-600",
      Nigeria: "bg-green-500",
      Kenya: "bg-red-500",
      Israel: "bg-blue-500",
      "Saudi Arabia": "bg-green-500",
      Qatar: "bg-red-500",
      Kuwait: "bg-green-500",
      Bahrain: "bg-red-500",
      Oman: "bg-red-600",
      Jordan: "bg-red-500",
      Lebanon: "bg-red-500",
      Cyprus: "bg-blue-500",
      Greece: "bg-blue-500",
      Italy: "bg-green-500",
      Spain: "bg-red-500",
      France: "bg-blue-500",
      Germany: "bg-yellow-500",
      Netherlands: "bg-red-500",
      Belgium: "bg-yellow-500",
      Switzerland: "bg-red-500",
      Austria: "bg-red-500",
      Poland: "bg-red-500",
      "Czech Republic": "bg-blue-500",
      Hungary: "bg-red-500",
      Romania: "bg-yellow-500",
      Bulgaria: "bg-green-500",
      Croatia: "bg-red-500",
      Slovenia: "bg-blue-500",
      Slovakia: "bg-blue-500",
      Estonia: "bg-blue-500",
      Latvia: "bg-red-500",
      Lithuania: "bg-yellow-500",
      Finland: "bg-blue-500",
      Sweden: "bg-yellow-500",
      Norway: "bg-red-500",
      Denmark: "bg-red-500",
      Iceland: "bg-blue-500",
      Ireland: "bg-green-500",
      "United Kingdom": "bg-blue-500",
      Portugal: "bg-red-500",
      Luxembourg: "bg-red-500",
      Malta: "bg-red-500",
   };

   return colorMap[countryName] || "bg-gray-500";
}
