import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and, gt, lt } from "drizzle-orm";
import * as schema from "@/database/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export async function POST(req: NextRequest) {
  try {
    const { code, packageCode, amount } = await req.json();

    if (!code) {
      return NextResponse.json({ 
        valid: false, 
        message: "Promo code is required" 
      });
    }

    // Cari promo code di database (tabel PromoCodes)
    const promos = await db
      .select()
      .from(schema.promoCodes)
      .where(eq(schema.promoCodes.code, code.toUpperCase()))
      .limit(1);

    if (promos.length === 0) {
      return NextResponse.json({ 
        valid: false, 
        message: "Invalid promo code" 
      });
    }

    const promo = promos[0];

    // Cek apakah aktif
    if (!promo.isActive) {
      return NextResponse.json({ 
        valid: false, 
        message: "Promo code is inactive" 
      });
    }

    // Cek masa berlaku
    if (promo.validUntil) {
      const now = new Date();
      const validUntil = new Date(promo.validUntil);
      if (now > validUntil) {
        return NextResponse.json({ 
          valid: false, 
          message: "Promo code has expired" 
        });
      }
    }

    // Cek minimal pembelian
    if (promo.minPurchase && amount < promo.minPurchase) {
      return NextResponse.json({ 
        valid: false, 
        message: `Minimum purchase $${promo.minPurchase} required` 
      });
    }

    // Cek apakah khusus package tertentu
    if (promo.packageSpecific && promo.packageSpecific.length > 0) {
      if (!promo.packageSpecific.includes(packageCode)) {
        return NextResponse.json({ 
          valid: false, 
          message: "This promo is not valid for this package" 
        });
      }
    }

    // Cek max uses
    if (promo.maxUses && promo.usedCount >= promo.maxUses) {
      return NextResponse.json({ 
        valid: false, 
        message: "Promo code has reached maximum usage" 
      });
    }

// Update used count (pakai execute, bukan run)
await db.update(schema.promoCodes)
  .set({ usedCount: (promo.usedCount || 0) + 1 })
  .where(eq(schema.promoCodes.id, promo.id))
  .execute();

    return NextResponse.json({
      valid: true,
      discount: promo.discount,
      message: "Promo applied successfully",
    });

  } catch (error) {
    console.error("Validate promo error:", error);
    return NextResponse.json(
      { valid: false, message: "Server error" },
      { status: 500 }
    );
  }
}
