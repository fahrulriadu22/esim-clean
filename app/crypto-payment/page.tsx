"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy, CheckCircle, Loader2, X } from "lucide-react";
import QRCode from "react-qr-code";

// Main crypto options (5 coins) dengan logo langsung dari CoinPayments
const CRYPTO_OPTIONS = [
  { 
    id: "USDT", 
    name: "Tether USD", 
    symbol: "USDT", 
    network: "TRC20", 
    minAmount: 1,
    logo: "https://a-api.coinpayments.net/api/v1/currencies/9:TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/logosvg"
  },
  { 
    id: "TRX", 
    name: "TRON", 
    symbol: "TRX", 
    network: "TRX", 
    minAmount: 0.5,
    logo: "https://a-api.coinpayments.net/api/v1/currencies/9/logosvg"
  },
  { 
    id: "USDC", 
    name: "USD Coin", 
    symbol: "USDC", 
    network: "Solana", 
    minAmount: 1,
    logo: "https://a-api.coinpayments.net/api/v1/currencies/55:EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logosvg"
  },
  { 
    id: "SOL", 
    name: "Solana", 
    symbol: "SOL", 
    network: "Solana", 
    minAmount: 0.1,
    logo: "https://a-api.coinpayments.net/api/v1/currencies/55/logosvg"
  },
  { 
    id: "BNB", 
    name: "BNB", 
    symbol: "BNB", 
    network: "BSC", 
    minAmount: 0.01,
    logo: "https://a-api.coinpayments.net/api/v1/currencies/35/logosvg"
  },
];

function CryptoPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");
  const [paymentData, setPaymentData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [showMoreCoins, setShowMoreCoins] = useState(false);
  const [moreCoins, setMoreCoins] = useState<any[]>([]);
  const [loadingCoins, setLoadingCoins] = useState(false);
  const [allCoins, setAllCoins] = useState<any[]>([]);
const [copiedAmount, setCopiedAmount] = useState(false);
  
  // Ref untuk scroll ke payment details
  const paymentDetailsRef = useRef<HTMLDivElement>(null);
  
  const planData = {
    name: searchParams.get("name") || "",
    price: parseFloat(searchParams.get("price") || "0"),
    data: searchParams.get("data") || "",
    duration: parseInt(searchParams.get("duration") || "0"),
    code: searchParams.get("code") || "",
    tg: searchParams.get("tg") || "",
  };
  
  // Fetch all coins from API
  useEffect(() => {
    fetchAllCoins();
  }, []);
  
  const fetchAllCoins = async () => {
    try {
      const response = await fetch("/api/coinpayments/currencies");
      const data = await response.json();
      if (data.success) {
        setAllCoins(data.data);
        // Filter more coins (yang bukan 5 utama)
        const filtered = data.data.filter(
          (coin: any) => !CRYPTO_OPTIONS.some(c => c.id === coin.symbol)
        );
        setMoreCoins(filtered);
      }
    } catch (err) {
      console.error("Failed to fetch coins:", err);
    }
  };
  
  // Fetch more coins when showMoreCoins is true
  useEffect(() => {
    if (showMoreCoins && moreCoins.length === 0 && allCoins.length === 0) {
      fetchAllCoins();
    }
  }, [showMoreCoins]);
  
  // Fungsi untuk dapetin info coin (termasuk network untuk more coins)
  const getCoinInfo = (symbol: string) => {
    // Cari di 5 coin utama dulu
    const mainCoin = CRYPTO_OPTIONS.find(c => c.id === symbol);
    if (mainCoin) return mainCoin;
    
    // Cari di allCoins dari API
    const coinFromApi = allCoins.find(c => c.symbol === symbol);
    if (coinFromApi) {
      return {
        id: coinFromApi.symbol,
        name: coinFromApi.name,
        symbol: coinFromApi.symbol,
        network: coinFromApi.network,
        minAmount: coinFromApi.minAmount || 0.01,
        logo: coinFromApi.logo,
      };
    }
    
    // Fallback dari paymentData
    return {
      id: symbol,
      name: symbol,
      symbol: symbol,
      network: paymentData?.network || "Unknown",
      minAmount: 0.01,
    };
  };
  
  const selectedCryptoInfo = getCoinInfo(selectedCrypto);
  
  // Fungsi scroll ke payment details
  const scrollToPaymentDetails = () => {
    setTimeout(() => {
      paymentDetailsRef.current?.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }, 150);
  };

  const createPayment = async () => {
    setLoading(true);
    setError(null);
    setShowErrorModal(false);
    
    try {
      let telegramId = "";
      
      if (planData.tg) {
        try {
          const decodedTg = decodeURIComponent(planData.tg);
          const urlParams = new URLSearchParams(decodedTg);
          const userStr = urlParams.get("user");
          if (userStr) {
            const userData = JSON.parse(decodeURIComponent(userStr));
            telegramId = userData.id.toString();
          }
        } catch (e) {}
      }
      
      if (!telegramId) {
        setErrorMessage("Telegram ID not found");
        setShowErrorModal(true);
        setLoading(false);
        return;
      }
      
      const response = await fetch("/api/coinpayments/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: planData.price,
          sku: planData.code,
          crypto: selectedCrypto,
          orderId: `ORDER-${Date.now()}`,
          telegramId: telegramId,
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setErrorMessage(data.error);
        setShowErrorModal(true);
        setLoading(false);
        return;
      }
      
      setPaymentData(data.data);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to create payment");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    createPayment();
    scrollToPaymentDetails();
  }, [selectedCrypto]);
  
  const handleCopy = () => {
    if (paymentData?.walletAddress) {
      navigator.clipboard.writeText(paymentData.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  if (loading && !paymentData && !showErrorModal) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        {/* Package Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{planData.name}</p>
                <p className="text-xs text-muted-foreground">
                  {planData.data}GB • {planData.duration} Days
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${planData.price.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Crypto Selection (5 coins) */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Popular Cryptocurrencies</h2>
            <div className="grid grid-cols-2 gap-3">
              {CRYPTO_OPTIONS.map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => setSelectedCrypto(crypto.id)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    selectedCrypto === crypto.id
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                      : "border-gray-200 hover:border-orange-300 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {crypto.logo && (
                      <img 
                        src={crypto.logo} 
                        alt={crypto.symbol} 
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <span className="text-xl font-semibold">{crypto.symbol}</span>
                    <span className="text-sm text-muted-foreground">{crypto.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{crypto.network}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Min: ${crypto.minAmount}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>        
        
        {/* More Coins from CoinPayments */}
        <Card>
          <CardContent className="p-6">
            <button
              onClick={() => setShowMoreCoins(!showMoreCoins)}
              className="w-full flex items-center justify-between"
            >
              <span className="text-sm font-medium">More Cryptocurrencies</span>
              <span className="text-xs text-muted-foreground">
                {showMoreCoins ? "▼" : "▶"} from CoinPayments
              </span>
            </button>
            
            {showMoreCoins && (
              <div className="mt-4">
                {moreCoins.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                    {moreCoins.map((coin) => (
                      <button
                        key={coin.id}
                        onClick={() => setSelectedCrypto(coin.symbol)}
                        className={`p-2 rounded-lg border transition-all text-left ${
                          selectedCrypto === coin.symbol
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                            : "border-gray-200 hover:border-orange-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {coin.logo && (
                            <img 
                              src={coin.logo} 
                              alt={coin.symbol} 
                              className="w-5 h-5 rounded-full"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          )}
                          <span className="font-mono font-medium text-sm">{coin.symbol}</span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{coin.name}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    {loadingCoins ? "Loading coins..." : "No additional coins found"}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
{/* Payment Details */}
{paymentData && selectedCryptoInfo && (
  <div ref={paymentDetailsRef}>
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border">
            <QRCode value={paymentData.walletAddress} size={120} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Scan to pay</p>
        </div>
        
        <div className="space-y-2">
          <Label>Network</Label>
          <div className="p-3 bg-muted rounded-lg font-mono text-sm">
            {selectedCryptoInfo.network}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Wallet Address</Label>
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-xs break-all">
              {paymentData.walletAddress}
            </div>
            <Button variant="outline" onClick={handleCopy} className="shrink-0">
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Amount to Send</Label>
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-lg font-bold text-center">
              {paymentData.amount} {selectedCrypto}
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                navigator.clipboard.writeText(paymentData.amount.toString());
                setCopiedAmount(true);
                setTimeout(() => setCopiedAmount(false), 2000);
              }} 
              className="shrink-0"
            >
              {copiedAmount ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          {paymentData.usdAmount && (
            <p className="text-xs text-muted-foreground text-center">
              ≈ ${paymentData.usdAmount.toFixed(2)} USD
            </p>
          )}
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-sm text-yellow-800 dark:text-yellow-400">
          <p>⚠ Send exactly {paymentData.amount} {selectedCrypto} to the address above.</p>
          <p className="text-xs mt-1">Payment will be confirmed within 15-30 minutes.</p>
        </div>
      </CardContent>
    </Card>
  </div>
)}
        
        {/* Modal Error */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <button 
                    onClick={() => setShowErrorModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Failed</h3>
                  <p className="text-sm text-muted-foreground">{errorMessage}</p>
                </div>
                
                <Button 
                  onClick={() => setShowErrorModal(false)} 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Try Another Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CryptoPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <CryptoPaymentContent />
    </Suspense>
  );
}
