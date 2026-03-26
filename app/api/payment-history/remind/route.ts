import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory } from "@/database/schema";
import { eq, and, lt } from "drizzle-orm";

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

export async function GET() {
   try {
      // Calculate the timestamp for 20 minutes ago
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      // Find pending paymentHistory records older than 20 minutes
      const pendingPayments = await db
         .select()
         .from(paymentHistory)
         .where(
            and(
               eq(paymentHistory.status, "PENDING"),
               lt(paymentHistory.createdAt, oneHourAgo)
            )
         );

      if (pendingPayments.length === 0) {
         return NextResponse.json({
            success: true,
            message: "No pending payments to remind",
            remindersSent: 0,
         });
      }

      const appUrl =
         process.env.NEXT_PUBLIC_APP_URL || "https://your-app-url.com";

      // Send reminders to each user
      const reminderResults = await Promise.allSettled(
         pendingPayments.map(async (payment) => {
            const chatId = parseInt(payment.telegramId);

            // Skip if telegramId is not a valid number
            if (isNaN(chatId)) {
               return {
                  success: false,
                  paymentId: payment.id,
                  referenceId: payment.referenceId,
                  telegramId: payment.telegramId,
                  error: "Invalid telegramId",
               };
            }

            const amount = payment.amount;
            const paymentMethod = payment.paymentMethod || "payment";
            const paymentType =
               payment.paymentType === "TOPUP" ? "top-up" : "eSIM purchase";

            const message = `⏰ **Payment Reminder**

You have a pending ${paymentType} of $${amount.toFixed(
               2
            )} via ${paymentMethod} that hasn't been completed yet.

Please complete your payment to continue with your transaction.

Reference ID: \`${payment.referenceId}\``;

            try {
               await telegramApiRequest("sendMessage", {
                  chat_id: chatId,
                  text: message,
                  parse_mode: "Markdown",
                  reply_markup: {
                     inline_keyboard: [
                        [
                           {
                              text: "🚀 Open App",
                              web_app: {
                                 url: appUrl,
                              },
                           },
                        ],
                     ],
                  },
               });

               return {
                  success: true,
                  paymentId: payment.id,
                  referenceId: payment.referenceId,
                  telegramId: payment.telegramId,
               };
            } catch (error) {
               console.error(
                  `Failed to send reminder for payment ${payment.id}:`,
                  error
               );
               return {
                  success: false,
                  paymentId: payment.id,
                  referenceId: payment.referenceId,
                  telegramId: payment.telegramId,
                  error: error instanceof Error ? error.message : String(error),
               };
            }
         })
      );

      const successful = reminderResults.filter(
         (result) => result.status === "fulfilled" && result.value.success
      ).length;
      const failed = reminderResults.length - successful;

      return NextResponse.json({
         success: true,
         message: "Payment reminders sent",
         totalPending: pendingPayments.length,
         remindersSent: successful,
         remindersFailed: failed,
         results: reminderResults.map((result) =>
            result.status === "fulfilled"
               ? result.value
               : { error: result.reason }
         ),
      });
   } catch (error) {
      console.error("Error sending payment reminders:", error);
      return NextResponse.json(
         {
            success: false,
            message: "Failed to send payment reminders",
            error: error instanceof Error ? error.message : String(error),
         },
         { status: 500 }
      );
   }
}
