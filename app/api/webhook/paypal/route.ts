import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
const crc32 = require("buffer-crc32");
import { db } from "@/database/drizzle";
import { paymentHistory, user, balance } from "@/database/schema";
import { eq } from "drizzle-orm";
import { orderEsim } from "@/utils/esim-api";

interface PayPalWebhookEvent {
   id: string;
   event_type: string;
   create_time: string;
   resource: {
      id: string;
      status: string;
      purchase_units: Array<{
         amount: {
            currency_code: string;
            value: string;
         };
         items: Array<{
            sku: string;
         }>;
         invoice_id: string;
      }>;
      payer: {
         email_address: string;
         payer_id: string;
      };
   };
}

// PayPal webhook signature verification
async function verifySignature(
   event: string,
   headers: Headers
): Promise<boolean> {
   try {
      const transmissionId = headers.get("paypal-transmission-id");
      const timeStamp = headers.get("paypal-transmission-time");
      const certUrl = headers.get("paypal-cert-url");
      const transmissionSig = headers.get("paypal-transmission-sig");
      const webhookId = process.env.PAYPAL_WEBHOOK_ID;

      if (
         !transmissionId ||
         !timeStamp ||
         !certUrl ||
         !transmissionSig ||
         !webhookId
      ) {
         return false;
      }

      // Calculate CRC32 of raw event data using buffer-crc32 package
      const crc = parseInt("0x" + crc32(Buffer.from(event)).toString("hex"));

      // Create the message to verify
      const message = `${transmissionId}|${timeStamp}|${webhookId}|${crc}`;

      // Download the certificate (no caching)
      const response = await fetch(certUrl);
      const certPem = await response.text();

      // Create buffer from base64-encoded signature
      const signatureBuffer = Buffer.from(transmissionSig, "base64");

      // Create a verification object
      const verifier = crypto.createVerify("SHA256");

      // Add the original message to the verifier
      verifier.update(message);

      // Verify the signature
      const isValid = verifier.verify(certPem, signatureBuffer);
      return isValid;
   } catch (error) {
      return false;
   }
}

export async function POST(request: NextRequest) {
   try {
      // Get the raw body for signature verification
      const body = await request.text();

      // Verify PayPal webhook signature
      const isSignatureValid = await verifySignature(body, request.headers);

      if (!isSignatureValid) {
         return NextResponse.json(
            {
               success: false,
               error: "Invalid webhook signature",
               message: "Webhook signature verification failed",
            },
            { status: 401 }
         );
      }

      const parsedBody: PayPalWebhookEvent = JSON.parse(body);

      // Handle order approved event
      if (parsedBody.event_type === "CHECKOUT.ORDER.APPROVED") {
         const paymentHistoryRecord = await db
            .select()
            .from(paymentHistory)
            .where(
               eq(
                  paymentHistory.referenceId,
                  parsedBody.resource.purchase_units[0]?.invoice_id
               )
            )
            .limit(1);

         // Update payment history
         if (paymentHistoryRecord.length > 0) {
            const paymentHistoryData = paymentHistoryRecord[0];

            await db
               .update(paymentHistory)
               .set({
                  status: "COMPLETED",
                  payerEmail: parsedBody.resource.payer.email_address,
               })
               .where(eq(paymentHistory.id, paymentHistoryData.id));

            if (paymentHistoryData.paymentType === "TOPUP") {
               // Update balance
               const userRecord = await db
                  .select({ balanceId: user.balanceId })
                  .from(user)
                  .where(eq(user.telegramId, paymentHistoryData.telegramId))
                  .limit(1);

               if (userRecord.length > 0) {
                  const currentBalance = await db
                     .select({ amount: balance.amount })
                     .from(balance)
                     .where(eq(balance.id, userRecord[0].balanceId))
                     .limit(1);

                  if (currentBalance.length > 0) {
                     await db
                        .update(balance)
                        .set({
                           amount:
                              currentBalance[0].amount +
                              paymentHistoryData.amount,
                        })
                        .where(eq(balance.id, userRecord[0].balanceId));
                  }
               }
            }

            if (paymentHistoryData.paymentType === "ORDER") {
               try {
                  const ordered = await orderEsim(
                     parsedBody.resource.purchase_units[0]?.items[0]?.sku,
                     paymentHistoryData.telegramId,
                     paymentHistoryData.amount,
                     parsedBody.resource.purchase_units[0]?.invoice_id
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
                           error instanceof Error
                              ? error.message
                              : "Unknown error",
                     },
                     { status: 500 }
                  );
               }
            }
         }
      }

      // Return success response
      return NextResponse.json(
         {
            success: true,
            message: "PayPal webhook processed successfully",
         },
         { status: 200 }
      );
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: "Internal server error",
            message:
               error instanceof Error
                  ? error.message
                  : "Unknown error occurred",
            timestamp: new Date().toISOString(),
         },
         { status: 500 }
      );
   }
}
