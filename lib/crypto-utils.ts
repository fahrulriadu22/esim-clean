import { createHmac } from "crypto";

/**
 * Verify the Telegram Web App data
 * AMAN UNTUK BUILD TIME
 */
export const verifyTelegramWebAppData = (telegramInitData: string): boolean => {
   // BUILD TIME: return false (bukan error)
   if (!telegramInitData || typeof telegramInitData !== 'string' || telegramInitData.trim() === '') {
      return false;
   }

   const TELEGRAM_BOT_TOKEN = process.env.BOT_KEY;
   if (!TELEGRAM_BOT_TOKEN) {
      return false;
   }

   try {
      const initData = new URLSearchParams(telegramInitData);
      const hash = initData.get("hash");
      const authDate = initData.get("auth_date");

      if (!hash || !authDate) {
         return false;
      }

      const dataToCheck: string[] = [];
      const entries = Array.from(initData.entries()).sort(([keyA], [keyB]) => 
         keyA.localeCompare(keyB)
      );

      for (const [key, val] of entries) {
         if (key !== "hash") {
            dataToCheck.push(`${key}=${val}`);
         }
      }

      const secret = createHmac("sha256", "WebAppData")
         .update(TELEGRAM_BOT_TOKEN)
         .digest();

      const _hash = createHmac("sha256", secret)
         .update(dataToCheck.join("\n"))
         .digest("hex");

      const authTimestamp = parseInt(authDate) * 1000;
      const currentTime = Date.now();
      const timeDiff = (currentTime - authTimestamp) / 1000;

      // Allow 24 hours
      const isValidTime = timeDiff < 86400 && timeDiff > 0;

      return hash === _hash && isValidTime;
   } catch (error) {
      // LOG ONLY, TIDAK THROW ERROR
      console.error('Verify Telegram data failed (safe):', error);
      return false;
   }
};
