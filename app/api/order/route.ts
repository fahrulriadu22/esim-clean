import { NextRequest, NextResponse } from "next/server";
import { makeAuthenticatedRequest } from "@/utils/esim-api";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/database/drizzle";
import { user, balance, order, packageTable, region } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import {
   extractUserData,
   UserData,
} from "@/lib/utils";
import { verifyTelegramWebAppData } from "@/lib/crypto-utils";
import { applyRateLimit } from "@/lib/rate-limiter";

// Define the allowed plan combinations with their margins (same as package route)
const ALLOWED_PLANS = [
   { data: "1", duration: 7, durationUnit: "DAY", margin: 300 },
   { data: "3", duration: 15, durationUnit: "DAY", margin: 223 },
   { data: "5", duration: 30, durationUnit: "DAY", margin: 141 },
   { data: "10", duration: 30, durationUnit: "DAY", margin: 130 },
   { data: "20", duration: 30, durationUnit: "DAY", margin: 130 },
];

interface PricePackageResponse {
   success: boolean;
   errorCode: string;
   errorMsg?: string | null;
   obj?: any;
}

export async function POST(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await applyRateLimit(request, "/api/order");
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
      const body = await request.json();

      // Validate required fields
      const {
         packageCode,
         price,
         count = 1,
         paymentMethod = "BALANCE",
         useDeposit = true,
      } = body;

      if (!packageCode || !price) {
         return NextResponse.json(
            {
               success: false,
               error: "Missing required fields: packageCode and price are required",
            },
            { status: 400 }
         );
      }

      // Get package details to validate margin calculation
      const packageDetails = await db
         .select({
            id: packageTable.id,
            name: packageTable.name,
            code: packageTable.code,
            duration: packageTable.duration,
            durationUnit: packageTable.durationUnit,
            price: packageTable.price,
            data: packageTable.data,
            dataUnit: packageTable.dataUnit,
            regionId: packageTable.regionId,
         })
         .from(packageTable)
         .where(eq(packageTable.code, packageCode))
         .limit(1);

      if (packageDetails.length === 0) {
         return NextResponse.json(
            {
               success: false,
               error: "Package not found",
            },
            { status: 400 }
         );
      }

      const packageData = packageDetails[0];

      // Check if package matches allowed plan combinations
      const matchingPlan = ALLOWED_PLANS.find((allowedPlan) => {
         return (
            packageData.data === allowedPlan.data &&
            packageData.duration === allowedPlan.duration &&
            packageData.durationUnit === allowedPlan.durationUnit
         );
      });

      if (!matchingPlan) {
         return NextResponse.json(
            {
               success: false,
               error: "Package not available for purchase",
            },
            { status: 400 }
         );
      }

      // Validate that the price includes the correct margin
      const expectedFinalPrice =
         packageData.price + packageData.price * (matchingPlan.margin / 100);
      const priceDifference = Math.abs(price - expectedFinalPrice);

      // Allow small rounding differences (within 1 cent)
      if (priceDifference > 0.01) {
         return NextResponse.json(
            {
               success: false,
               error: `Price mismatch. Expected $${expectedFinalPrice.toFixed(
                  2
               )} but received $${price.toFixed(2)}`,
            },
            { status: 400 }
         );
      }

      // Generate transaction ID
      const transactionId = "TX-" + uuidv4().split("-").pop();

      // Check balance if using deposit
      if (useDeposit) {
         const userRecord = await db
            .select({
               id: user.id,
               balanceId: user.balanceId,
            })
            .from(user)
            .where(eq(user.telegramId, extractedUserData.id.toString()))
            .limit(1);

         if (userRecord.length === 0) {
            return NextResponse.json(
               {
                  success: false,
                  error: "User not found",
               },
               { status: 400 }
            );
         }

         const userData = userRecord[0];
         const balanceRecord = await db
            .select({ amount: balance.amount })
            .from(balance)
            .where(eq(balance.id, userData.balanceId))
            .limit(1);

         if (balanceRecord.length === 0) {
            return NextResponse.json(
               {
                  success: false,
                  error: "User balance not found",
               },
               { status: 400 }
            );
         }

         if (balanceRecord[0].amount < price) {
            return NextResponse.json(
               {
                  success: false,
                  error: `Insufficient balance. You have $${balanceRecord[0].amount.toFixed(
                     2
                  )} but need $${price.toFixed(2)}`,
               },
               { status: 400 }
            );
         }
      }

      const result: PricePackageResponse = await getPricePackage(packageCode);
      const amountInCents = result.obj.packageList[0].price;

      // Prepare order data for eSIM Access API
      const orderData = {
         transactionId,
         amount: amountInCents,
         packageInfoList: [
            {
               packageCode,
               count,
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
         return NextResponse.json(
            {
               success: false,
               error: "Failed to create order",
            },
            { status: 500 }
         );
      }

      const ordered = await db
         .insert(order)
         .values({
            orderNo: response.obj.orderNo,
            txId: transactionId,
            amount: price,
            status: "PENDING",
            paymentMethod: paymentMethod,
            telegramId: extractedUserData.id.toString(),
         })
         .returning();

      // Reduce balance if using deposit
      if (useDeposit) {
         const userRecord = await db
            .select({ balanceId: user.balanceId })
            .from(user)
            .where(eq(user.telegramId, extractedUserData.id.toString()))
            .limit(1);

         if (userRecord.length > 0) {
            // Get current balance
            const currentBalance = await db
               .select({ amount: balance.amount })
               .from(balance)
               .where(eq(balance.id, userRecord[0].balanceId))
               .limit(1);

            if (currentBalance.length > 0) {
               await db
                  .update(balance)
                  .set({
                     amount: currentBalance[0].amount - price,
                  })
                  .where(eq(balance.id, userRecord[0].balanceId));
            }
         }
      }

      // Return success response with order details
      return NextResponse.json(
         {
            success: true,
            message: "Order created successfully",
            data: {
               transactionId,
               order: ordered[0],
            },
         },
         { status: 200 }
      );
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            error: "Failed to create order",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
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
