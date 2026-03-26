import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory } from "@/database/schema";
import { eq, and, desc } from "drizzle-orm";
import {
   extractUserData,
   UserData,
} from "@/lib/utils";
import { verifyTelegramWebAppData } from "@/lib/crypto-utils";
import { applyRateLimit } from "@/lib/rate-limiter";

export async function GET(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(
      request,
      "/api/topup-history"
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

      if (limit < 1 || limit > 5) {
         return NextResponse.json(
            { error: "Limit must be between 1 and 5" },
            { status: 400 }
         );
      }

      // Calculate offset for pagination
      const offset = (page - 1) * limit;

      // Fetch topup history for the user with COMPLETED status only
      const [topups, totalCountResult] = await Promise.all([
         db
            .select()
            .from(paymentHistory)
            .where(
               and(
                  eq(
                     paymentHistory.telegramId,
                     extractedUserData.id.toString()
                  ),
                  eq(paymentHistory.paymentType, "TOPUP"),
                  eq(paymentHistory.status, "COMPLETED")
               )
            )
            .orderBy(desc(paymentHistory.createdAt))
            .limit(limit)
            .offset(offset),
         db
            .select({ count: paymentHistory.id })
            .from(paymentHistory)
            .where(
               and(
                  eq(
                     paymentHistory.telegramId,
                     extractedUserData.id.toString()
                  ),
                  eq(paymentHistory.paymentType, "TOPUP"),
                  eq(paymentHistory.status, "COMPLETED")
               )
            ),
      ]);

      const totalCount = totalCountResult.length;

      // Calculate total pages
      const totalPages = Math.ceil(totalCount / limit);

      // Format the response
      const response = {
         success: true,
         data: {
            topups: topups.map((topup) => ({
               id: topup.id,
               referenceId: topup.referenceId,
               amount: topup.amount,
               paymentMethod: topup.paymentMethod,
               status: topup.status,
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
         },
      };

      return NextResponse.json(response);
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch topup history",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}
