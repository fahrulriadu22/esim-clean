import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔍 Fetching currencies from CoinPayments API V2...");
    
    // Panggil API V2 CoinPayments (tanpa auth, cuma filter crypto & token)
    const response = await fetch(
      "https://a-api.coinpayments.net/api/v2/currencies?types=crypto,token",
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`CoinPayments API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Pastikan data adalah array
    if (!Array.isArray(data)) {
      console.error("Invalid response format:", data);
      throw new Error("Invalid response format from CoinPayments");
    }

    // Filter hanya coin yang aktif dan bisa dipakai payment
    const activeCoins = data
      .filter((coin: any) => 
        coin.status === "active" && 
        coin.isEnabledForPayment === true &&
        (coin.type === "crypto" || coin.type === "token")
      )
      .map((coin: any) => ({
        id: coin.symbol,
        name: coin.name,
        symbol: coin.symbol,
        network: coin.symbol.split(".")[1] || coin.symbol,
        minAmount: 0.01, // Default, nanti bisa di-update
        logo: coin.logo?.imageUrl || null,
      }))
      .slice(0, 50); // Ambil 50 coin pertama

    console.log(`✅ Found ${activeCoins.length} active coins`);

    return NextResponse.json({ success: true, data: activeCoins });
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return NextResponse.json({ success: false, data: [], error: "Failed to fetch currencies" }, { status: 500 });
  }
}
