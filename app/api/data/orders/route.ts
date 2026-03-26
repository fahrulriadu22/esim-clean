import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import {
   order,
   esim,
   packageTable,
   region,
   user,
   balance,
} from "@/database/schema";
import { eq, or, ilike, desc, count, inArray } from "drizzle-orm";
import { validateDataApiKey } from "@/lib/data-api-auth";

export async function GET(req: NextRequest) {
   // Security check - validate API key from environment variable
   const authError = validateDataApiKey(req);
   if (authError) {
      return authError;
   }

   const { searchParams } = new URL(req.url);
   const page = parseInt(searchParams.get("page") || "1");
   const limit = parseInt(searchParams.get("limit") || "10");
   const search = searchParams.get("search") || "";
   const status = searchParams.get("status") || "";

   // Validate pagination parameters
   if (page < 1) {
      return NextResponse.json(
         { error: "Page must be greater than 0" },
         { status: 400 }
      );
   }

   if (limit < 1 || limit > 100) {
      return NextResponse.json(
         { error: "Limit must be between 1 and 100" },
         { status: 400 }
      );
   }

   try {
      // Calculate offset for pagination
      const offset = (page - 1) * limit;

      // Build where conditions for search and status filter
      const whereConditions = [];

      if (search) {
         whereConditions.push(
            or(
               ilike(order.orderNo, `%${search}%`),
               ilike(order.txId, `%${search}%`),
               ilike(order.telegramId, `%${search}%`)
            )
         );
      }

      if (status) {
         whereConditions.push(eq(order.status, status.toUpperCase() as any));
      }

      // Get total count for pagination metadata
      const totalCountResult = await db
         .select({ count: count() })
         .from(order)
         .where(
            whereConditions.length > 0 ? or(...whereConditions) : undefined
         );

      const totalCount = totalCountResult[0]?.count || 0;

      // Fetch orders with related data
      const orders = await db
         .select()
         .from(order)
         .where(whereConditions.length > 0 ? or(...whereConditions) : undefined)
         .orderBy(desc(order.createdAt))
         .limit(limit)
         .offset(offset);

      // Get eSIMs for these orders
      const orderNos = orders.map((o) => o.orderNo);
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

      // Create a map for quick lookup
      const packageMap = new Map(packages.map((pkg) => [pkg.code, pkg]));

      // Get unique telegram IDs to fetch user information
      const telegramIds = [...new Set(orders.map((order) => order.telegramId))];

      // Fetch user information
      const users =
         telegramIds.length > 0
            ? await db
                 .select({
                    id: user.id,
                    telegramId: user.telegramId,
                    username: user.username,
                    fullName: user.fullName,
                    photoUrl: user.photoUrl,
                    languageCode: user.languageCode,
                    balanceId: user.balanceId,
                    balance: {
                       id: balance.id,
                       amount: balance.amount,
                    },
                 })
                 .from(user)
                 .leftJoin(balance, eq(user.balanceId, balance.id))
                 .where(inArray(user.telegramId, telegramIds))
            : [];

      // Create a map for quick user lookup
      const userMap = new Map(users.map((user) => [user.telegramId, user]));

      // Transform the data to include simplified information
      const transformedOrders = orders.map((order) => {
         const userData = userMap.get(order.telegramId);
         const orderEsims = esims.filter((e) => e.orderNo === order.orderNo);
         const esim = orderEsims[0]; // Get the first esim for package info
         const packageInfo = esim ? packageMap.get(esim.packageCode) : null;

         return {
            // Order information
            id: order.id,
            orderNo: order.orderNo,
            txId: order.txId,
            amount: order.amount,
            status: order.status,
            paymentMethod: order.paymentMethod,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,

            // User information (simplified)
            user: {
               name: userData?.fullName || "Unknown User",
               username: userData?.username || "Unknown",
            },

            // Package information (simplified)
            package: packageInfo
               ? {
                    code: packageInfo.code,
                    name: packageInfo.name,
                    countryCode: packageInfo.region.code,
                 }
               : null,
         };
      });

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return NextResponse.json({
         success: true,
         data: transformedOrders,
         pagination: {
            page,
            limit,
            totalCount,
            totalPages,
            hasNextPage,
            hasPrevPage,
         },
         summary: {
            totalOrders: totalCount,
            totalUsers: users.length,
            totalPackages: packages.length,
            statusBreakdown: await getStatusBreakdown(),
         },
      });
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: "Internal server error",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}

// Helper function to get status breakdown
async function getStatusBreakdown() {
   const statusCounts = await db
      .select({
         status: order.status,
         count: count(),
      })
      .from(order)
      .groupBy(order.status);

   return statusCounts.reduce((acc, item) => {
      acc[item.status.toLowerCase()] = item.count;
      return acc;
   }, {} as Record<string, number>);
}
