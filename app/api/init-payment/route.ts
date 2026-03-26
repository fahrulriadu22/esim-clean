import {
   extractUserData,
   UserData,
} from "@/lib/utils";
import { verifyTelegramWebAppData } from "@/lib/crypto-utils";
import { db } from "@/database/drizzle";
import { user, paymentHistory } from "@/database/schema";
import { eq, lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getCachedTonPrice } from "@/lib/ton-price-cache";
import { applyRateLimit } from "@/lib/rate-limiter";

// Telegram Bot API base URL
const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.BOT_KEY}`;

// Helper function to make Telegram API requests
async function telegramApiRequest(method: string, data: any) {
   try {
      const response = await fetch(`${TELEGRAM_API_URL}/${method}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      if (!response.ok) {
         throw new Error(
            `Telegram API error: ${response.status} ${response.statusText}`
         );
      }

      return await response.json();
   } catch (error) {
      console.error(`Error calling Telegram API method ${method}:`, error);
      throw error;
   }
}

function generateTransactionId(method: string) {
   return `${method}-${uuidv4().split("-").pop()}`;
}

const ACCEPTABLE_METHOD = ["TON", "PAYPAL", "STARS"];

export async function POST(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(request, "/api/init-payment");
   if (rateLimitResponse) {
      return rateLimitResponse;
   }

   const body = await request.json();
   const { amount, paymentMethod, type, sku } = body;
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

   if (!ACCEPTABLE_METHOD.includes(paymentMethod)) {
      return NextResponse.json(
         { message: "Invalid payment method" },
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
   const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.telegramId, extractedUserData.id.toString()))
      .limit(1);

   if (userRecord.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   const userData = userRecord[0];
   const referenceId = generateTransactionId(paymentMethod);
   let additionalData = {};

   if (paymentMethod === "TON") {
      // convert usd to ton
      const tonPrice = await getCachedTonPrice();
      const tonAmount = amount / tonPrice;

      additionalData = {
         tonAmount: tonAmount.toFixed(3),
      };
   }

   if (paymentMethod === "STARS") {
      try {
         // Create invoice for Telegram Stars payment
         const title = type === "TOPUP" ? "Balance Top-up" : "eSIM Purchase";
         const description =
            type === "TOPUP"
               ? `Top up your balance with $${amount}`
               : `Purchase eSIM package for $${amount}`;

         // Convert USD to Stars (1 Star = 0.018 USD)
         // So 1 USD = 1 / 0.018 = ~55.56 Stars
         const starsAmount = Math.ceil(
            amount / (process.env.STARS_RATE as unknown as number)
         );

         // Create invoice link using Telegram Bot API
         const invoiceResponse = await telegramApiRequest("createInvoiceLink", {
            title,
            description,
            payload: referenceId, // Use referenceId as payload
            provider_data: "", // provider_data
            currency: "XTR", // currency for Telegram Stars
            prices: [
               {
                  label: type === "TOPUP" ? "Balance Top-up" : "eSIM Package",
                  amount: starsAmount,
               },
            ],
         });

         additionalData = {
            invoiceLink: invoiceResponse.result,
            starsAmount: starsAmount,
         };
      } catch (error) {
         return NextResponse.json(
            {
               message: "Failed to create Telegram Stars invoice",
               error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
         );
      }
   }
   const payment = await db
      .insert(paymentHistory)
      .values({
         telegramId: userData.telegramId,
         amount: amount,
         paymentMethod: paymentMethod,
         status: "PENDING",
         paymentType: type,
         referenceId: referenceId,
         orderNo: sku || referenceId,
         packageCode: type === "ORDER" ? (sku || "-") : "-",
         userId: userData.id,
      })
      .returning();

   return NextResponse.json({
      message: "Payment initialized",
      data: {
         referenceId: referenceId,
         amount: payment[0].amount,
         ...additionalData,
      },
   });
}
