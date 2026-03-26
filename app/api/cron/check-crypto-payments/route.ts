import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory, order } from "@/database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Fungsi cek transaksi USDT/TRX di Tron network
async function checkTronTransaction(walletAddress: string, amount: number, tokenType: string = "USDT"): Promise<boolean> {
  try {
    if (tokenType === "USDT") {
      // Cek USDT TRC20
      const response = await fetch(
        `https://api.trongrid.io/v1/accounts/${walletAddress}/transactions/trc20?limit=10&only_confirmed=true`
      );
      const data = await response.json();
      
      const transactions = data.data || [];
      const matched = transactions.find((tx: any) => {
        const value = parseFloat(tx.value) / 1e6;
        return tx.token_info?.symbol === 'USDT' && value >= amount - 0.01;
      });
      
      if (matched) {
        console.log(`✅ USDT transaction found: ${matched.transaction_id}`);
        return true;
      }
    }
    
    // Cek TRX
    const response = await fetch(
      `https://api.trongrid.io/v1/accounts/${walletAddress}/transactions?limit=10&only_confirmed=true`
    );
    const data = await response.json();
    
    const transactions = data.data || [];
    const matched = transactions.find((tx: any) => {
      const value = parseFloat(tx.raw_data?.contract?.[0]?.parameter?.value?.amount || 0) / 1e6;
      return value >= amount - 0.1;
    });
    
    if (matched) {
      console.log(`✅ TRX transaction found: ${matched.txID}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error checking Tron:", error);
    return false;
  }
}

// Fungsi cek transaksi SOL (Solana)
async function checkSolanaTransaction(walletAddress: string, amount: number): Promise<boolean> {
  try {
    const response = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: [walletAddress, { limit: 10 }],
      }),
    });
    const data = await response.json();
    
    if (data.result && data.result.length > 0) {
      console.log(`✅ SOL transaction found: ${data.result[0].signature}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking Solana:", error);
    return false;
  }
}

async function checkBSCTransaction(walletAddress: string, amount: number): Promise<boolean> {
  try {
    const apiKey = process.env.BSCSCAN_API_KEY;
    if (!apiKey) {
      console.log("⚠️ BSCSCAN_API_KEY not set, skipping BNB check");
      return false;
    }
    
    const response = await fetch(
      `https://api.bscscan.com/api?module=account&action=txlist&address=${walletAddress}&sort=desc&apikey=${apiKey}`
    );
    const data = await response.json();
    
    if (data.status === "1") {
      const transactions = data.result || [];
      const matched = transactions.find((tx: any) => {
        const value = parseFloat(tx.value) / 1e18;
        return value >= amount - 0.01;
      });
      
      if (matched) {
        console.log(`✅ BNB transaction found: ${matched.hash}`);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking BSC:", error);
    return false;
  }
}

export async function GET() {
  try {
    console.log(`[${new Date().toISOString()}] 🔍 Checking pending crypto payments...`);
    
    // Ambil semua payment dengan status PENDING
    const pendingPayments = await db
      .select()
      .from(paymentHistory)
      .where(eq(paymentHistory.status, "PENDING"));

    // Filter yang metode pembayarannya CRYPTO
    const cryptoPayments = pendingPayments.filter(p => 
      p.paymentMethod && p.paymentMethod.startsWith("CRYPTO_")
    );

    console.log(`📦 Found ${cryptoPayments.length} pending crypto payments`);

    let confirmedCount = 0;

    for (const payment of cryptoPayments) {
      const cryptoType = payment.paymentMethod?.replace("CRYPTO_", "");
      let isPaid = false;
      
      console.log(`🔍 Checking ${cryptoType} payment ${payment.id} for amount ${payment.amount}`);
      
      switch (cryptoType) {
        case "USDT":
          isPaid = await checkTronTransaction("TG8ZJ1P8SmE6RBzGjkTmHRMefbZgBTxHX6", payment.amount, "USDT");
          break;
        case "TRX":
          isPaid = await checkTronTransaction("TL1VVFVGksrQBf71wh2GjG9mQcq283BkQm", payment.amount, "TRX");
          break;
        case "USDC":
          isPaid = await checkSolanaTransaction("Ggdx2LxwsLGZ2AqXvhA6dtCpmtLbTatmwe8Qcx3z3CNs", payment.amount);
          break;
        case "SOL":
          isPaid = await checkSolanaTransaction("GgestpBTno5TMCWhLFmtqdfa3DbTqVRjniEeRJrg3uKX", payment.amount);
          break;
        case "BNB":
          isPaid = await checkBSCTransaction("0xabae661722e6aa7cce963f82f64513010e10d48b", payment.amount);
          break;
      }
      
      if (isPaid) {
        console.log(`✅ Payment confirmed for ${payment.id}`);
        confirmedCount++;
        
        await db
          .update(paymentHistory)
          .set({ status: "COMPLETED", updatedAt: new Date() })
          .where(eq(paymentHistory.id, payment.id));
        
        await db.insert(order).values({
          id: uuidv4(),
          telegramId: payment.telegramId,
          orderNo: payment.orderNo,
          txId: `CRYPTO-${Date.now()}`,
          amount: payment.amount,
          status: "COMPLETED",
          paymentMethod: payment.paymentMethod,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        console.log(`✅ Order created for ${payment.telegramId}`);
        
        // TODO: Aktivasi eSIM via API
      }
    }

    return NextResponse.json({ 
      success: true, 
      checked: cryptoPayments.length,
      confirmed: confirmedCount,
      message: "Cron job completed"
    });
  } catch (error) {
    console.error("Error checking crypto payments:", error);
    return NextResponse.json({ error: "Failed to check payments" }, { status: 500 });
  }
}
