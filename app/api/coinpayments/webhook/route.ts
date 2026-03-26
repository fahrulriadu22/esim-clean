import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/database/drizzle";
import { paymentHistory, orders } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    // Verifikasi signature dari CoinPayments
    const hmac = req.headers.get("hmac");
    const rawBody = await req.text();
    const privateKey = process.env.COINPAYMENTS_CLIENT_SECRET;

    if (!hmac || !privateKey) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verifikasi HMAC signature
    const expectedHmac = crypto
      .createHmac("sha512", privateKey)
      .update(rawBody)
      .digest("hex");

    if (hmac !== expectedHmac) {
      console.error("Invalid HMAC signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const data = JSON.parse(rawBody);
    console.log("📥 Webhook received:", data);

    const { txn_id, status, custom } = data;

    if (!txn_id || !status) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Update status pembayaran
    if (status >= 100) {
      // Payment completed
      await db
        .update(paymentHistory)
        .set({
          status: "COMPLETED",
          updatedAt: new Date(),
        })
        .where(eq(paymentHistory.referenceId, txn_id));

      // Update order status
      await db
        .update(orders)
        .set({
          status: "PAID",
          updatedAt: new Date(),
        })
        .where(eq(orders.referenceId, custom));
    } else if (status < 0) {
      // Payment failed/cancelled
      await db
        .update(paymentHistory)
        .set({
          status: "FAILED",
          updatedAt: new Date(),
        })
        .where(eq(paymentHistory.referenceId, txn_id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
