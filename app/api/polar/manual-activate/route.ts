import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { esim, order } from "@/database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { packageTable } from "@/database/schema";

async function activateEsimViaApi(packageCode: string, telegramId: string) {
  try {
    console.log(`📡 Aktivasi eSIM untuk ${packageCode}...`);
    
    // 🔥 AMBIL HARGA DARI DATABASE
    const pkg = await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.code, packageCode))
      .limit(1);
    
    if (!pkg.length) {
      throw new Error(`Package ${packageCode} not found`);
    }
    
    const priceInCents = Math.round(pkg[0].price * 10000); // Convert ke cents (1 USD = 10000)
    console.log(`💰 Harga package: $${pkg[0].price} -> ${priceInCents} cents`);
    
    const transactionId = `${telegramId}-${Date.now()}`;
    
    const response = await fetch("https://api.esimaccess.com/api/v1/open/esim/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "RT-AccessCode": process.env.ESIM_ACCESS_CODE!,
      },
      body: JSON.stringify({
        transactionId: transactionId,
        amount: priceInCents,
        packageInfoList: [{
          packageCode: packageCode,
          count: 1,
          price: priceInCents
        }]
      }),
    });

    const data = await response.json();
    console.log(`📦 ESIM API Response:`, data);

    if (!data.success) {
      throw new Error(`ESIM API error: ${data.errorCode} - ${data.errorMsg}`);
    }

    return {
      orderNo: data.obj.orderNo,
      transactionId: data.obj.transactionId,
    };
  } catch (error) {
    console.error(`❌ Gagal aktivasi eSIM:`, error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, packageCode, telegramId } = await req.json();

    // Cek apakah eSIM sudah ada
    const existing = await db
      .select()
      .from(esim)
      .where(eq(esim.orderNo, orderId))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ 
        success: true, 
        message: "eSIM already activated",
        esim: existing[0]
      });
    }

    // Aktivasi via API
    const esimData = await activateEsimViaApi(packageCode, telegramId);

    // Simpan ke database
    await db.insert(esim).values({
      id: uuidv4(),
      telegramId,
      imsi: esimData.imsi || "",
      iccid: esimData.iccid || "",
      ac: esimData.ac || "",
      shortUrl: esimData.shortUrl || "",
      totalDuration: esimData.duration || 30,
      durationUnit: esimData.durationUnit || "DAY",
      status: "ACTIVE",
      packageName: `Package ${packageCode}`,
      packageCode,
      remainingData: BigInt(esimData.remainingData || 0),
      orderNo: orderId,
      expiredAt: new Date(esimData.expiredAt || Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      message: "eSIM activated",
      esim: esimData 
    });
  } catch (error) {
    console.error("Manual activation error:", error);
    return NextResponse.json(
      { success: false, error: "Activation failed" },
      { status: 500 }
    );
  }
}
