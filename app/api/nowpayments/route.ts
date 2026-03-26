
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { user, packageTable, nowPaymentsHistory } from "@/database/schema";
import { eq } from "drizzle-orm";
import { createNowPaymentsClient } from "@/lib/nowpayments";
import { extractUserData } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const telegramData = req.headers.get("X-Telegram-Data");
    if (!telegramData) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userData = extractUserData(telegramData);
    if (!userData) {
      return NextResponse.json(
        { success: false, message: "Invalid user data" },
        { status: 400 }
      );
    }

    const { amount, sku } = await req.json();

    // Get package
    const packageInfo = await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.code, sku))
      .limit(1);

    if (!packageInfo.length) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    // Get user
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.telegramId, userData.id.toString()))
      .limit(1);

    if (!userRecord.length) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const nowPayments = createNowPaymentsClient();
    const orderId = uuidv4();
    const referenceId = `NOW_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const paymentData = await nowPayments.createPayment({
      price_amount: amount,
      price_currency: "USD",
      order_id: orderId,
      order_description: `${packageInfo[0].name}`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/nowpayments/webhook`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    });

    // Save to database
    await db.insert(nowPaymentsHistory).values({
      id: uuidv4(),
      paymentId: String(paymentData.payment_id),
      orderId: orderId,
      referenceId: referenceId,
      telegramId: userData.id.toString(),
      userId: userRecord[0].id,
      amount: amount,
      paymentStatus: "waiting",
      paymentUrl: paymentData.payment_url,
      packageCode: sku,
    });

    return NextResponse.json({
      success: true,
      data: {
        paymentId: paymentData.payment_id,
        paymentUrl: paymentData.payment_url,
        referenceId: referenceId,
      },
    });
  } catch (error) {
    console.error("NowPayments error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create payment" },
      { status: 500 }
    );
  }
}
