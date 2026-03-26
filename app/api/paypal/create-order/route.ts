import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { user, paymentHistory } from "@/database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const telegramData = req.headers.get("X-Telegram-Data");
    const { amount, sku, email, name } = await req.json();

    // Parse user dari Telegram
    let userId: string;
    try {
      const urlParams = new URLSearchParams(telegramData!);
      const userStr = urlParams.get("user");
      const userData = JSON.parse(decodeURIComponent(userStr!));
      userId = userData.id.toString();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid Telegram data" },
        { status: 400 }
      );
    }

    // Dapatkan access token
    const accessToken = await getPayPalAccessToken();

    // Create PayPal order
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: `ORDER-${Date.now()}`,
            amount: {
              currency_code: "USD",
              value: amount.toString(),
            },
            description: `eSIM - ${sku}`,
          },
        ],
        payment_source: {
          card: {
            // Ini untuk 3D Secure
          },
        },
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: order.message || "Failed to create order" },
        { status: response.status }
      );
    }

    // Simpan ke database
    await db.insert(paymentHistory).values({
      id: uuidv4(),
      referenceId: `PAYPAL-${Date.now()}`,
      telegramId: userId,
      amount: parseFloat(amount),
      paymentMethod: "PAYPAL_CARD",
      status: "PENDING",
      paymentType: "ORDER",
      orderNo: order.id,
      packageCode: sku,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      id: order.id,
    });
  } catch (error) {
    console.error("PayPal create order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
