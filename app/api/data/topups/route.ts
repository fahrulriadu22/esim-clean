import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory, user, balance } from "@/database/schema";
import {
   eq,
   or,
   ilike,
   desc,
   count,
   and,
   gte,
   lte,
   sum,
   avg,
} from "drizzle-orm";
import { validateDataApiKey } from "@/lib/data-api-auth";

export async function GET(request: NextRequest) {
   // Security check - validate API key from environment variable
   const authError = validateDataApiKey(request);
   if (authError) {
      return authError;
   }

   try {
      const { searchParams } = new URL(request.url);

      // Get query parameters
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const status = searchParams.get("status");
      const paymentMethod = searchParams.get("paymentMethod");
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");
      const telegramId = searchParams.get("telegramId");
      const search = searchParams.get("search");

      // Calculate offset for pagination
      const offset = (page - 1) * limit;

      // Build where conditions for filtering
      const whereConditions = [eq(paymentHistory.paymentType, "TOPUP")];

      if (status) {
         whereConditions.push(eq(paymentHistory.status, status as any));
      }

      if (paymentMethod) {
         whereConditions.push(eq(paymentHistory.paymentMethod, paymentMethod));
      }

      if (telegramId) {
         whereConditions.push(eq(paymentHistory.telegramId, telegramId));
      }

      if (startDate) {
         whereConditions.push(
            gte(paymentHistory.createdAt, new Date(startDate))
         );
      }

      if (endDate) {
         whereConditions.push(lte(paymentHistory.createdAt, new Date(endDate)));
      }

      if (search) {
         const searchCondition = or(
            ilike(paymentHistory.referenceId, `%${search}%`),
            ilike(paymentHistory.telegramId, `%${search}%`),
            ilike(paymentHistory.payerEmail, `%${search}%`),
            ilike(paymentHistory.orderNo, `%${search}%`)
         );
         if (searchCondition) {
            whereConditions.push(searchCondition);
         }
      }

      // Fetch topup records with pagination
      const [topups, totalCountResult] = await Promise.all([
         db
            .select({
               id: paymentHistory.id,
               referenceId: paymentHistory.referenceId,
               telegramId: paymentHistory.telegramId,
               userId: paymentHistory.userId,
               payerEmail: paymentHistory.payerEmail,
               amount: paymentHistory.amount,
               paymentMethod: paymentHistory.paymentMethod,
               status: paymentHistory.status,
               paymentType: paymentHistory.paymentType,
               orderNo: paymentHistory.orderNo,
               createdAt: paymentHistory.createdAt,
               updatedAt: paymentHistory.updatedAt,
               user: {
                  id: user.id,
                  telegramId: user.telegramId,
                  username: user.username,
                  fullName: user.fullName,
                  photoUrl: user.photoUrl,
                  languageCode: user.languageCode,
               },
            })
            .from(paymentHistory)
            .leftJoin(user, eq(paymentHistory.userId, user.id))
            .where(and(...whereConditions))
            .orderBy(desc(paymentHistory.createdAt))
            .limit(limit)
            .offset(offset),
         db
            .select({ count: count() })
            .from(paymentHistory)
            .where(and(...whereConditions)),
      ]);

      const totalCount = totalCountResult[0]?.count || 0;

      // Calculate summary statistics
      const summaryStatsResult = await db
         .select({
            count: count(),
            sum: sum(paymentHistory.amount),
            avg: avg(paymentHistory.amount),
         })
         .from(paymentHistory)
         .where(and(...whereConditions));

      const summaryStats = {
         _count: { id: summaryStatsResult[0]?.count || 0 },
         _sum: { amount: summaryStatsResult[0]?.sum || 0 },
         _avg: { amount: summaryStatsResult[0]?.avg || 0 },
      };

      // Calculate success rate
      const completedCountResult = await db
         .select({ count: count() })
         .from(paymentHistory)
         .where(
            and(...whereConditions, eq(paymentHistory.status, "COMPLETED"))
         );

      const completedCount = completedCountResult[0]?.count || 0;

      const successRate =
         totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

      // Calculate total pages
      const totalPages = Math.ceil(totalCount / limit);

      // Format the response
      const response = {
         success: true,
         data: {
            topups: topups.map((topup) => ({
               id: topup.id,
               referenceId: topup.referenceId,
               telegramId: topup.telegramId,
               user: topup.user
                  ? {
                       id: topup.user.id,
                       telegramId: topup.user.telegramId,
                       username: topup.user.username,
                       fullName: topup.user.fullName,
                       photoUrl: topup.user.photoUrl,
                       languageCode: topup.user.languageCode,
                    }
                  : null,
               payerEmail: topup.payerEmail,
               amount: topup.amount,
               paymentMethod: topup.paymentMethod,
               status: topup.status,
               paymentType: topup.paymentType,
               orderNo: topup.orderNo,
               createdAt: topup.createdAt,
               updatedAt: topup.updatedAt,
            })),
            pagination: {
               page,
               limit,
               totalCount,
               totalPages,
               hasNext: page < totalPages,
               hasPrev: page > 1,
            },
            summary: {
               totalTopups: summaryStats._count.id,
               totalRevenue: summaryStats._sum.amount || 0,
               successRate: Math.round(successRate * 100) / 100, // Round to 2 decimal places
               averageTopupAmount: summaryStats._avg.amount || 0,
               completedTopups: completedCount,
               failedTopups: totalCount - completedCount,
            },
         },
      };

      return NextResponse.json(response);
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch topup data",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}
