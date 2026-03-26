import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { nowPaymentsHistory } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const paymentId = req.nextUrl.searchParams.get("paymentId");
  
  if (!paymentId) {
    return NextResponse.json(
      { success: false, message: "Payment ID required" },
      { status: 400 }
    );
  }

  try {
    // Cek status dari database
    const payment = await db
      .select()
      .from(nowPaymentsHistory)
      .where(eq(nowPaymentsHistory.paymentId, paymentId))
      .limit(1);

    if (!payment.length) {
      return NextResponse.json(
        { success: false, message: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        payment_status: payment[0].paymentStatus,
        payment_id: payment[0].paymentId,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to check status" },
      { status: 500 }
    );
  }
}
