import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { order, esim, paymentHistory } from "@/database/schema";
import { eq, and, gte, lte, count, sum, avg, desc } from "drizzle-orm";
import { validateDataApiKey } from "@/lib/data-api-auth";

export async function GET(req: NextRequest) {
   // Security check - validate API key from environment variable
   const authError = validateDataApiKey(req);
   if (authError) {
      return authError;
   }

   const { searchParams } = new URL(req.url);
   const startDate = searchParams.get("startDate");
   const endDate = searchParams.get("endDate");
   const days = parseInt(searchParams.get("days") || "7"); // Default to last 7 days

   try {
      // Calculate date range
      const endDateObj = endDate ? new Date(endDate) : new Date();
      const startDateObj = startDate
         ? new Date(startDate)
         : new Date(endDateObj.getTime() - (days - 1) * 24 * 60 * 60 * 1000);

      // Ensure start date is not in the future
      const actualStartDate =
         startDateObj > endDateObj ? endDateObj : startDateObj;

      // Build date filters for different tables
      const orderDateFilter = and(
         gte(order.createdAt, actualStartDate),
         lte(order.createdAt, endDateObj)
      );

      const paymentDateFilter = and(
         gte(paymentHistory.createdAt, actualStartDate),
         lte(paymentHistory.createdAt, endDateObj)
      );

      // Get analytics data in parallel for better performance
      const [
         // Order analytics
         totalOrdersResult,
         totalRevenueResult,
         averageOrderValueResult,
         packagesSoldResult,
         orderStatusBreakdownResult,

         // Topup analytics
         totalTopupsResult,
         totalTopupRevenueResult,
         averageTopupValueResult,
         topupStatusBreakdownResult,

         // Daily topup data for charts
         dailyTopupData,
      ] = await Promise.all([
         // Total orders count
         db.select({ count: count() }).from(order).where(orderDateFilter),

         // Total revenue from orders
         db
            .select({ sum: sum(order.amount) })
            .from(order)
            .where(and(orderDateFilter, eq(order.status, "COMPLETED"))),

         // Average order value
         db
            .select({ avg: avg(order.amount) })
            .from(order)
            .where(and(orderDateFilter, eq(order.status, "COMPLETED"))),

         // Total packages sold (count of esims)
         db
            .select({ count: count() })
            .from(esim)
            .leftJoin(order, eq(esim.orderNo, order.orderNo))
            .where(and(orderDateFilter, eq(order.status, "COMPLETED"))),

         // Order status breakdown
         db
            .select({ status: order.status, count: count() })
            .from(order)
            .where(orderDateFilter)
            .groupBy(order.status),

         // Total topups count
         db
            .select({ count: count() })
            .from(paymentHistory)
            .where(
               and(paymentDateFilter, eq(paymentHistory.paymentType, "TOPUP"))
            ),

         // Total topup revenue
         db
            .select({ sum: sum(paymentHistory.amount) })
            .from(paymentHistory)
            .where(
               and(
                  paymentDateFilter,
                  eq(paymentHistory.paymentType, "TOPUP"),
                  eq(paymentHistory.status, "COMPLETED")
               )
            ),

         // Average topup value
         db
            .select({ avg: avg(paymentHistory.amount) })
            .from(paymentHistory)
            .where(
               and(
                  paymentDateFilter,
                  eq(paymentHistory.paymentType, "TOPUP"),
                  eq(paymentHistory.status, "COMPLETED")
               )
            ),

         // Topup status breakdown
         db
            .select({ status: paymentHistory.status, count: count() })
            .from(paymentHistory)
            .where(
               and(paymentDateFilter, eq(paymentHistory.paymentType, "TOPUP"))
            )
            .groupBy(paymentHistory.status),

         // Daily topup data for charts
         getDailyTopupData(actualStartDate, endDateObj),
      ]);

      // Extract results
      const totalOrders = totalOrdersResult[0]?.count || 0;
      const totalRevenue = totalRevenueResult[0]?.sum || 0;
      const averageOrderValue = averageOrderValueResult[0]?.avg || 0;
      const packagesSold = packagesSoldResult[0]?.count || 0;
      const orderStatusBreakdown = orderStatusBreakdownResult;
      const totalTopups = totalTopupsResult[0]?.count || 0;
      const totalTopupRevenue = totalTopupRevenueResult[0]?.sum || 0;
      const averageTopupValue = averageTopupValueResult[0]?.avg || 0;
      const topupStatusBreakdown = topupStatusBreakdownResult;

      // Calculate success rates
      const orderSuccessRate =
         totalOrders > 0
            ? ((orderStatusBreakdown.find((s) => s.status === "COMPLETED")
                 ?.count || 0) /
                 totalOrders) *
              100
            : 0;

      const topupSuccessRate =
         totalTopups > 0
            ? ((topupStatusBreakdown.find((s) => s.status === "COMPLETED")
                 ?.count || 0) /
                 totalTopups) *
              100
            : 0;

      // Format response
      const response = {
         success: true,
         data: {
            // Date range
            dateRange: {
               startDate: actualStartDate.toISOString(),
               endDate: endDateObj.toISOString(),
               days:
                  Math.ceil(
                     (endDateObj.getTime() - actualStartDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                  ) + 1,
            },

            // Summary metrics
            summary: {
               totalOrders: totalOrders,
               totalRevenue: totalRevenue,
               averageOrderValue: totalRevenue
                  ? Number(totalRevenue) / totalOrders
                  : 0,
               packagesSold: packagesSold,
               totalTopups: totalTopups,
               topupRevenue: totalTopupRevenue,
               averageTopupValue: totalTopupRevenue
                  ? Number(totalTopupRevenue) / totalTopups
                  : 0,
               orderSuccessRate: Math.round(orderSuccessRate * 100) / 100,
               topupSuccessRate: Math.round(topupSuccessRate * 100) / 100,
            },

            // Daily topup data for charts
            dailyTopupData: dailyTopupData,
         },
      };

      return NextResponse.json(response);
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

// Helper function to get daily topup data for charts
async function getDailyTopupData(startDate: Date, endDate: Date) {
   const dailyData = await db
      .select({
         createdAt: paymentHistory.createdAt,
         sum: sum(paymentHistory.amount),
         count: count(),
      })
      .from(paymentHistory)
      .where(
         and(
            eq(paymentHistory.paymentType, "TOPUP"),
            eq(paymentHistory.status, "COMPLETED"),
            gte(paymentHistory.createdAt, startDate),
            lte(paymentHistory.createdAt, endDate)
         )
      )
      .groupBy(paymentHistory.createdAt)
      .orderBy(desc(paymentHistory.createdAt));

   // Group by date (ignoring time) and sum amounts
   const dateMap = new Map<string, { amount: number; count: number }>();

   dailyData.forEach((item) => {
      const dateKey = item.createdAt.toISOString().split("T")[0];
      const existing = dateMap.get(dateKey) || { amount: 0, count: 0 };
      dateMap.set(dateKey, {
         amount: existing.amount + (Number(item.sum) || 0),
         count: existing.count + item.count,
      });
   });

   // Generate all dates in range and fill missing dates with 0
   const result = [];
   const currentDate = new Date(startDate);

   while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split("T")[0];
      const data = dateMap.get(dateKey) || { amount: 0, count: 0 };

      result.push({
         date: dateKey,
         amount: data.amount,
         count: data.count,
      });

      currentDate.setDate(currentDate.getDate() + 1);
   }

   return result;
}
