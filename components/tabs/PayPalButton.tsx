"use client";

import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface PayPalButtonProps {
  amount: number;
  sku: string;
  telegramData: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  paymentMethod: "paypal" | "card";
}

export function PayPalButton({
  amount,
  sku,
  telegramData,
  onSuccess,
  onError,
  paymentMethod,
}: PayPalButtonProps) {
  const [isReady, setIsReady] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Buat order di backend kita
  const createOrder = async () => {
    try {
      // Extract telegram ID
      const urlParams = new URLSearchParams(telegramData);
      const userParam = urlParams.get("user");
      const userData = JSON.parse(decodeURIComponent(userParam!));
      const telegramId = userData.id;

      const response = await fetch("/api/paypal/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Telegram-Data": telegramData,
        },
        body: JSON.stringify({
          amount: amount,
          type: "ORDER",
          telegramId: String(telegramId),
          sku: sku,
          paymentMethod: paymentMethod,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      setOrderId(data.id);
      return data.id;
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to create order");
      throw error;
    }
  };

  // Konfigurasi PayPal berdasarkan metode
  const paypalOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    intent: "capture",
    components: paymentMethod === "card" ? "buttons,card-fields" : "buttons",
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      {!isReady && (
        <Card>
          <CardContent className="p-6 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
            <p className="mt-2 text-sm text-muted-foreground">
              Loading payment form...
            </p>
          </CardContent>
        </Card>
      )}
      
      <PayPalButtons
        style={{
          layout: "vertical",
          color: paymentMethod === "card" ? "blue" : "gold",
          shape: "rect",
          label: paymentMethod === "card" ? "pay" : "paypal",
        }}
        createOrder={createOrder}
        onApprove={async (data, actions) => {
          try {
            // Capture order
            const response = await fetch(`/api/paypal/capture/${data.orderID}`, {
              method: "POST",
              headers: {
                "X-Telegram-Data": telegramData,
              },
            });
            
            const result = await response.json();
            
            if (result.success) {
              onSuccess();
            } else {
              onError("Payment failed");
            }
          } catch (error) {
            onError("Payment failed");
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError("Payment failed. Please try again.");
        }}
        onInit={() => setIsReady(true)}
      />
    </PayPalScriptProvider>
  );
}
