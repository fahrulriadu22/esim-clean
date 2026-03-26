import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../../helper";
import { db } from "@/database/drizzle";
import { paymentHistory } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;
    const telegramData = request.headers.get("X-Telegram-Data");

    if (!telegramData) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Capture PayPal order
    const response = await fetch(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal capture error:", data);
      return NextResponse.json(
        { success: false, message: "Failed to capture payment" },
        { status: response.status }
      );
    }

    // Update payment history status
    await db
      .update(paymentHistory)
      .set({ 
        status: "COMPLETED",
        updatedAt: new Date(),
      })
      .where(eq(paymentHistory.orderNo, orderId));

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Capture error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
