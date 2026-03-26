"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   ArrowLeft,
   DollarSign,
   CreditCard,
   Loader2,
   ExternalLink,
   CheckCircle,
   XCircle,
} from "lucide-react";
import { useTranslations } from "@/lib/i18n";

interface PayPalTopupPageProps {
   amount: number;
   onBack: () => void;
   onSuccess: () => void;
}

interface PayPalOrderResponse {
   id: string;
   status: string;
   payLink: string;
   payment: {
      referenceId: string;
      amount: number;
      paymentMethod: string;
      status: string;
      paymentType: string;
      telegramId: string;
   };
}

export function PayPalTopupPage({
   amount,
   onBack,
   onSuccess,
}: PayPalTopupPageProps) {
   const { t } = useTranslations();
   const [isCreatingOrder, setIsCreatingOrder] = useState(false);
   const [orderData, setOrderData] = useState<PayPalOrderResponse | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [isProcessing, setIsProcessing] = useState(false);

   // Create PayPal order when component mounts
   useEffect(() => {
      createPayPalOrder();
   }, []);

   const createPayPalOrder = async () => {
      setIsCreatingOrder(true);
      setError(null);

      try {
         const WebApp = await import("@twa-dev/sdk");

         // Validate user data
         const telegramId = WebApp.default.initDataUnsafe.user?.id;
         if (!telegramId) {
            throw new Error(
               "User authentication required. Please refresh the page."
            );
         }

         const response = await fetch("/api/paypal/create", {
            method: "POST",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               "X-Telegram-Data": WebApp.default.initData,
            },
            body: JSON.stringify({
               amount: Number(amount),
               type: "TOPUP",
               telegramId: String(telegramId),
            }),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create PayPal order");
         }

         const data = await response.json();
         setOrderData(data);
      } catch (error) {
         setError(
            error instanceof Error ? error.message : "Failed to create payment"
         );
      } finally {
         setIsCreatingOrder(false);
      }
   };

   const handlePayPalPayment = () => {
      if (orderData?.payLink) {
         setIsProcessing(true);
         // Open PayPal payment in new window/tab
         window.open(orderData.payLink, "_blank");

         // Start polling for payment status
         pollPaymentStatus();
      }
   };

   const pollPaymentStatus = async () => {
      if (!orderData?.payment?.referenceId) return;

      const maxAttempts = 30; // Poll for 5 minutes (30 * 10 seconds)
      let attempts = 0;

      const poll = async () => {
         try {
            const WebApp = await import("@twa-dev/sdk");
            const response = await fetch("/api/topup-history", {
               method: "GET",
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Telegram-Data": WebApp.default.initData,
               },
            });

            if (response.ok) {
               const data = await response.json();
               if (data.success) {
                  const recentTopup = data.data.topups.find(
                     (topup: any) =>
                        topup.referenceId === orderData.payment.referenceId
                  );

                  if (recentTopup && recentTopup.status === "COMPLETED") {
                     setIsProcessing(false);
                     onSuccess();
                     return;
                  }
               }
            }
         } catch (error) {
            // Silent error handling
         }

         attempts++;
         if (attempts < maxAttempts) {
            setTimeout(poll, 10000); // Poll every 10 seconds
         } else {
            setIsProcessing(false);
            setError(
               "Payment verification timeout. Please check your payment status manually."
            );
         }
      };

      // Start polling after a short delay
      setTimeout(poll, 5000);
   };

   if (error) {
      return (
         <div className="p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4 py-4">
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="p-2"
               >
                  <ArrowLeft className="w-5 h-5" />
               </Button>
               <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                     <XCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                     <h1 className="text-xl font-bold text-foreground">
                        Payment Error
                     </h1>
                  </div>
               </div>
            </div>

            {/* Error Message */}
            <Card>
               <CardContent className="p-6">
                  <div className="text-center space-y-4">
                     <XCircle className="mx-auto h-16 w-16 text-red-500" />
                     <h2 className="text-lg font-semibold text-foreground">
                        Payment Failed
                     </h2>
                     <p className="text-sm text-muted-foreground">{error}</p>
                     <div className="space-y-2">
                        <Button onClick={createPayPalOrder} className="w-full">
                           Try Again
                        </Button>
                        <Button
                           variant="outline"
                           onClick={onBack}
                           className="w-full"
                        >
                           Go Back
                        </Button>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   if (isCreatingOrder) {
      return (
         <div className="p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4 py-4">
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="p-2"
               >
                  <ArrowLeft className="w-5 h-5" />
               </Button>
               <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                     <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div>
                     <h1 className="text-xl font-bold text-foreground">
                        PayPal Payment
                     </h1>
                  </div>
               </div>
            </div>

            {/* Loading */}
            <Card>
               <CardContent className="p-6">
                  <div className="text-center space-y-4">
                     <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                     <p className="text-sm text-muted-foreground">
                        Creating PayPal payment...
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   return (
      <div className="p-4 space-y-6">
         {/* Header */}
         <div className="flex items-center space-x-4 py-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
               <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
               </div>
               <div>
                  <h1 className="text-xl font-bold text-foreground">
                     PayPal Payment
                  </h1>
               </div>
            </div>
         </div>

         {/* Payment Summary */}
         <Card>
            <CardContent className="p-6">
               <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                     <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-bold text-foreground">
                        ${amount.toFixed(2)}
                     </h2>
                     <p className="text-sm text-muted-foreground">
                        Top up your balance
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Payment Instructions */}
         <Card>
            <CardContent className="p-6">
               <h3 className="font-semibold text-foreground mb-4">
                  Payment Instructions
               </h3>
               <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-3">
                     <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">
                           1
                        </span>
                     </div>
                     <p>Click "Pay with PayPal" to open the payment page</p>
                  </div>
                  <div className="flex items-start space-x-3">
                     <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">
                           2
                        </span>
                     </div>
                     <p>Complete the payment on PayPal's secure platform</p>
                  </div>
                  <div className="flex items-start space-x-3">
                     <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">
                           3
                        </span>
                     </div>
                     <p>
                        Return to this page - your balance will be updated
                        automatically
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Payment Button */}
         <div className="space-y-3">
            <Button
               onClick={handlePayPalPayment}
               disabled={isProcessing}
               className="w-full py-3 text-lg font-semibold"
            >
               {isProcessing ? (
                  <div className="flex items-center space-x-2">
                     <Loader2 className="w-5 h-5 animate-spin" />
                     <span>Processing Payment...</span>
                  </div>
               ) : (
                  <div className="flex items-center space-x-2">
                     <ExternalLink className="w-5 h-5" />
                     <span>Pay with PayPal</span>
                  </div>
               )}
            </Button>

            <Button variant="outline" onClick={onBack} className="w-full">
               Cancel
            </Button>
         </div>

         {/* Processing Status */}
         {isProcessing && (
            <Card>
               <CardContent className="p-4">
                  <div className="text-center space-y-2">
                     <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                     <p className="text-sm text-muted-foreground">
                        Waiting for payment confirmation...
                     </p>
                     <p className="text-xs text-muted-foreground">
                        Please complete the payment and return to this page
                     </p>
                  </div>
               </CardContent>
            </Card>
         )}
      </div>
   );
}
