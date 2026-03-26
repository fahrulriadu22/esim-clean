// Import TON utilities dynamically to avoid Edge Runtime issues
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory, tonHistory, user, balance } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import { getCachedTonPrice } from "@/lib/ton-price-cache";
import { orderEsim } from "@/utils/esim-api";

/**
 * API route to verify TON transaction hash by checking the blockchain
 * This endpoint polls the TON blockchain to verify if a transaction is confirmed
 */

interface TonCenterResponse {
   ok: boolean;
   result: Array<{
      utime: number;
      data: string;
      transaction_id: {
         hash: string;
      };
      out_msgs: Array<{
         hash: string;
         source: string;
         destination: string;
         value: string;
         message: string;
      }>;
   }>;
}

// Recipient TON address from environment variable
const RECIPIENT_ADDRESS = process.env.NEXT_PUBLIC_TON_RECIPIENT_ADDRESS;
const BASE_API_URL = process.env.TON_API_URL;

/**
 * Fetches transaction details from TON blockchain
 * @param senderAddress - Sender address to verify
 */
async function verifyTonTransaction(senderAddress: string) {
   try {
      const response = await fetch(
         `${BASE_API_URL}/api/v2/getTransactions?address=${senderAddress}&limit=3`,
         {
            method: "GET",
            headers: {
               Accept: "application/json",
            },
         }
      );

      if (!response.ok) {
         throw new Error(`TON API error: ${response.status}`);
      }

      const data: TonCenterResponse = await response.json();

      if (!data.ok) {
         throw new Error("Invalid response from TON API");
      }

      if (!RECIPIENT_ADDRESS) {
         throw new Error("Recipient address is not set");
      }

      // Import TON utilities dynamically
      const { parseTonAddress } = await import("@/lib/ton-utils");

      const sender = await parseTonAddress(senderAddress);
      const recipient = await parseTonAddress(RECIPIENT_ADDRESS);
      const transaction = data.result.find(
         (t) =>
            t.out_msgs[0]?.source === sender &&
            t.out_msgs[0]?.destination === recipient
      );

      if (!transaction) {
         throw new Error("Transaction not found");
      }

      const resultSender = transaction.out_msgs[0].source;
      const resultRecipient = transaction.out_msgs[0].destination;

      if (resultSender !== sender || resultRecipient !== recipient) {
         throw new Error("Transaction is not valid");
      }

      const transactionHash = transaction.transaction_id.hash;
      const value = transaction.out_msgs[0].value;
      const message = transaction.out_msgs[0].message;

      return {
         success: true,
         data: {
            transactionHash,
            value,
            message,
         },
      };
   } catch (error) {
      return {
         success: false,
         error:
            error instanceof Error
               ? error.message
               : "Failed to verify transaction",
      };
   }
}

/**
 * Calculate diff tolerance
 *
 * @param tonPrice - Ton price
 * @param valueReceived - Value received
 * @param usdAmount - USD amount
 * @returns Diff percentage
 */
async function calculateDiffTolerance(
   tonPrice: number,
   valueReceived: bigint,
   usdAmount: number
) {
   // Import TON utilities dynamically
   const { fromNano } = await import("@/lib/ton-utils");

   const tonTarget = usdAmount / tonPrice;
   const tonReceived = await fromNano(valueReceived);
   const diff = tonTarget / parseFloat(tonReceived.toString());
   const diffPercentage = Number(((diff - 1) * 100).toFixed(2));
   return diffPercentage;
}

export async function GET(request: NextRequest) {
   try {
      const { searchParams } = new URL(request.url);
      const packageCode = searchParams.get("sku");
      const senderAddress = searchParams.get("senderAddress");

      if (!senderAddress) {
         return NextResponse.json(
            { error: "Sender address is required" },
            { status: 400 }
         );
      }

      const trimmedSenderAddress = senderAddress.trim();
      const result = await verifyTonTransaction(trimmedSenderAddress);

      if (!result.success) {
         return NextResponse.json(
            { error: result.error || "Failed to verify transaction" },
            { status: 500 }
         );
      }
      const paymentHistoryRecord = await db
         .select()
         .from(paymentHistory)
         .where(eq(paymentHistory.referenceId, result.data?.message || ""))
         .limit(1);

      if (paymentHistoryRecord.length === 0) {
         return NextResponse.json(
            { error: "Payment history not found" },
            { status: 404 }
         );
      }

      const paymentHistoryData = paymentHistoryRecord[0];
      const tonPrice = await getCachedTonPrice();
      const diffPercentage = await calculateDiffTolerance(
         tonPrice,
         BigInt(result.data?.value || "0"),
         paymentHistoryData.amount || 0
      );

      if (diffPercentage > 3) {
         return NextResponse.json({
            success: false,
            message:
               "Ton transaction verification failed, amount is not correct",
         });
      }

      const tonHistoryRecord = await db
         .select()
         .from(tonHistory)
         .where(eq(tonHistory.hash, result.data?.transactionHash || ""))
         .limit(1);

      if (tonHistoryRecord.length > 0) {
         return NextResponse.json(
            { error: "Ton history already exists" },
            { status: 400 }
         );
      }

      await db.insert(tonHistory).values({
         hash: result.data?.transactionHash || "",
         nanoTon: BigInt(parseInt(result.data?.value || "0") || 0),
         senderAddress: trimmedSenderAddress,
      });

      // for TOPUP type, update user balance
      if (paymentHistoryData.paymentType === "TOPUP") {
         // Get user's balance
         const userRecord = await db
            .select({ balanceId: user.balanceId })
            .from(user)
            .where(eq(user.telegramId, paymentHistoryData.telegramId))
            .limit(1);

         if (userRecord.length > 0) {
            await db
               .update(balance)
               .set({
                  amount: sql`${balance.amount} + ${paymentHistoryData.amount}`,
               })
               .where(eq(balance.id, userRecord[0].balanceId));
         }
      }

      if (paymentHistoryData.paymentType === "ORDER") {
         try {
            await orderEsim(
               packageCode || "",
               paymentHistoryData.telegramId,
               paymentHistoryData.amount,
               result.data?.transactionHash || ""
            );
         } catch (error) {
            if (error instanceof Error) {
               await db
                  .update(paymentHistory)
                  .set({ status: "FAILED" })
                  .where(eq(paymentHistory.id, paymentHistoryData.id));
            }

            return NextResponse.json(
               {
                  success: false,
                  error: "Failed to order eSIM",
                  message:
                     error instanceof Error ? error.message : "Unknown error",
               },
               { status: 500 }
            );
         }
      }

      // Update paymentHistory with packageCode if provided and missing
      const updateData: any = {
         status: "COMPLETED",
         orderNo: result.data?.transactionHash || "",
      };
      
      if (packageCode && (!paymentHistoryData.packageCode || paymentHistoryData.packageCode === "-")) {
         updateData.packageCode = packageCode;
      }

      await db
         .update(paymentHistory)
         .set(updateData)
         .where(eq(paymentHistory.id, paymentHistoryData.id));

      return NextResponse.json({
         success: true,
         message: "Ton transaction verified successfully",
      });
   } catch (error) {
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}
