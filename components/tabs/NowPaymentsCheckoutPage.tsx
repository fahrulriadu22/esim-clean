"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bitcoin,
  Copy,
  ExternalLink,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wallet,
} from "lucide-react";
import { Package } from "@/hooks/usePackages";

interface NowPaymentsCheckoutPageProps {
  plan: Package;
  onBack: () => void;
  onSuccess: () => void;
}

interface PaymentData {
  paymentId: string;
  paymentUrl: string;
  referenceId: string;
  amount: number;
  currency: string;
}

export function NowPaymentsCheckoutPage({
  plan,
  onBack,
  onSuccess,
}: NowPaymentsCheckoutPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "waiting" | "confirmed" | "failed"
  >("waiting");
  const [showIframe, setShowIframe] = useState(false);

  // Create payment on mount
  useEffect(() => {
    createPayment();
  }, []);

  // Poll payment status
  useEffect(() => {
    if (paymentData?.paymentId && paymentStatus === "waiting") {
      const interval = setInterval(() => {
        checkPaymentStatus(paymentData.paymentId);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [paymentData, paymentStatus]);

  const createPayment = async () => {
    try {
      // Ambil Telegram data
      let telegramData = "";
      if (typeof window !== "undefined" && window.Telegram?.WebApp?.initData) {
        telegramData = window.Telegram.WebApp.initData;
      }

      if (!telegramData) {
        throw new Error("Telegram data not found");
      }

      // Panggil API dengan currency fix USDT
      const res = await fetch("/api/nowpayments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Telegram-Data": telegramData,
        },
        body: JSON.stringify({
          amount: plan.price,
          sku: plan.code,
          selectedCurrency: "USDT", // FORCE USDT
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment creation failed");
      }

      setPaymentData(data.data);
      
      // Tampilkan iframe setelah dapat URL
      if (data.data.paymentUrl) {
        setShowIframe(true);
      }
      
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Failed to create payment");
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/nowpayments/status?paymentId=${paymentId}`);

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const status = data.data.payment_status;
          if (status === "finished" || status === "confirmed") {
            setPaymentStatus("confirmed");
            setShowIframe(false);
            onSuccess();
          } else if (status === "failed" || status === "expired") {
            setPaymentStatus("failed");
            setShowIframe(false);
          }
        }
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">USDT Payment</h1>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
            <p className="mt-2">Creating USDT invoice...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Payment Failed</h1>
        </div>
        <Card>
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

  if (paymentStatus === "confirmed") {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Payment Successful</h1>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <p className="mt-2">Your eSIM is being activated</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <Wallet className="w-6 h-6 text-purple-600" />
          <h1 className="text-xl font-bold">USDT Payment</h1>
        </div>
      </div>

      {/* Package Info */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">{plan.name}</h3>
            <div className="text-2xl font-bold text-primary">
              ${plan.price}
            </div>
            <p className="text-sm text-muted-foreground">
              Pay with USDT (TRC-20)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Iframe */}
      {showIframe && paymentData?.paymentUrl && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <iframe
              src={paymentData.paymentUrl}
              className="w-full h-[600px] border-0"
              title="USDT Payment"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => console.log("Iframe loaded")}
              onError={() => setError("Failed to load payment page")}
            />
          </CardContent>
        </Card>
      )}

      {/* Manual Payment Info (Fallback if iframe fails) */}
      {!showIframe && paymentData?.paymentUrl && (
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
            <p className="text-sm">
              If payment page doesn't load automatically, click the button below
            </p>
            <Button
              onClick={() => window.open(paymentData.paymentUrl, "_blank")}
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Payment Page
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Payment Status */}
      {paymentStatus === "waiting" && paymentData && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Waiting for payment...</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Invoice: {paymentData.paymentId.slice(0, 8)}...
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
