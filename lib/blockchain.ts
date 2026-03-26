// Fungsi untuk cek transaksi USDT TRC20
async function checkUSDTTransaction(walletAddress: string, amount: number): Promise<boolean> {
  try {
    // Gunakan API TronGrid
    const response = await fetch(
      `https://api.trongrid.io/v1/accounts/${walletAddress}/transactions/trc20?limit=10`
    );
    const data = await response.json();
    
    // Cek apakah ada transaksi dengan jumlah yang sesuai
    const transactions = data.data || [];
    const matchedTx = transactions.find((tx: any) => {
      const value = parseFloat(tx.value) / 1e6; // USDT memiliki 6 decimals
      return tx.token_info.symbol === 'USDT' && value >= amount;
    });
    
    return !!matchedTx;
  } catch (error) {
    console.error("Error checking USDT:", error);
    return false;
  }
}

// Fungsi untuk cek transaksi TRX
async function checkTRXTransaction(walletAddress: string, amount: number): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.trongrid.io/v1/accounts/${walletAddress}/transactions?limit=10`
    );
    const data = await response.json();
    
    const transactions = data.data || [];
    const matchedTx = transactions.find((tx: any) => {
      const value = parseFloat(tx.raw_data.contract[0].parameter.value.amount) / 1e6;
      return value >= amount;
    });
    
    return !!matchedTx;
  } catch (error) {
    console.error("Error checking TRX:", error);
    return false;
  }
}

// Fungsi untuk cek transaksi SOL
async function checkSOLTransaction(walletAddress: string, amount: number): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.mainnet-beta.solana.com`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getSignaturesForAddress",
          params: [walletAddress, { limit: 10 }],
        }),
      }
    );
    const data = await response.json();
    
    // Sederhana: return true kalo ada transaksi (perlu improvement)
    return data.result && data.result.length > 0;
  } catch (error) {
    console.error("Error checking SOL:", error);
    return false;
  }
}

// Fungsi untuk cek transaksi BNB BSC
async function checkBNBTransaction(walletAddress: string, amount: number): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.bscscan.com/api?module=account&action=txlist&address=${walletAddress}&sort=desc&apikey=${process.env.BSCSCAN_API_KEY}`
    );
    const data = await response.json();
    
    if (data.status === "1") {
      const transactions = data.result || [];
      const matchedTx = transactions.find((tx: any) => {
        return parseFloat(tx.value) / 1e18 >= amount;
      });
      return !!matchedTx;
    }
    return false;
  } catch (error) {
    console.error("Error checking BNB:", error);
    return false;
  }
}

export const checkTransaction = {
  USDT: checkUSDTTransaction,
  TRX: checkTRXTransaction,
  SOL: checkSOLTransaction,
  BNB: checkBNBTransaction,
  USDC: checkSOLTransaction, // USDC di Solana
};
