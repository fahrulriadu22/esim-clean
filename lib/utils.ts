import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import moment from "moment-timezone";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export interface UserData {
   id: number;
   first_name: string;
   last_name?: string;
   username?: string;
   language_code: string;
   is_premium?: boolean;
   photo_url?: string;
}

/**
 * Verify the Telegram Web App data
 */
export const verifyTelegramWebAppData = (telegramInitData: string): boolean => {
   // VALIDASI INPUT - handle undefined/null
   if (!telegramInitData) {
      return false;
   }
   
   if (typeof telegramInitData !== 'string') {
      return false;
   }
   
   if (telegramInitData.trim() === '') {
      return false;
   }

   const TELEGRAM_BOT_TOKEN: string | undefined = process.env.BOT_KEY;
   if (!TELEGRAM_BOT_TOKEN) return false;

   try {
      const initData = new URLSearchParams(telegramInitData);
      const hash = initData.get("hash");
      const authDate: string | null = initData.get("auth_date");

      if (!hash || !authDate) return false;

      const dataToCheck: string[] = [];

      // SORT DULU SEBELUM LOOP
      const entries = Array.from(initData.entries()).sort(([keyA], [keyB]) => 
         keyA.localeCompare(keyB)
      );

      for (const [key, val] of entries) {
         if (key !== "hash") {
            dataToCheck.push(`${key}=${val}`);
         }
      }

      const secret = crypto
         .createHmac("sha256", "WebAppData")
         .update(TELEGRAM_BOT_TOKEN)
         .digest();

      const _hash = crypto
         .createHmac("sha256", secret)
         .update(dataToCheck.join("\n"))
         .digest("hex");

      const timeDiff = moment
         .tz("Asia/Jakarta")
         .diff(moment.unix(parseInt(authDate)).tz("Asia/Jakarta"), "seconds");

      return hash === _hash && timeDiff < 44000 && timeDiff > 0;
   } catch (error) {
      console.error('Error verifying Telegram data:', error);
      return false;
   }
};

/**
 * Extract the user data from the Telegram Web App data
 */
export const extractUserData = (initData: string): UserData | null => {
   // PALING PENTING: Guard untuk build time
   if (!initData || initData === 'undefined' || initData === 'null') {
      return null;
   }
   try {
      // VALIDASI INPUT - handle undefined/null dengan benar
      if (!initData) {
         return null;
      }
      
      if (typeof initData !== 'string') {
         return null;
      }
      
      if (initData.trim() === '') {
         return null;
      }
      
      const split = new URLSearchParams(initData);
      const userStr = split.get("user");
      
      if (!userStr) {
         return null;
      }
      
      // Validasi JSON string
      if (!userStr.startsWith('{') && !userStr.startsWith('[')) {
         return null;
      }
      
      let user;
      try {
         user = JSON.parse(userStr);
      } catch (parseError) {
         // Log untuk debugging
         console.error('JSON parse error:', parseError);
         return null;
      }
      
      // Validasi struktur user
      if (!user || typeof user !== 'object') {
         return null;
      }
      
      // Pastikan field yang diperlukan ada
      if (!user.id || !user.first_name) {
         return null;
      }
      
      return user;
   } catch (error) {
      console.error('Failed to extract user data:', error);
      return null;
   }
};
