import { v4 as uuidv4 } from "uuid";
import {
   getCachedPayPalToken,
   setCachedPayPalToken,
   clearCachedPayPalToken,
} from "@/lib/cache";

interface PaypalOrderResponse {
   id: string;
   status: string;
   links: {
      href: string;
      rel: string;
   }[];
}

export async function getAccessToken() {
   try {
      // First, try to get cached token
      const cachedToken = await getCachedPayPalToken();
      if (cachedToken) {
         return cachedToken;
      }

      // If no cached token, fetch new one from PayPal
      const formData = new URLSearchParams();
      formData.append("grant_type", "client_credentials");

      const response = await fetch(
         process.env.PAYPAL_API_URL + "/v1/oauth2/token" || "",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
               Authorization:
                  "Basic " +
                  Buffer.from(
                     (process.env.PAYPAL_CLIENT_ID || "") +
                        ":" +
                        (process.env.PAYPAL_SECRET || "")
                  ).toString("base64"),
            },
            body: formData.toString(),
         }
      );

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Cache the new token
      await setCachedPayPalToken({
         access_token: data.access_token,
         token_type: data.token_type,
         expires_in: data.expires_in,
      });

      return data.access_token;
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export async function createOrder(
   accessToken: string,
   transactionId: string,
   amount: number,
   sku: string = "topup-001"
): Promise<PaypalOrderResponse | null> {
   try {
      const response = await fetch(
         process.env.PAYPAL_API_URL + "/v2/checkout/orders",
         {
            method: "POST",
            headers: {
               Authorization: "Bearer " + accessToken,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               intent: "CAPTURE",
               payment_source: {
                  paypal: {
                     experience_context: {
                        payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                        landing_page: "LOGIN",
                        shipping_preference: "NO_SHIPPING",
                        user_action: "PAY_NOW",
                        return_url:
                           process.env.NEXT_PUBLIC_APP_URL + "/paypal/success",
                        cancel_url:
                           process.env.NEXT_PUBLIC_APP_URL + "/paypal/cancel",
                     },
                  },
               },
               purchase_units: [
                  {
                     invoice_id: transactionId,
                     amount: {
                        currency_code: "USD",
                        value: amount.toString(),
                        breakdown: {
                           item_total: {
                              currency_code: "USD",
                              value: amount.toString(),
                           },
                        },
                     },
                     items: [
                        {
                           name: "Roamwi Topup",
                           description: "Roamwi eSIM Data Topup",
                           unit_amount: {
                              currency_code: "USD",
                              value: amount.toString(),
                           },
                           quantity: "1",
                           category: "DIGITAL_GOODS",
                           sku,
                        },
                     ],
                  },
               ],
            }),
         }
      );

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as PaypalOrderResponse;
   } catch (error: any) {
      console.error(error);
      return null;
   }
}

/**
 * Clear cached PayPal access token (useful for debugging or manual cache invalidation)
 */
export async function clearPayPalTokenCache() {
   try {
      await clearCachedPayPalToken();
   } catch (error) {
      throw error;
   }
}
