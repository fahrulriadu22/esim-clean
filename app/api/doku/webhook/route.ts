import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");
    
    console.log("📥 Webhook received:", rawBody);
    
    // Verifikasi signature (optional)
    // const publicKey = process.env.DOKU_PUBLIC_KEY;
    // verify signature...
    
    const data = JSON.parse(rawBody);
    
    if (data.status === "SUCCESS" || data.transaction_status === "settlement") {
      // Update database
      // Aktivasi ESIM
      console.log("✅ Payment success:", data.order_id);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
