import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
   try {
      const { 
         amount, 
         sku, 
         telegramId, 
         cardNumber, 
         cardholderName,
         expiryMonth, 
         expiryYear, 
         cvv 
      } = await req.json();

      const clientId = process.env.DOKU_CLIENT_ID;
      const secretKey = process.env.DOKU_SHARED_KEY;
      
      const apiUrl = "https://api.doku.com/checkout/v1/payment";
      const requestTarget = "/checkout/v1/payment";

      const orderId = `ESIM-${Date.now()}`;
      
      // Konversi USD ke IDR (rate sementara 1 USD = 16,000 IDR)
      const USD_TO_IDR = 16000;
      const amountInIdr = Math.round(amount * USD_TO_IDR);
      
      const timestamp = new Date().toISOString().split('.')[0] + 'Z';
      
      // 🔥 Payload dengan format yang benar
      const payload = {
         order: {
            invoice_number: orderId,
            amount: amountInIdr,
            currency: "IDR"
         },
         payment: {
            payment_method_types: ["CARD"],
            card: {
               number: cardNumber.replace(/\s/g, ''),
               holder_name: cardholderName,
               expiry_month: expiryMonth.padStart(2, '0'),
               expiry_year: expiryYear,
               cvv: cvv
            }
         },
         customer: {
            id: telegramId.toString(),
            name: `User_${telegramId}`,
            email: `${telegramId}@roamwi.com`
         },
         url: {
            notification_url: "https://roamwi.com/api/doku/webhook"
         }
      };
      
      const payloadString = JSON.stringify(payload);
      
      const digest = crypto
         .createHash("sha256")
         .update(payloadString, "utf-8")
         .digest("base64");
      
      const componentSignature = 
         `Client-Id:${clientId}\n` +
         `Request-Id:${orderId}\n` +
         `Request-Timestamp:${timestamp}\n` +
         `Request-Target:${requestTarget}\n` +
         `Digest:${digest}`;
      
      const signature = crypto
         .createHmac("sha256", secretKey!)
         .update(componentSignature)
         .digest("base64");
      
      const headerSignature = `HMACSHA256=${signature}`;
      
      console.log("📤 Amount in IDR:", amountInIdr);
      console.log("📤 Order ID:", orderId);

      const response = await fetch(apiUrl, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Client-Id": clientId!,
            "Request-Id": orderId,
            "Request-Timestamp": timestamp,
            "Request-Target": requestTarget,
            "Digest": digest,
            "Signature": headerSignature
         },
         body: payloadString
      });

      const data = await response.json();
      console.log("📥 DOKU response:", data);

      if (data.response_code === "SUCCESS" || data.status === "SUCCESS") {
         return NextResponse.json({
            success: true,
            data: {
               orderId: orderId,
               transactionId: data.transaction_id,
               status: data.status,
               amount: amount
            }
         });
      } else {
         return NextResponse.json(
            { error: data.message || data.response_message || "Payment failed" },
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
