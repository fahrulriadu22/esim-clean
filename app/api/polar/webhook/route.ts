import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory, order, esim, packageTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// 🔥 Fungsi aktivasi eSIM via API
async function activateEsimViaApi(packageCode: string, telegramId: string, email?: string) {
  try {
    console.log(`📡 Aktivasi eSIM untuk ${packageCode}...`);
    
    // Cari harga package dari database
    const packageData = await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.code, packageCode))
      .limit(1);
    
    const priceInCents = Math.round((packageData[0]?.price || 0) * 10000);
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
    console.log(`📦 ESIM API Order Response:`, data);

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

async function queryEsimProfile(orderNo: string) {
  try {
    const response = await fetch("https://api.esimaccess.com/api/v1/open/esim/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "RT-AccessCode": process.env.ESIM_ACCESS_CODE!,
      },
      body: JSON.stringify({
        orderNo: orderNo,
        pager: { pageNum: 1, pageSize: 10 }
      }),
    });

    const data = await response.json();
    console.log(`📦 ESIM Query Response:`, JSON.stringify(data, null, 2));
    
    if (data.success && data.obj?.esimList?.length > 0) {
      const esimData = data.obj.esimList[0];
      return {
        ac: esimData.ac,
        iccid: esimData.iccid,
        imsi: esimData.imsi,
        shortUrl: esimData.shortUrl || esimData.qrCodeUrl,
        expiredAt: esimData.expiredTime,
        duration: esimData.totalDuration,
        durationUnit: esimData.durationUnit,
        remainingData: esimData.totalVolume,
      };
    }
    return null;
  } catch (error) {
    console.error("Query eSIM profile error:", error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const event = payload.type;
    const eventData = payload.data;

    console.log(`✅ Polar webhook diterima: ${event}`);

    if (event === "order.paid") {
      const metadata = eventData.metadata || {};
      const telegramId = metadata.telegram_id;
      const packageCode = metadata.package_code;
      const email = metadata.customer_email;

      if (!telegramId || !packageCode) {
        console.error("❌ Metadata tidak lengkap:", metadata);
        return NextResponse.json(
          { error: "Missing telegram_id or package_code" },
          { status: 400 }
        );
      }

      console.log(`💰 Payment untuk user ${telegramId}, package: ${packageCode}`);

      // CEK DUPLIKAT
      const existingOrder = await db
        .select()
        .from(order)
        .where(eq(order.txId, eventData.id))
        .limit(1);

      if (existingOrder.length > 0) {
        console.log(`⚠️ Order sudah ada, skip insert`);
        return NextResponse.json({ received: true, alreadyProcessed: true });
      }

      // GENERATE ID UNIK
      const paymentId = uuidv4();
      const orderId = uuidv4();
      const uniqueReferenceId = `${eventData.id}-${Date.now()}`;
      const uniqueOrderNo = `POLAR-${eventData.id}-${Date.now()}`;

      // SIMPAN KE PAYMENT HISTORY
      await db.insert(paymentHistory).values({
        id: paymentId,
        referenceId: uniqueReferenceId,
        telegramId: telegramId,
        userId: null,
        payerEmail: email || null,
        amount: parseFloat(eventData.amount) / 100,
        paymentMethod: "POLAR",
        status: "COMPLETED",
        paymentType: "ORDER",
        orderNo: uniqueOrderNo,
        packageCode: packageCode,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✅ Payment history: ${paymentId}`);

      // SIMPAN KE ORDER
      await db.insert(order).values({
        id: orderId,
        telegramId: telegramId,
        orderNo: uniqueOrderNo,
        txId: eventData.id,
        amount: parseFloat(eventData.amount) / 100,
        status: "COMPLETED",
        paymentMethod: "POLAR",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✅ Order tersimpan: ${orderId}`);

      // AKTIVASI ESIM VIA API
      let esimOrder;
      try {
        esimOrder = await activateEsimViaApi(packageCode, telegramId, email);
        console.log(`✅ ESIM Order: ${esimOrder.orderNo}`);

        // 🔥 POLLING UNTUK MENDAPATKAN PROFILE
        let profile = null;
        let attempts = 0;
        const maxAttempts = 12; // 12 x 5 detik = 60 detik

        while (!profile && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          profile = await queryEsimProfile(esimOrder.orderNo);
          attempts++;
          console.log(`Polling attempt ${attempts}: ${profile ? 'profile found' : 'still waiting'}`);
        }

        if (profile) {
          // SIMPAN KE TABEL ESIM
          await db.insert(esim).values({
            id: uuidv4(),
            telegramId: telegramId,
            imsi: profile.imsi || "",
            iccid: profile.iccid || "",
            ac: profile.ac || "",
            shortUrl: profile.shortUrl || profile.qrCode || "",
            totalDuration: profile.duration || 0,
            durationUnit: profile.durationUnit || "DAY",
            status: "ACTIVE",
            packageName: `Package ${packageCode}`,
            packageCode: packageCode,
            remainingData: BigInt(profile.remainingData || 0),
            orderNo: uniqueOrderNo,
            expiredAt: new Date(profile.expiredAt || Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          console.log(`✅ eSIM tersimpan untuk ${telegramId} dengan QR: ${profile.shortUrl}`);
        } else {
          console.log(`⚠️ Profile tidak ditemukan setelah ${maxAttempts} attempts`);
        }

      } catch (error) {
        console.error(`❌ Gagal aktivasi eSIM:`, error);
      }

      return NextResponse.json({ received: true, orderId });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Polar webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
