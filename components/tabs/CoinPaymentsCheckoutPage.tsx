"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bitcoin,
  ExternalLink,
  Loader2,
  CheckCircle,
  XCircle,
  Wallet,
} from "lucide-react";
import { Package } from "@/hooks/usePackages";

interface Props {
  plan: Package;
  onBack: () => void;
  onSuccess: () => void;
}

export function CoinPaymentsCheckoutPage({ plan, onBack, onSuccess }: Props) {
  const [loading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    createPayment();
  }, []);

  const createPayment = async () => {
    try {
      let telegramData = "";
      if (typeof window !== "undefined" && window.Telegram?.WebApp?.initData) {
        telegramData = window.Telegram.WebApp.initData;
      }

      const response = await fetch("/api/coinpayments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Telegram-Data": telegramData,
        },
        body: JSON.stringify({
          amount: plan.price,
          sku: plan.code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment creation failed");
      }

      setPaymentUrl(data.data.checkoutUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create payment");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
      // Polling untuk cek status
      onSuccess(); // Sementara, nanti tambah polling
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Card className="mt-4">
          <CardContent className="p-6 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
            <p className="mt-2">Creating payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Card className="mt-4">
          <CardContent className="p-6 text-center">
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <p className="mt-2 text-red-600">{error}</p>
            <Button onClick={createPayment} className="mt-4 w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">${plan.price}</h2>
          <p className="text-sm text-muted-foreground mt-2">{plan.name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Pay with BTC, ETH, USDT, LTC
          </p>
        </CardContent>
      </Card>

      <Button onClick={handlePay} className="w-full py-6 text-lg">
        <ExternalLink className="w-5 h-5 mr-2" />
        Pay with Crypto
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        You'll be redirected to CoinPayments secure payment page
      </p>
    </div>
  );
}
