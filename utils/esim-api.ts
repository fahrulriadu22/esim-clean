import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/database/drizzle";
import { packageTable, order } from "@/database/schema";
import { eq } from "drizzle-orm";

export const CONFIG = {
   accessCode:
      process.env.ESIM_ACCESS_CODE || "60e4ebbc61fa4ff086d23359fb00e557",
   secretKey: process.env.ESIM_SECRET_KEY || "05875b80a71a43d49b1af5b43b0b7625",
};

export interface ResponseObject {
   success: boolean;
   errorCode: string;
   errorMsg?: string | null;
   obj?: any;
}

/**
 * Generate HMAC-SHA256 signature for the request
 * @param timestamp - Request timestamp in milliseconds
 * @param requestId - Unique request ID
 * @param requestBody - JSON stringified request body
 * @returns Hex string signature
 */
export function generateSignature(
   timestamp: string,
   requestId: string,
   requestBody: string
): string {
   const signData = timestamp + requestId + CONFIG.accessCode + requestBody;

   // Generate HMAC-SHA256 signature
   const signature = crypto
      .createHmac("sha256", CONFIG.secretKey)
      .update(signData)
      .digest("hex");

   return signature;
}

/**
 * Make authenticated request to eSIM Access API
 * @param requestBody - Request body data
 * @returns Promise with API response
 */
export async function makeAuthenticatedRequest(
   url: string,
   requestBody: any = {}
): Promise<any> {
   try {
      // Generate required authentication parameters
      const timestamp = Date.now().toString();
      const requestId = uuidv4();
      const bodyString = JSON.stringify(requestBody);

      // Generate signature
      const signature = generateSignature(timestamp, requestId, bodyString);

      // Prepare headers
      const headers = {
         "Content-Type": "application/json",
         "RT-AccessCode": CONFIG.accessCode,
         "RT-RequestID": requestId,
         "RT-Signature": signature,
         "RT-Timestamp": timestamp,
      };

      // Make the POST request
      const response = await fetch(url, {
         method: "POST",
         headers,
         body: bodyString,
      });

      // Check if response is ok
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse response
      const data: ResponseObject = await response.json();

      if (!data.success) {
         throw new Error(`API error! status: ${data.errorMsg}`);
      }

      return data;
   } catch (error) {
      throw error;
   }
}

async function getPricePackage(packageCode: string) {
   const response = await makeAuthenticatedRequest(
      "https://api.esimaccess.com/api/v1/open/package/list",
      {
         packageCode,
      }
   );

   return response;
}

export async function orderEsim(
   packageCode: string,
   telegramId: string,
   amount: number,
   invoiceId: string
) {
   const packages = await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.code, packageCode))
      .limit(1);

   if (packages.length === 0) {
      throw Error("Package not found");
   }

   const packageData = packages[0];
   if (amount < packageData.price) {
      throw Error("Insufficient balance");
   }

   interface PricePackageResponse {
      success: boolean;
      errorCode: string;
      errorMsg?: string | null;
      obj?: any;
   }
   const result: PricePackageResponse = await getPricePackage(packageCode);
   const amountInCents = result.obj.packageList[0].price;
   // Prepare order data for eSIM Access API
   const orderData = {
      transactionId: invoiceId,
      amount: amountInCents,
      packageInfoList: [
         {
            packageCode: packageCode,
            count: 1,
            price: amountInCents,
         },
      ],
   };
   // Make request to eSIM Access API
   const response = await makeAuthenticatedRequest(
      "https://api.esimaccess.com/api/v1/open/esim/order",
      orderData
   );

   if (!response.success) {
      throw Error("Failed to create order");
   }

   const ordered = await db
      .insert(order)
      .values({
         orderNo: response.obj.orderNo,
         txId: invoiceId,
         amount: amount,
         status: "PENDING",
         paymentMethod: "PAYPAL",
         telegramId: telegramId,
      })
      .returning();

   return ordered[0];
}

export async function getPackage(slug: string) {
   const response = await makeAuthenticatedRequest(
      "https://api.esimaccess.com/api/v1/open/package/list",
      {
         slug,
      }
   );
   return response;
}

/**
 * Test function to validate the API integration
 */
export async function testESIMAccessAPI(): Promise<ResponseObject | undefined> {
   try {
      // Test with empty request body (adjust as needed)
      const requestBody: any = {
         packageCode: "PKY3WHPRZ",
      };

      const response = await makeAuthenticatedRequest(
         "https://api.esimaccess.com/api/v1/open/package/list",
         requestBody
      );

      return response as ResponseObject;
   } catch (error) {
      // Silent error handling
   }
}
