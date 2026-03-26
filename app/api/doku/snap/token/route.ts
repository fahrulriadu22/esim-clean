import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      
      console.log("📥 SNAP Token Request:", body);
      
      // Generate access token
      const accessToken = crypto.randomBytes(32).toString("hex");
      const expiresIn = 3600; // 1 jam
      
      // Simpan token ke global (simple cache)
      global.dokuToken = {
         token: accessToken,
         expiresAt: Date.now() + expiresIn * 1000
      };
      
      return NextResponse.json({
         accessToken: accessToken,
         tokenType: "Bearer",
         expiresIn: expiresIn
      });
      
   } catch (error) {
      console.error("❌ Token generation error:", error);
      return NextResponse.json({ 
         error: "Failed to generate token"
      }, { status: 500 });
   }
}
