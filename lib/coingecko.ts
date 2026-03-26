/**
 * CoinGecko API utility functions for fetching cryptocurrency prices
 */

export interface CoinGeckoPrice {
   usd: number;
}

export interface CoinGeckoResponse {
   "the-open-network": CoinGeckoPrice;
}

/**
 * Fetches the current TON price in USD from CoinGecko API
 * @returns Promise<number> - TON price in USD
 */
export async function getTonPrice(): Promise<number> {
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

      const data: CoinGeckoResponse = await response.json();

      if (!data["the-open-network"]?.usd) {
         throw new Error("Invalid response from CoinGecko API");
      }

      return data["the-open-network"].usd;
   } catch (error) {
      throw new Error("Failed to fetch TON price. Please try again.");
   }
}

/**
 * Converts USD amount to TON equivalent
 * @param usdAmount - Amount in USD
 * @returns Promise<number> - TON equivalent
 */
export async function convertUsdToTon(usdAmount: number): Promise<number> {
   const tonPrice = await getTonPrice();
   return usdAmount / tonPrice;
}

/**
 * Converts TON amount to USD equivalent
 * @param tonAmount - Amount in TON
 * @returns Promise<number> - USD equivalent
 */
export async function convertTonToUsd(tonAmount: number): Promise<number> {
   const tonPrice = await getTonPrice();
   return tonAmount * tonPrice;
}
