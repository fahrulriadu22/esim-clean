import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory, user, balance } from "@/database/schema";
import { eq, and, sql } from "drizzle-orm";
import { orderEsim } from "@/utils/esim-api";

/**
 * Universal Telegram webhook handler
 * Handles various commands, payments, and bot interactions
 */

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

// Bot commands and responses
const BOT_COMMANDS = {
   start: {
      photo: `${
         process.env.NEXT_PUBLIC_APP_URL || "https://your-app-url.com"
      }/banner.png`,
      caption: `**Your Roamwi is ready**\nNow you can buy and activate eSIMs instantly, all inside Telegram.`,
      parse_mode: "Markdown",
      keyboard: {
         inline_keyboard: [
            [
               {
                  text: "🚀 Open App",
                  web_app: {
                     url:
                        process.env.NEXT_PUBLIC_APP_URL ||
                        "https://your-app-url.com",
                  },
               },
            ],
         ],
      },
   },
   help: {
      message: `🆘 **Help & Support**

**How to use the app:**
1. Click "Open App" to access the web interface
2. Browse available eSIM packages
3. Select your preferred payment method
4. Complete your purchase

**Payment Methods:**
• **Telegram Stars** - Fast and secure
• **PayPal** - Traditional payment
• **TON** - Cryptocurrency option

**Available Commands:**
• /start - Welcome message
• /help - This help message
• /balance - Check your account balance

**Common Issues:**
• Can't access app? Try refreshing
• Payment issues? Contact support
• eSIM not working? Check setup guide`,
      keyboard: {
         inline_keyboard: [
            [
               {
                  text: "🚀 Open App",
                  web_app: {
                     url:
                        process.env.NEXT_PUBLIC_APP_URL ||
                        "https://your-app-url.com",
                  },
               },
            ],
         ],
      },
   },
};

// Handle different types of updates
async function handleUpdate(update: any) {
   try {
      // Handle messages
      if (update.message) {
         await handleMessage(update.message);
      }

      // Handle callback queries (button clicks)
      if (update.callback_query) {
         await handleCallbackQuery(update.callback_query);
      }

      // Handle pre-checkout queries (payment validation)
      if (update.pre_checkout_query) {
         await handlePreCheckoutQuery(update.pre_checkout_query);
      }

      // Handle successful payments
      if (update.message?.successful_payment) {
         await handleSuccessfulPayment(update.message);
      }
   } catch (error) {
      console.error("Error handling update:", error);
   }
}

// Handle text messages and commands
async function handleMessage(message: any) {
   const chatId = message.chat.id;
   const text = message.text;

   if (!text) return;

   // Handle commands
   if (text.startsWith("/")) {
      const command = text.split(" ")[0].toLowerCase();

      switch (command) {
         case "/start":
            await sendCommandResponse(chatId, BOT_COMMANDS.start);
            break;

         case "/help":
            await sendCommandResponse(chatId, BOT_COMMANDS.help);
            break;

         case "/balance":
            await handleBalanceCommand(chatId, message.from.id);
            break;

         default:
            await telegramApiRequest("sendMessage", {
               chat_id: chatId,
               text: "❓ Unknown command. Use /help to see available commands.",
            });
      }
   } else {
      // Handle regular text messages
      await telegramApiRequest("sendMessage", {
         chat_id: chatId,
         text: "👋 Hi! Use /start to begin or /help for assistance.",
      });
   }
}

// Handle callback queries (button clicks)
async function handleCallbackQuery(callbackQuery: any) {
   const chatId = callbackQuery.message.chat.id;
   const data = callbackQuery.data;

   // Simple callback handling for app opening
   if (data === "open_app") {
      await telegramApiRequest("answerCallbackQuery", {
         callback_query_id: callbackQuery.id,
         text: "🚀 Opening app...",
      });
   } else {
      await telegramApiRequest("answerCallbackQuery", {
         callback_query_id: callbackQuery.id,
         text: "✅ Action completed",
      });
   }
}

// Handle pre-checkout queries (payment validation)
async function handlePreCheckoutQuery(preCheckoutQuery: any) {
   const { id, from, currency, total_amount, invoice_payload } =
      preCheckoutQuery;

   // Validate the payment details
   if (currency !== "XTR") {
      await telegramApiRequest("answerPreCheckoutQuery", {
         pre_checkout_query_id: id,
         ok: false,
         error_message:
            "Invalid currency. Only Telegram Stars (XTR) are accepted.",
      });
      return;
   }

   // Here you can add additional validation logic
   // For now, we'll approve all valid Stars payments
   await telegramApiRequest("answerPreCheckoutQuery", {
      pre_checkout_query_id: id,
      ok: true,
   });
}

// Handle successful payments
async function handleSuccessfulPayment(message: any) {
   const chatId = message.chat.id;
   const successfulPayment = message.successful_payment;
   const {
      currency,
      total_amount,
      invoice_payload,
      telegram_payment_charge_id,
      provider_payment_charge_id,
   } = successfulPayment;

   if (currency !== "XTR") {
      await telegramApiRequest("sendMessage", {
         chat_id: chatId,
         text: "❌ Invalid currency. Payment rejected.",
      });
      return;
   }

   try {
      // Find the payment record using the invoice payload (referenceId)
      const paymentHistoryRecord = await db
         .select()
         .from(paymentHistory)
         .where(
            and(
               eq(paymentHistory.referenceId, invoice_payload),
               eq(paymentHistory.status, "PENDING")
            )
         )
         .limit(1);

      if (paymentHistoryRecord.length === 0) {
         await telegramApiRequest("sendMessage", {
            chat_id: chatId,
            text: "❌ Payment record not found. Please contact support.",
         });
         return;
      }

      const paymentHistoryData = paymentHistoryRecord[0];

      // Verify the amount matches
      // Convert USD to Stars: 1 USD = 1 / 0.018 = ~55.56 Stars
      const expectedAmount = Math.ceil(
         paymentHistoryData.amount /
            (process.env.STARS_RATE as unknown as number)
      );
      const receivedAmount = total_amount;

      if (Math.abs(expectedAmount - receivedAmount) > 0.01) {
         await telegramApiRequest("sendMessage", {
            chat_id: chatId,
            text: "❌ Amount mismatch. Payment rejected.",
         });
         return;
      }

      // Update payment status
      await db
         .update(paymentHistory)
         .set({
            status: "COMPLETED",
            orderNo: telegram_payment_charge_id || provider_payment_charge_id,
         })
         .where(eq(paymentHistory.id, paymentHistoryData.id));

      // Handle different payment types
      if (paymentHistoryData.paymentType === "TOPUP") {
         // Update user balance
         const userRecord = await db
            .select({ balanceId: user.balanceId })
            .from(user)
            .where(eq(user.id, paymentHistoryData.userId!))
            .limit(1);

         if (userRecord.length > 0) {
            await db
               .update(balance)
               .set({
                  amount: sql`${balance.amount} + ${paymentHistoryData.amount}`,
               })
               .where(eq(balance.id, userRecord[0].balanceId));
         }

         await telegramApiRequest("sendMessage", {
            chat_id: chatId,
            text: `✅ Payment successful! Your balance has been topped up with $${paymentHistoryData.amount}.`,
         });
      } else if (paymentHistoryData.paymentType === "ORDER") {
         // Handle eSIM order
         try {
            await orderEsim(
               paymentHistoryData.orderNo || "",
               paymentHistoryData.telegramId,
               paymentHistoryData.amount,
               paymentHistoryData.referenceId || ""
            );

            await telegramApiRequest("sendMessage", {
               chat_id: chatId,
               text: `✅ Payment successful! Your eSIM is being prepared and will be available shortly.`,
            });
         } catch (error: any) {
            console.error("Error ordering eSIM:", error.message);
            // If eSIM ordering fails, mark payment as failed
            await db
               .update(paymentHistory)
               .set({ status: "FAILED" })
               .where(eq(paymentHistory.id, paymentHistoryData.id));

            await telegramApiRequest("sendMessage", {
               chat_id: chatId,
               text: "❌ Failed to process eSIM order. Please contact support.",
            });
         }
      }
   } catch (error) {
      console.error("Error processing payment:", error);
      await telegramApiRequest("sendMessage", {
         chat_id: chatId,
         text: "❌ An error occurred processing your payment. Please contact support.",
      });
   }
}

// Send command response with keyboard
async function sendCommandResponse(chatId: number, command: any) {
   if (command.photo) {
      // Send photo with caption and keyboard
      await telegramApiRequest("sendPhoto", {
         chat_id: chatId,
         photo: command.photo,
         caption: command.caption,
         parse_mode: command.parse_mode,
         reply_markup: command.keyboard,
      });
   } else {
      // Send regular message
      await telegramApiRequest("sendMessage", {
         chat_id: chatId,
         text: command.message,
         parse_mode: "Markdown",
         reply_markup: command.keyboard,
      });
   }
}

// Handle balance command
async function handleBalanceCommand(chatId: number, userId: number) {
   try {
      const userRecord = await db
         .select({
            id: user.id,
            balanceId: user.balanceId,
         })
         .from(user)
         .where(eq(user.telegramId, userId.toString()))
         .limit(1);

      if (userRecord.length === 0) {
         await telegramApiRequest("sendMessage", {
            chat_id: chatId,
            text: "❌ User not found. Please use /start to register.",
         });
         return;
      }

      const userData = userRecord[0];
      const balanceRecord = await db
         .select({ amount: balance.amount })
         .from(balance)
         .where(eq(balance.id, userData.balanceId))
         .limit(1);

      const userBalance =
         balanceRecord.length > 0 ? balanceRecord[0].amount : 0;
      await telegramApiRequest("sendMessage", {
         chat_id: chatId,
         text: `💰 Your current balance: $${userBalance.toFixed(
            2
         )}\n\n💡 Use the app to top up your balance or purchase eSIMs.`,
         reply_markup: {
            inline_keyboard: [
               [
                  {
                     text: "🚀 Open App",
                     web_app: {
                        url:
                           process.env.NEXT_PUBLIC_APP_URL ||
                           "https://your-app-url.com",
                     },
                  },
               ],
            ],
         },
      });
   } catch (error) {
      console.error("Error fetching balance:", error);
      await telegramApiRequest("sendMessage", {
         chat_id: chatId,
         text: "❌ Error fetching balance. Please try again later.",
      });
   }
}

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();

      // Handle the update
      await handleUpdate(body);

      return NextResponse.json({ ok: true });
   } catch (error) {
      console.error("Telegram webhook error:", error);
      return NextResponse.json({
         ok: false,
         error: "Internal server error",
      });
   }
}
