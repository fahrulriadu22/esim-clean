import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { user, balance } from "@/database/schema";
import { eq } from "drizzle-orm";
import {
   extractUserData,
   UserData,
   verifyTelegramWebAppData,
} from "@/lib/utils";
import { applyRateLimit } from "@/lib/rate-limiter";

export async function GET(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(request, "/api/balance");
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

      if (!verifyTelegramWebAppData(telegramData)) {
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

      // Find user with balance
      const userRecord = await db
         .select({
            id: user.id,
            telegramId: user.telegramId,
            username: user.username,
            fullName: user.fullName,
            balanceId: user.balanceId,
         })
         .from(user)
         .where(eq(user.telegramId, extractedUserData.id.toString()))
         .limit(1);

      if (userRecord.length === 0) {
         return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
         );
      }

      const userData = userRecord[0];
      const balanceRecord = await db
         .select({ amount: balance.amount })
         .from(balance)
         .where(eq(balance.id, userData.balanceId))
         .limit(1);

      if (balanceRecord.length === 0) {
         return NextResponse.json(
            { message: "Balance not found" },
            { status: 404 }
         );
      }

      return NextResponse.json({
         success: true,
         data: {
            balance: balanceRecord[0].amount,
            currency: "USD", // Assuming USD as default currency
            user: {
               id: userData.id,
               telegramId: userData.telegramId,
               username: userData.username,
               fullName: userData.fullName,
            },
         },
      });
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch balance",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}

