import { NextRequest, NextResponse } from "next/server";
import { createCoinPaymentsClient } from "@/lib/coinpayments";
import { db } from "@/database/drizzle";
import { user, packageTable, paymentHistory } from "@/database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const telegramData = req.headers.get("X-Telegram-Data");
    const { amount, sku, email, name } = await req.json();

    console.log("💰 CoinPayments create request:", { amount, sku, email, name });

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

    // Cek user
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.telegramId, userId))
      .limit(1);

    if (!userRecord.length) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Cek package
    const packageRecord = await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.code, sku))
      .limit(1);

    if (!packageRecord.length) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    const coinpayments = createCoinPaymentsClient();
    const orderId = uuidv4();
    const referenceId = `CP_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const invoice = await coinpayments.createInvoice({
      amount: amount,
      currency: "USD",
      buyerEmail: email,
      buyerName: name,
      itemName: packageRecord[0].name,
      itemDescription: `${packageRecord[0].data}${packageRecord[0].dataUnit} / ${packageRecord[0].duration} ${packageRecord[0].durationUnit}`,
      orderId: orderId,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      ipnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/coinpayments/webhook`,
    });

    console.log("📦 CoinPayments invoice response:", JSON.stringify(invoice, null, 2));

    // 🔥 AMBIL CHECKOUT URL DARI RESPONSE
    let checkoutUrl = "";
    let transactionId = "";
    
    if (invoice.invoices && invoice.invoices.length > 0) {
      checkoutUrl = invoice.invoices[0].checkoutLink || invoice.invoices[0].link;
      transactionId = invoice.invoices[0].id;
    } else {
      checkoutUrl = invoice.checkoutLink || invoice.link;
      transactionId = invoice.id;
    }

    console.log("✅ Checkout URL:", checkoutUrl);

    // Simpan ke payment history
    await db.insert(paymentHistory).values({
      id: uuidv4(),
      referenceId: referenceId,
      telegramId: userId,
      userId: userRecord[0].id,
      amount: amount,
      paymentMethod: "COINPAYMENTS",
      status: "PENDING",
      paymentType: "ORDER",
      orderNo: orderId,
      packageCode: sku,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: {
        transactionId: transactionId,
        checkoutUrl: checkoutUrl,
        referenceId: referenceId,
      },
    });
  } catch (error) {
    console.error("❌ CoinPayments error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create payment" },
      { status: 500 }
    );
  }
}
