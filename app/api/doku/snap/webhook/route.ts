import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
      const rawBody = await req.text();
      const authorization = req.headers.get("authorization");
      
      console.log("📥 SNAP Webhook received:");
      console.log("Headers:", Object.fromEntries(req.headers.entries()));
      console.log("Body:", rawBody);
      
      const data = JSON.parse(rawBody);
      
      // Verifikasi token (opsional)
      // const token = authorization?.replace("Bearer ", "");
      
      if (data.status === "SUCCESS" || data.transaction_status === "settlement") {
         // Update database
         console.log("✅ SNAP Payment success:", data.order_id);
         
         // TODO: Update payment_history
         // await db.update(paymentHistory).set({ 
         //    status: "COMPLETED",
         //    updatedAt: new Date()
         // }).where(eq(paymentHistory.referenceId, data.order_id));
      }
      
      return NextResponse.json({ 
         success: true,
         message: "Webhook received"
      });
      
   } catch (error) {
      console.error("❌ SNAP Webhook error:", error);
      return NextResponse.json({ error: "Failed" }, { status: 500 });
   }
}
