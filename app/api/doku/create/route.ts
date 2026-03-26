import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { amount, sku, telegramId, bank } = await req.json();

    const clientId = process.env.DOKU_CLIENT_ID;
    const sharedKey = process.env.DOKU_SHARED_KEY;
    
    // 🔥 ENDPOINT YANG BENAR
    const apiUrl = "https://api-sandbox.doku.com/v1/payment";

    const orderId = `ESIM-${Date.now()}`;
    const amountInCents = Math.round(amount * 100); // 50000 = Rp 500

    const channelMap: Record<string, string> = {
      BCA: "VIRTUAL_ACCOUNT_BCA",
      MANDIRI: "VIRTUAL_ACCOUNT_MANDIRI",
      BNI: "VIRTUAL_ACCOUNT_BNI",
      BRI: "VIRTUAL_ACCOUNT_BRI"
    };

    const channelId = channelMap[bank] || "VIRTUAL_ACCOUNT_BCA";

    // Generate signature
    const signature = crypto
      .createHmac("sha256", sharedKey!)
      .update(`${clientId}${orderId}${amountInCents}`)
      .digest("hex");

    const payload = {
      order: {
        amount: amountInCents,
        currency: "360", // IDR
        id: orderId
      },
      payment: {
        payment_due_date: 86400, // 24 jam
        payment_method_types: [channelId]
      },
      customer: {
        id: telegramId,
        name: `User_${telegramId}`,
        email: `${telegramId}@roamwi.com`
      },
      url: {
        success_url: "https://roamwi.com/payment-success",
        fail_url: "https://roamwi.com/payment-cancel",
        notification_url: "https://roamwi.com/api/doku/webhook"
      }
    };

    console.log("📤 Sending to DOKU:", { url: apiUrl });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": clientId!,
        "Request-Id": orderId,
        "Signature": signature
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("📥 DOKU response:", data);

    if (data.response_code === "SUCCESS" || data.status === "SUCCESS") {
      return NextResponse.json({
        success: true,
        data: {
          orderId: orderId,
          vaNumber: data.virtual_account_info?.virtual_account_number,
          paymentUrl: data.payment?.url,
          bank: bank,
          amount: amount,
          expiresAt: new Date(Date.now() + 86400000).toISOString()
        }
      });
    } else {
      return NextResponse.json(
        { error: data.response_message || data.message || "Payment failed" },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error("❌ DOKU error:", error);
    return NextResponse.json(
      { error: "Payment creation failed" },
      { status: 500 }
    );
  }
}
