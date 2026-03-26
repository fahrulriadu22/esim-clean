import {
   extractUserData,
   UserData,
} from "@/lib/utils";
import { verifyTelegramWebAppData } from "@/lib/crypto-utils";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { user, balance } from "@/database/schema";
import { eq } from "drizzle-orm";
import { applyRateLimit } from "@/lib/rate-limiter";

export async function POST(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(request, "/api/init-user");
   if (rateLimitResponse) {
      return rateLimitResponse;
   }

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

   try {
      const existingUser = await db
         .select()
         .from(user)
         .where(eq(user.telegramId, extractedUserData.id.toString()))
         .limit(1);

      if (existingUser.length === 0) {
         // Create new user with balance
         const newBalance = await db
            .insert(balance)
            .values({
               amount: 0,
            })
            .returning({ id: balance.id });

         await db.insert(user).values({
            telegramId: extractedUserData.id.toString(),
            username: extractedUserData.username || "null",
            fullName:
               extractedUserData.first_name ||
               "-" + extractedUserData.last_name ||
               "",
            photoUrl: extractedUserData.photo_url || "",
            languageCode: extractedUserData.language_code || "",
            balanceId: newBalance[0].id,
         });
      } else {
         // Update existing user
         await db
            .update(user)
            .set({
               username: extractedUserData.username || "null",
               fullName:
                  extractedUserData.first_name ||
                  "-" + extractedUserData.last_name ||
                  "",
               photoUrl: extractedUserData.photo_url || "",
               languageCode: extractedUserData.language_code || "",
            })
            .where(eq(user.telegramId, extractedUserData.id.toString()));
      }
   } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
         { message: "Database error occurred" },
         { status: 500 }
      );
   }

   return NextResponse.json({ message: "User initialized" });
}
