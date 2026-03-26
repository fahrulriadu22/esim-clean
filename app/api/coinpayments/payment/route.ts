import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory } from "@/database/schema";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { amount, sku, crypto: cryptoType, orderId, telegramId } = await req.json();

    console.log("💰 Invoice request:", { amount, sku, crypto: cryptoType, orderId, telegramId });

    if (!telegramId) {
      return NextResponse.json({ error: "Telegram ID required" }, { status: 400 });
    }

    const clientId = process.env.COINPAYMENTS_CLIENT_ID;
    const clientSecret = process.env.COINPAYMENTS_CLIENT_SECRET;
    const apiUrl = process.env.COINPAYMENTS_API_URL || "https://a-api.coinpayments.net";

    if (!clientId || !clientSecret) {
      console.error("❌ CoinPayments credentials missing");
      return NextResponse.json(
        { error: "Payment provider not configured" },
        { status: 500 }
      );
    }

    // Prepare request
    const method = "POST";
    const url = "/api/v2/merchant/invoices";
    const timestamp = new Date().toISOString().split('.')[0]; // YYYY-MM-DDTHH:mm:ss
    
    // Payload sesuai dokumentasi
    const amountInCents = Math.round(amount * 100);
    
    const payload = {
      currency: "USD",
      items: [
        {
          quantity: {
            value: 1,
            type: 2, // 2 = quantity
          },
          amount: {
            currencyId: "USD",
            value: amountInCents,
          },
          originalAmount: {
            currencyId: "USD",
            value: amountInCents,
          },
          name: `ESIM Package: ${sku}`,
        },
      ],
      amount: {
        breakdown: {
          subtotal: {
            currencyId: "USD",
            value: amountInCents,
          },
        },
        currencyId: "USD",
        value: amountInCents,
      },
      payment: {
        paymentCurrency: cryptoType,
      },
      webhooks: [
        {
          notificationsUrl: "https://roamwi.com/api/coinpayments/webhook",
          notifications: ["invoiceCompleted", "invoicePaid"],
        },
      ],
      successUrl: "https://roamwi.com/payment-success",
      cancelUrl: "https://roamwi.com/payment-cancel",
      customData: {
        telegramId: telegramId,
        sku: sku,
        orderId: orderId || `ORDER-${Date.now()}`,
      },
    };

    const payloadString = JSON.stringify(payload);
    
    // 🔥 Generate signature sesuai dokumentasi
    // message = BOM + method + url + clientId + timestamp + payload
    const bom = "\ufeff";
    const message = `${bom}${method}${url}${clientId}${timestamp}${payloadString}`;
    
    console.log("🔐 Generating signature with:");
    console.log("   Method:", method);
    console.log("   URL:", url);
    console.log("   Client ID:", clientId);
    console.log("   Timestamp:", timestamp);
    console.log("   Payload length:", payloadString.length);
    
    const signature = crypto
      .createHmac("sha256", clientSecret)
      .update(message)
      .digest("base64");
    
    console.log("✅ Signature generated:", signature.substring(0, 50) + "...");

    const fullUrl = `${apiUrl}${url}`;
    console.log("📤 Sending to:", fullUrl);

    const response = await fetch(fullUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "X-CoinPayments-Client": clientId,
        "X-CoinPayments-Timestamp": timestamp,
        "X-CoinPayments-Signature": signature,
      },
      body: payloadString,
    });

    const responseText = await response.text();
    console.log("📥 Response status:", response.status);
    console.log("📥 Response body:", responseText);

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP ${response.status}: ${responseText}` },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid response", raw: responseText },
        { status: 502 }
      );
    }

    const invoice = data.invoices?.[0] || data;
    
    console.log("✅ Invoice created:", invoice.id);

    // Simpan ke database
    const paymentId = uuidv4();
    const uniqueOrderNo = `INV-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    await db.insert(paymentHistory).values({
      id: paymentId,
      referenceId: invoice.id,
      orderNo: uniqueOrderNo,
      telegramId: telegramId,
      amount: amount,
      paymentMethod: `CRYPTO_${cryptoType}`,
      status: "PENDING",
      paymentType: "ORDER",
      packageCode: sku,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: {
        invoiceId: invoice.id,
        walletAddress: invoice.payment?.hotWallet?.address,
        network: invoice.payment?.hotWallet?.currency,
        amount: invoice.payment?.hotWallet?.amount,
        crypto: cryptoType,
        checkoutUrl: invoice.checkoutLink,
        expiresAt: invoice.payment?.hotWallet?.expiresAt,
      },
    });
    
  } catch (error) {
    console.error("❌ Error creating payment:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create payment" },
      { status: 500 }
    );
  }
}
