import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
   url: process.env.UPSTASH_REDIS_REST_URL!,
   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const TON_PRICE_CACHE_KEY = "ton_price_usd";
const CACHE_TTL = 300; // 5 minutes in seconds

export interface TonPriceData {
   price: number;
   timestamp: number;
}

/**
 * Gets TON price from cache or fetches from API if cache is expired
 * @returns Promise<number> - TON price in USD
 */
export async function getCachedTonPrice(): Promise<number> {
   try {
      // Try to get from cache first
      const cachedData = await redis.get<TonPriceData>(TON_PRICE_CACHE_KEY);

      if (cachedData && isCacheValid(cachedData)) {
         return cachedData.price;
      }
      const freshPrice = await fetchTonPriceFromAPI();

      // Cache the new price
      await cacheTonPrice(freshPrice);

      return freshPrice;
   } catch (error) {
      // If Redis fails, try to get from cache as fallback
      try {
         const cachedData = await redis.get<TonPriceData>(TON_PRICE_CACHE_KEY);
         if (cachedData) {
            return cachedData.price;
         }
      } catch (cacheError) {
         // Silent error handling
      }

      // If all else fails, fetch directly from API
      return await fetchTonPriceFromAPI();
   }
}

/**
 * Fetches TON price directly from CoinGecko API
 * @returns Promise<number> - TON price in USD
 */
async function fetchTonPriceFromAPI(): Promise<number> {
   try {
      const response = await fetch(
         "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd",
         {
            method: "GET",
            headers: {
               Accept: "application/json",
            },
         }
      );

      if (!response.ok) {
         throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data["the-open-network"]?.usd) {
         throw new Error("Invalid response from CoinGecko API");
      }

      return data["the-open-network"].usd;
   } catch (error) {
      throw new Error("Failed to fetch TON price. Please try again.");
   }
}

/**
 * Caches TON price with timestamp
 * @param price - TON price to cache
 */
async function cacheTonPrice(price: number): Promise<void> {
   try {
      const priceData: TonPriceData = {
         price,
         timestamp: Date.now(),
      };

      await redis.setex(
         TON_PRICE_CACHE_KEY,
         CACHE_TTL,
         JSON.stringify(priceData)
      );
   } catch (error) {
      // Don't throw error here as caching is not critical
   }
}

/**
 * Checks if cached data is still valid (within 5 minutes)
 * @param cachedData - Cached price data
 * @returns boolean - Whether cache is valid
 */
function isCacheValid(cachedData: TonPriceData): boolean {
   const now = Date.now();
   const cacheAge = now - cachedData.timestamp;
   const maxAge = CACHE_TTL * 1000; // Convert to milliseconds

   return cacheAge < maxAge;
}

/**
 * Converts USD amount to TON equivalent using cached price
 * @param usdAmount - Amount in USD
 * @returns Promise<number> - TON equivalent
 */
export async function convertUsdToTonCached(
   usdAmount: number
): Promise<number> {
   const tonPrice = await getCachedTonPrice();
   return usdAmount / tonPrice;
}

/**
 * Converts TON amount to USD equivalent using cached price
 * @param tonAmount - Amount in TON
 * @returns Promise<number> - USD equivalent
 */
export async function convertTonToUsdCached(
   tonAmount: number
): Promise<number> {
   const tonPrice = await getCachedTonPrice();
   return tonAmount * tonPrice;
}

/**
 * Clears the TON price cache (useful for testing or manual refresh)
 */
export async function clearTonPriceCache(): Promise<void> {
   try {
      await redis.del(TON_PRICE_CACHE_KEY);
   } catch (error) {
      // Silent error handling
   }
}
