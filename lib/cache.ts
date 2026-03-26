import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
   url: process.env.UPSTASH_REDIS_REST_URL!,
   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache keys
const CACHE_KEYS = {
   PAYPAL_ACCESS_TOKEN: "paypal:access_token",
} as const;

// Cache TTL in seconds (8 hours = 8 * 60 * 60 = 28800 seconds)
const PAYPAL_TOKEN_TTL = 8 * 60 * 60; // 8 hours

export interface CachedToken {
   access_token: string;
   token_type: string;
   expires_in: number;
   cached_at: number;
}

/**
 * Get cached PayPal access token
 */
export async function getCachedPayPalToken(): Promise<string | null> {
   try {
      const cached = await redis.get<CachedToken>(
         CACHE_KEYS.PAYPAL_ACCESS_TOKEN
      );

      if (!cached) {
         return null;
      }

      // Check if token is still valid (with 5-minute buffer)
      const now = Date.now();
      const tokenAge = now - cached.cached_at;
      const maxAge = (cached.expires_in - 300) * 1000; // 5 minutes buffer

      if (tokenAge > maxAge) {
         // Token is expired, remove from cache
         await redis.del(CACHE_KEYS.PAYPAL_ACCESS_TOKEN);
         return null;
      }

      return cached.access_token;
   } catch (error) {
      return null;
   }
}

/**
 * Cache PayPal access token
 */
export async function setCachedPayPalToken(tokenData: {
   access_token: string;
   token_type: string;
   expires_in: number;
}): Promise<void> {
   try {
      const cachedToken: CachedToken = {
         ...tokenData,
         cached_at: Date.now(),
      };

      await redis.setex(
         CACHE_KEYS.PAYPAL_ACCESS_TOKEN,
         PAYPAL_TOKEN_TTL,
         JSON.stringify(cachedToken)
      );
   } catch (error) {
      // Silent error handling
   }
}

/**
 * Clear cached PayPal access token
 */
export async function clearCachedPayPalToken(): Promise<void> {
   try {
      await redis.del(CACHE_KEYS.PAYPAL_ACCESS_TOKEN);
   } catch (error) {
      // Silent error handling
   }
}

export { redis };
