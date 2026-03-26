#!/usr/bin/env node

/**
 * Script to set up Telegram webhook
 * Usage: node scripts/set-webhook.js <webhook-url>
 */

const https = require("https");
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_KEY;
const WEBHOOK_URL = process.argv[2];

if (!BOT_TOKEN) {
   console.error("❌ Error: BOT_KEY environment variable is not set");
   process.exit(1);
}

if (!WEBHOOK_URL) {
   console.error("❌ Error: Webhook URL is required");
   console.log("Usage: node scripts/set-webhook.js <webhook-url>");
   console.log(
      "Example: node scripts/set-webhook.js https://your-domain.com/api/webhook/telegram"
   );
   process.exit(1);
}

async function setWebhook() {
   const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;

   const postData = JSON.stringify({
      url: WEBHOOK_URL,
      allowed_updates: ["message", "callback_query", "pre_checkout_query"],
   });

   const options = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Content-Length": Buffer.byteLength(postData),
      },
   };

   const req = https.request(url, options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
         data += chunk;
      });

      res.on("end", () => {
         try {
            const response = JSON.parse(data);
            if (response.ok) {
               console.log("✅ Webhook set successfully!");
            } else {
               console.error("❌ Failed to set webhook:", response.description);
            }
         } catch (error) {
            console.error("❌ Error parsing response:", error);
         }
      });
   });

   req.on("error", (error) => {
      console.error("❌ Request error:", error);
   });

   req.write(postData);
   req.end();
}

async function getWebhookInfo() {
   const url = `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`;

   const req = https.request(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
         data += chunk;
      });

      res.on("end", () => {
         try {
            const response = JSON.parse(data);
            if (response.ok) {
               console.log("\n📊 Current Webhook Info:");
               console.log(`📍 URL: ${response.result.url || "Not set"}`);
               console.log(
                  `📊 Pending updates: ${
                     response.result.pending_update_count || 0
                  }`
               );
               console.log(
                  `🕐 Last error date: ${
                     response.result.last_error_date || "None"
                  }`
               );
               console.log(
                  `❌ Last error: ${
                     response.result.last_error_message || "None"
                  }`
               );
            } else {
               console.error(
                  "❌ Failed to get webhook info:",
                  response.description
               );
            }
         } catch (error) {
            console.error("❌ Error parsing response:", error);
         }
      });
   });

   req.on("error", (error) => {
      console.error("❌ Request error:", error);
   });

   req.end();
}

async function main() {
   console.log("🤖 Setting up Telegram webhook...");
   console.log(`🔗 Webhook URL: ${WEBHOOK_URL}`);

   await setWebhook();
   await getWebhookInfo();
}

main().catch(console.error);
