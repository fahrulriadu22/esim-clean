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
import { getAccessToken } from "@/app/api/paypal/helper";

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

// Get PayPal order payment link
async function getPayPalOrderLink(orderId: string): Promise<string | null> {
   try {
      const accessToken = await getAccessToken();
      const response = await fetch(
         `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}`,
         {
            method: "GET",
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
         }
      );

      if (!response.ok) {
         return null;
      }

      const order = await response.json();
      // Find the approval link
      const approvalLink = order.links?.find(
         (link: any) => link.rel === "approve"
      );
      return approvalLink?.href || null;
   } catch (error) {
      console.error("Error fetching PayPal order:", error);
      return null;
   }
}

// Generate Telegram Stars invoice link
async function generateStarsInvoiceLink(
   referenceId: string,
   amount: number,
   paymentType: "TOPUP" | "ORDER"
): Promise<string | null> {
   try {
      const title = paymentType === "TOPUP" ? "Balance Top-up" : "eSIM Purchase";
      const description =
         paymentType === "TOPUP"
            ? `Top up your balance with $${amount}`
            : `Purchase eSIM package for $${amount}`;

      // Convert USD to Stars
      const starsAmount = Math.ceil(
         amount / (process.env.STARS_RATE as unknown as number)
      );

      const invoiceResponse = await telegramApiRequest("createInvoiceLink", {
         title,
         description,
         payload: referenceId,
         provider_data: "",
         currency: "XTR",
         prices: [
            {
               label: paymentType === "TOPUP" ? "Balance Top-up" : "eSIM Package",
               amount: starsAmount,
            },
         ],
      });

      return invoiceResponse.result || null;
   } catch (error) {
      console.error("Error generating Stars invoice:", error);
      return null;
   }
}

export async function GET(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(
      request,
      "/api/payment-history/complete"
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
      const referenceId = searchParams.get("referenceId");

      if (!referenceId) {
         return NextResponse.json(
            { error: "Reference ID is required" },
            { status: 400 }
         );
      }

      // Fetch payment history by referenceId
      const paymentRecord = await db
         .select()
         .from(paymentHistory)
         .where(
            and(
               eq(paymentHistory.referenceId, referenceId),
               eq(paymentHistory.telegramId, extractedUserData.id.toString()),
               eq(paymentHistory.status, "PENDING")
            )
         )
         .limit(1);

      if (paymentRecord.length === 0) {
         return NextResponse.json(
            { error: "Pending payment not found" },
            { status: 404 }
         );
      }

      const payment = paymentRecord[0];
      const paymentMethod = payment.paymentMethod?.toUpperCase();

      let paymentLink: string | null = null;
      let paymentData: any = {};

      if (paymentMethod === "PAYPAL") {
         // Get PayPal order link using orderNo (which is the PayPal order ID)
         if (payment.orderNo && payment.orderNo !== "" && payment.orderNo !== payment.referenceId) {
            paymentLink = await getPayPalOrderLink(payment.orderNo);
         }

         // If we couldn't get the link, we need to create a new order
         // But for now, return error suggesting to contact support
         if (!paymentLink) {
            return NextResponse.json(
               {
                  success: false,
                  error: "PayPal order link not available. Please contact support or create a new payment.",
               },
               { status: 404 }
            );
         }

         paymentData = {
            type: "PAYPAL",
            payLink: paymentLink,
         };
      } else if (paymentMethod === "STARS") {
         // Generate new invoice link for Telegram Stars
         paymentLink = await generateStarsInvoiceLink(
            payment.referenceId,
            payment.amount,
            payment.paymentType
         );

         if (!paymentLink) {
            return NextResponse.json(
               {
                  success: false,
                  error: "Failed to generate Stars invoice link",
               },
               { status: 500 }
            );
         }

         paymentData = {
            type: "STARS",
            invoiceLink: paymentLink,
         };
      } else if (paymentMethod === "TON") {
         // For TON, return payment instructions
         paymentData = {
            type: "TON",
            referenceId: payment.referenceId,
            amount: payment.amount,
            recipientAddress: process.env.NEXT_PUBLIC_TON_RECIPIENT_ADDRESS,
         };
      } else {
         return NextResponse.json(
            {
               success: false,
               error: "Unknown payment method",
            },
            { status: 400 }
         );
      }

      return NextResponse.json({
         success: true,
         data: {
            referenceId: payment.referenceId,
            amount: payment.amount,
            paymentMethod: payment.paymentMethod,
            paymentType: payment.paymentType,
            ...paymentData,
         },
      });
   } catch (error) {
      console.error("Error getting payment completion info:", error);
      return NextResponse.json(
         {
            success: false,
            error: "Failed to get payment completion information",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}

