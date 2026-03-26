import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { user, packageTable, nowPaymentsHistory } from "@/database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Fungsi untuk mendapatkan minimum amount dari NowPayments
async function getNowPaymentsMinAmount(): Promise<number> {
  try {
    const response = await fetch(
      "https://api.nowpayments.io/v1/min-amount?currency_from=usd&fiat_equivalent=usd",
      {
        headers: {
          "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      console.warn("Failed to fetch min amount, using fallback $5");
      return 5;
    }

    const data = await response.json();
    return data.min_amount || 5;
  } catch (error) {
    console.error("Error fetching min amount:", error);
    return 5;
  }
}

async function createNowPaymentsInvoice(
  amount: number, 
  orderId: string, 
  description: string
) {
  const response = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: amount,
      price_currency: "USD",
      pay_currency: "USDT", // FORCE USDT
      order_id: orderId,
      order_description: description,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/nowpayments/webhook`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`NowPayments API error: ${error}`);
  }

  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    const telegramData = req.headers.get("X-Telegram-Data");
    const body = await req.json();
    const { amount, sku, selectedCurrency } = body;

    console.log("Received request:", { amount, sku, selectedCurrency });

    // Validasi input
    if (!telegramData) {
      return NextResponse.json(
        { success: false, message: "Telegram data required" },
        { status: 400 }
      );
    }

    if (!amount || !sku) {
      return NextResponse.json(
        { success: false, message: "Amount and SKU required" },
        { status: 400 }
      );
    }

    // CEK MINIMAL AMOUNT
    const minAmount = await getNowPaymentsMinAmount();
    if (amount < minAmount) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Minimum payment amount is $${minAmount.toFixed(2)} USD. Please select a package with higher value.`,
          minAmount: minAmount 
        },
        { status: 400 }
      );
    }

    // Parse user dari Telegram
    let userId: string;
    try {
      const urlParams = new URLSearchParams(telegramData);
      const userStr = urlParams.get("user");
      if (!userStr) throw new Error("No user data");
      
      const userData = JSON.parse(decodeURIComponent(userStr));
      userId = userData.id.toString();
    } catch (e) {
      return NextResponse.json(
        { success: false, message: "Invalid Telegram data" },
        { status: 400 }
      );
    }

    // Cek user di database
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.telegramId, userId))
      .limit(1);

    if (!userRecord.length) {
      return NextResponse.json(
        { success: false, message: "User not found" },
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
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    // Generate order ID untuk NowPayments
    const orderId = uuidv4();
    
    // Panggil API NowPayments dengan currency yang dipilih user
    let invoice;
    try {
      invoice = await createNowPaymentsInvoice(
        amount,
        orderId,
        `${packageRecord[0].name} - ${packageRecord[0].data}${packageRecord[0].dataUnit}`,
        selectedCurrency || "BTC" // Default ke BTC kalo gak ada pilihan
      );
      
      console.log("NowPayments invoice created:", invoice);
      
    } catch (apiError) {
      console.error("NowPayments API error:", apiError);
      return NextResponse.json(
        { success: false, message: "Failed to create payment with NowPayments" },
        { status: 502 }
      );
    }

    // Simpan ke database
    const paymentId = uuidv4();
    const referenceId = `NOW_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    await db.insert(nowPaymentsHistory).values({
      id: paymentId,
      paymentId: invoice.id.toString(),
      orderId: orderId,
      referenceId: referenceId,
      telegramId: userId,
      userId: userRecord[0].id,
      amount: amount,
      paymentStatus: "waiting",
      paymentUrl: invoice.invoice_url,
      packageCode: sku,
      selectedCurrency: selectedCurrency || "BTC", // Simpan currency yang dipilih
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: {
        paymentId: invoice.id.toString(),
        paymentUrl: invoice.invoice_url,
        referenceId: referenceId,
        selectedCurrency: selectedCurrency, // Balikin ke frontend
      },
    });

  } catch (error) {
    console.error("NowPayments error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "Internal server error" 
      },
      { status: 500 }
    );
  }
}
