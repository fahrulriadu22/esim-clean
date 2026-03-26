import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { order, esim, packageTable, region, paymentHistory } from "@/database/schema";
import { eq, desc, inArray, and } from "drizzle-orm";
import {
   extractUserData,
   UserData,
} from "@/lib/utils";
import { verifyTelegramWebAppData } from "@/lib/crypto-utils";
import { applyRateLimit } from "@/lib/rate-limiter";
import { makeAuthenticatedRequest } from "@/utils/esim-api";

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

export async function GET(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(request, "/api/orders");
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

   // Get pagination parameters
   const { searchParams } = new URL(request.url);
   const page = parseInt(searchParams.get("page") || "1");
   const limit = parseInt(searchParams.get("limit") || "5");

   // Validate pagination parameters
   if (page < 1) {
      return NextResponse.json(
         { error: "Page must be greater than 0" },
         { status: 400 }
      );
   }

   if (limit < 1 || limit > 50) {
      return NextResponse.json(
         { error: "Limit must be between 1 and 50" },
         { status: 400 }
      );
   }

   try {
      const telegramId = extractedUserData.id.toString();

      // Fetch completed orders
      const orders = await db
         .select()
         .from(order)
         .where(eq(order.telegramId, telegramId))
         .orderBy(desc(order.createdAt));

      // Fetch pending payments (ORDER type only)
      const pendingPayments = await db
         .select()
         .from(paymentHistory)
         .where(
            and(
               eq(paymentHistory.telegramId, telegramId),
               eq(paymentHistory.status, "PENDING"),
               eq(paymentHistory.paymentType, "ORDER")
            )
         )
         .orderBy(desc(paymentHistory.createdAt));

      // Get package information for pending payments using esim-api
      const pendingPaymentsWithPackageInfo = await Promise.all(
         pendingPayments.map(async (payment) => {
            let packageInfo = null;
            let regionInfo = null;

            if (payment.packageCode && payment.packageCode !== "-") {
               try {
                  // Try to get package info from database first
                  const dbPackage = await db
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
                     .where(eq(packageTable.code, payment.packageCode))
                     .limit(1);

                  if (dbPackage.length > 0) {
                     packageInfo = dbPackage[0];
                     regionInfo = dbPackage[0].region;
                  } else {
                     // Fallback to esim-api if not in database
                     const apiResponse = await makeAuthenticatedRequest(
                        "https://api.esimaccess.com/api/v1/open/package/list",
                        {
                           packageCode: payment.packageCode,
                        }
                     );

                     if (apiResponse.success && apiResponse.obj?.packageList?.length > 0) {
                        const pkg = apiResponse.obj.packageList[0];
                        packageInfo = {
                           name: pkg.name,
                           code: payment.packageCode,
                           data: pkg.data || "",
                           duration: pkg.duration,
                           durationUnit: pkg.durationUnit,
                        };
                        // Try to get region info from location code if available
                        if (pkg.locationCode) {
                           const regionData = await db
                              .select()
                              .from(region)
                              .where(eq(region.code, pkg.locationCode))
                              .limit(1);
                           if (regionData.length > 0) {
                              regionInfo = {
                                 id: regionData[0].id,
                                 name: regionData[0].name,
                                 code: regionData[0].code,
                              };
                           }
                        }
                     }
                  }
               } catch (error) {
                  console.error(
                     `Error fetching package info for ${payment.packageCode}:`,
                     error
                  );
               }
            }

            return {
               ...payment,
               packageInfo,
               regionInfo,
            };
         })
      );

      // Get order numbers to fetch related esims
      const orderNos = orders.map((order) => order.orderNo);

      // Fetch esims for all orders
      const esims =
         orderNos.length > 0
            ? await db
                 .select()
                 .from(esim)
                 .where(inArray(esim.orderNo, orderNos))
            : [];

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

      // Create maps for quick lookup
      const packageMap = new Map(packages.map((pkg) => [pkg.code, pkg]));
      const esimMap = new Map(esims.map((esim) => [esim.orderNo, esim]));

      // Transform completed orders
      const transformedOrders = orders.map((order) => {
         const orderEsims = esims.filter(
            (esim) => esim.orderNo === order.orderNo
         );
         const firstEsim = orderEsims[0]; // Get the first esim for display
         const packageInfo = firstEsim
            ? packageMap.get(firstEsim.packageCode)
            : null;
         const regionCode = packageInfo?.region?.code || "UN";

         return {
            id: order.orderNo,
            country:
               packageInfo?.region?.name || firstEsim?.packageName || "Unknown",
            flag: `https://flagsapi.com/${regionCode}/flat/64.png`,
            plan: formatPlan(
               packageInfo?.name || firstEsim?.packageName || "",
               packageInfo?.duration || firstEsim?.totalDuration || 0,
               packageInfo?.durationUnit || firstEsim?.durationUnit || ""
            ),
            price: order.amount,
            status: order.status.toLowerCase(),
            orderDate: order.createdAt.toISOString().split("T")[0],
            activationDate: firstEsim?.createdAt
               ? firstEsim.createdAt.toISOString().split("T")[0]
               : "-",
            paymentMethod: order.paymentMethod || "Unknown",
            color: getCountryColor(
               packageInfo?.region?.name || firstEsim?.packageName || ""
            ),
            txId: order.txId,
            esims: orderEsims.map((esim) => ({
               id: esim.id,
               iccid: esim.iccid,
               imsi: esim.imsi,
               ac: esim.ac,
               status: esim.status,
               remainingData: Number(esim.remainingData) / (1024 * 1024 * 1024), // Convert BigInt bytes to GB
               remainingDataFormatted: formatDataSize(esim.remainingData), // Formatted display
               expiredAt: esim.expiredAt,
            })),
         };
      });

      // Transform pending payments
      const transformedPendingPayments = pendingPaymentsWithPackageInfo.map(
         (payment) => {
            const packageInfo = payment.packageInfo;
            const regionInfo = payment.regionInfo;
            const regionCode = regionInfo?.code || "UN";

            return {
               id: payment.referenceId,
               country: regionInfo?.name || "Unknown",
               flag: `https://flagsapi.com/${regionCode}/flat/64.png`,
               plan: packageInfo
                  ? formatPlan(
                       packageInfo.name || "",
                       packageInfo.duration || 0,
                       packageInfo.durationUnit || ""
                    )
                  : "Package info unavailable",
               price: payment.amount,
               status: "pending",
               orderDate: payment.createdAt.toISOString().split("T")[0],
               activationDate: "-",
               paymentMethod: payment.paymentMethod || "Unknown",
               color: getCountryColor(regionInfo?.name || ""),
               txId: payment.referenceId,
               packageCode: payment.packageCode || "-",
               esims: [],
            };
         }
      );

      // Merge and sort all orders by date (newest first)
      const allOrders = [...transformedOrders, ...transformedPendingPayments].sort(
         (a, b) => {
            const dateA = new Date(a.orderDate).getTime();
            const dateB = new Date(b.orderDate).getTime();
            return dateB - dateA;
         }
      );

      // Apply pagination
      const offset = (page - 1) * limit;
      const paginatedOrders = allOrders.slice(offset, offset + limit);
      const totalCount = allOrders.length;

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return NextResponse.json({
         success: true,
         data: paginatedOrders,
         pagination: {
            page,
            limit,
            totalCount,
            totalPages,
            hasNextPage,
            hasPrevPage,
         },
      });
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch orders",
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
   // This is a simplified version - you might want to store this data separately
   const dataMatch = packageName.match(/(\d+)\s*(GB|MB)/i);
   const dataAmount = dataMatch ? dataMatch[1] : "Unknown";
   const dataUnit = dataMatch ? dataMatch[2] : "GB";

   return `${dataAmount} ${dataUnit} / ${duration} ${durationUnit}`;
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
