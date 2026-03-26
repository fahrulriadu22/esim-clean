import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory } from "@/database/schema";
import { eq, and } from "drizzle-orm";
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
      "/api/transaction-detail"
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
      const transactionId = searchParams.get("id");

      if (!transactionId) {
         return NextResponse.json(
            { error: "Transaction ID is required" },
            { status: 400 }
         );
      }

      // Fetch transaction details
      const transactionRecord = await db
         .select()
         .from(paymentHistory)
         .where(
            and(
               eq(paymentHistory.id, transactionId),
               eq(paymentHistory.telegramId, extractedUserData.id.toString()),
               eq(paymentHistory.paymentType, "TOPUP")
            )
         )
         .limit(1);

      if (transactionRecord.length === 0) {
         return NextResponse.json(
            { error: "Transaction not found" },
            { status: 404 }
         );
      }

      const transaction = transactionRecord[0];

      // Format the response with detailed transaction information
      const response = {
         success: true,
         data: {
            id: transaction.id,
            referenceId: transaction.referenceId,
            amount: transaction.amount,
            paymentMethod: transaction.paymentMethod,
            status: transaction.status,
            payerEmail: transaction.payerEmail,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
            // Additional transaction details
            transactionType: transaction.paymentType,
            currency: "USD",
         },
      };

      return NextResponse.json(response);
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch transaction details",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}
