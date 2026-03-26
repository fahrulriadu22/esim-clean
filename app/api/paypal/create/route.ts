import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../helper";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/database/drizzle";
import { user, paymentHistory } from "@/database/schema";
import { eq } from "drizzle-orm";
import { applyRateLimit } from "@/lib/rate-limiter";

// Fungsi untuk create order PayPal dengan Advanced Checkout
async function createPayPalOrder(
  accessToken: string,
  transactionId: string,
  amount: number,
  sku: string,
  paymentMethod: string // "paypal" atau "card"
) {
  // Base payload
  const payload: any = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: transactionId,
        description: `eSIM Package - ${sku}`,
        amount: {
          currency_code: "USD",
          value: amount.toString(),
        },
      },
    ],
    application_context: {
      brand_name: "Roamwi eSIM",
      landing_page: paymentMethod === "card" ? "BILLING" : "LOGIN",
      user_action: "PAY_NOW",
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/paypal/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/paypal/cancel`,
    },
  };

  // Advanced Checkout - tambah payment source untuk card
  if (paymentMethod === "card") {
    payload.payment_source = {
      card: {
        // Ini akan menampilkan form card di popup PayPal
        // User bisa input card langsung tanpa login
      }
    };
  }

  const response = await fetch(
    `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("PayPal API error:", error);
    return null;
  }

  return response.json();
}

function validateRequest(body: any) {
  const { amount, type, telegramId, paymentMethod } = body;

  if (!amount || !type || !telegramId) {
    return { error: "Amount, type and telegramId are required" };
  }

  // Validasi payment method
  if (paymentMethod && !["paypal", "card"].includes(paymentMethod)) {
    return { error: "Invalid payment method" };
  }

  const numAmount = Number(amount);
  if (isNaN(numAmount) || numAmount < 1) {
    return { error: "Amount must be a number greater than or equal to 1" };
  }

  if (type !== "TOPUP" && type !== "ORDER") {
    return { error: "Invalid type. Must be 'TOPUP' or 'ORDER'" };
  }

  if (typeof telegramId !== "string" || telegramId.trim().length === 0) {
    return { error: "Invalid telegramId" };
  }

  if (numAmount > 10000) {
    return { error: "Amount cannot exceed $10,000" };
  }

  return null;
}

function generateTransactionId() {
  return `PAYPAL-${uuidv4().split("-").pop()}`;
}

async function savePaymentHistory(
  transactionId: string,
  amount: number,
  type: "TOPUP" | "ORDER",
  telegramId: string,
  orderId: string,
  paymentMethod: string,
  packageCode?: string
) {
  const userRecord = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.telegramId, telegramId))
    .limit(1);

  if (userRecord.length === 0) {
    return null;
  }

  return await db
    .insert(paymentHistory)
    .values({
      referenceId: transactionId,
      amount: amount,
      paymentMethod: paymentMethod === "card" ? "PAYPAL_CARD" : "PAYPAL",
      status: "PENDING",
      paymentType: type,
      telegramId: telegramId,
      orderNo: orderId,
      packageCode: type === "ORDER" ? (packageCode || "-") : "-",
      userId: userRecord[0].id,
    })
    .returning();
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await applyRateLimit(request, "/api/paypal/create");
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await request.json();
    const { amount, type, telegramId, sku = "topup-001", paymentMethod = "paypal" } = body;

    // Validate request
    const validationError = validateRequest(body);
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    const validatedAmount = Number(amount);
    const transactionId = generateTransactionId();

    // Get PayPal access token
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 500 }
      );
    }

    // Create PayPal order dengan payment method yang dipilih
    const order = await createPayPalOrder(
      accessToken,
      transactionId,
      validatedAmount,
      sku,
      paymentMethod
    );

    if (!order) {
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Save payment history
    const paymentHistory = await savePaymentHistory(
      transactionId,
      validatedAmount,
      type,
      telegramId,
      order.id,
      paymentMethod,
      sku
    );

    if (!paymentHistory) {
      return NextResponse.json(
        { error: "Failed to save payment history" },
        { status: 500 }
      );
    }

    // Cari approval link
    const approvalLink = order.links.find((link: any) => link.rel === "approve").href;

    // Return response
    return NextResponse.json({
      id: order.id,
      status: order.status,
      payLink: approvalLink,
      paymentMethod: paymentMethod, // Balikin ke frontend
      payment: {
        referenceId: transactionId,
        amount: validatedAmount,
        paymentMethod: paymentHistory[0].paymentMethod,
        status: paymentHistory[0].status,
        paymentType: paymentHistory[0].paymentType,
        telegramId: paymentHistory[0].telegramId,
      },
    });
  } catch (error) {
    console.error("PayPal create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
