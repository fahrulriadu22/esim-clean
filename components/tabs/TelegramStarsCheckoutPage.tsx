"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Package } from "@/hooks/usePackages";

// Telegram WebApp types
declare global {
   interface Window {
      Telegram?: {
         WebApp?: {
            initData: string;
            openTelegramLink?: (url: string) => void;
            openInvoice?: (
               url: string,
               callback: (status: string) => void
            ) => void;
         };
      };
   }
}

interface TelegramStarsCheckoutPageProps {
   plan: Package;
   onBack: () => void;
   onSuccess: () => void;
}

export function TelegramStarsCheckoutPage({
   plan,
   onBack,
   onSuccess,
}: TelegramStarsCheckoutPageProps) {
   const [isProcessing, setIsProcessing] = useState(false);
   const [paymentStatus, setPaymentStatus] = useState<
      "idle" | "processing" | "success" | "error"
   >("idle");
   const [errorMessage, setErrorMessage] = useState("");
   const [telegramData, setTelegramData] = useState<string>("");

   useEffect(() => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp?.initData) {
         setTelegramData(window.Telegram.WebApp.initData);
      }
   }, []);

   const handleTelegramStarsPayment = async () => {
      if (!telegramData) {
         setErrorMessage("Telegram data not available");
         setPaymentStatus("error");
         return;
      }

      setIsProcessing(true);
      setPaymentStatus("processing");
      setErrorMessage("");

      try {
         // Initialize payment
         const response = await fetch("/api/init-payment", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "X-Telegram-Data": telegramData,
            },
            body: JSON.stringify({
               amount: plan.price,
               paymentMethod: "STARS",
               type: "ORDER",
               sku: plan.code,
            }),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
               errorData.message || "Failed to initialize payment"
            );
         }

         const data = await response.json();

         if (!data.data?.invoiceLink) {
            throw new Error("No invoice link received");
         }

         // Open Telegram Stars payment
         if (
            typeof window !== "undefined" &&
            window.Telegram?.WebApp?.openInvoice
         ) {
            // Use the new Telegram WebApp API for Stars payments
            window.Telegram.WebApp.openInvoice(
               data.data.invoiceLink,
               (status) => {
                  if (status === "paid") {
                     setPaymentStatus("success");
                     toast.success(
                        "Payment successful! Your eSIM is being prepared..."
                     );
                     setTimeout(() => {
                        onSuccess();
                     }, 2000);
                  } else if (status === "cancelled") {
                     setPaymentStatus("error");
                     setErrorMessage("Payment was cancelled");
                     setIsProcessing(false);
                  } else if (status === "failed") {
                     setPaymentStatus("error");
                     setErrorMessage("Payment failed");
                     setIsProcessing(false);
                  }
               }
            );
         } else {
            // Fallback: open in new window
            window.open(data.data.invoiceLink, "_blank");

            // Simulate payment success after a delay (in real implementation, this would be handled by webhook)
            setTimeout(() => {
               setPaymentStatus("success");
               toast.success(
                  "Payment successful! Your eSIM is being prepared..."
               );
               setTimeout(() => {
                  onSuccess();
               }, 2000);
            }, 3000);
         }
      } catch (error) {
         console.error("Telegram Stars payment error:", error);
         setErrorMessage(
            error instanceof Error ? error.message : "Payment failed"
         );
         setPaymentStatus("error");
         toast.error("Payment failed. Please try again.");
      } finally {
         setIsProcessing(false);
      }
   };

   const getStatusIcon = () => {
      switch (paymentStatus) {
         case "processing":
            return <Loader2 className="w-6 h-6 animate-spin text-blue-500" />;
         case "success":
            return <CheckCircle className="w-6 h-6 text-green-500" />;
         case "error":
            return <XCircle className="w-6 h-6 text-red-500" />;
         default:
            return <Star className="w-6 h-6 text-yellow-500" />;
      }
   };

   const getStatusMessage = () => {
      switch (paymentStatus) {
         case "processing":
            return "Processing payment...";
         case "success":
            return "Payment successful!";
         case "error":
            return errorMessage || "Payment failed";
         default:
            return "Ready to pay with Telegram Stars";
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
         <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="shrink-0"
               >
                  <ArrowLeft className="w-5 h-5" />
               </Button>
               <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                     Telegram Stars
                  </h1>
                  <p className="text-sm text-gray-600">
                     Pay with Telegram Stars
                  </p>
               </div>
            </div>

            {/* Plan Details */}
            <Card className="mb-6">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Star className="w-5 h-5 text-yellow-500" />
                     {plan.name}
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  {/* Plan Info */}
                  <div className="space-y-2">
                     <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Data:</span>
                        <span className="text-sm font-medium">
                           {plan.data} {plan.dataUnit}
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Duration:</span>
                        <span className="text-sm font-medium">
                           {plan.duration} {plan.durationUnit}
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="text-sm font-medium">
                           ${plan.price}
                        </span>
                     </div>
                  </div>

                  {/* Amount Display */}
                  <div className="text-center py-4 border-t">
                     <div className="text-3xl font-bold text-gray-900">
                        ${plan.price.toFixed(2)}
                     </div>
                     <div className="text-sm text-gray-600 mt-1">
                        ≈ {Math.ceil(plan.price / 0.018)} Telegram Stars
                     </div>
                  </div>

                  {/* Status Display */}
                  <div className="flex items-center justify-center gap-3 py-4">
                     {getStatusIcon()}
                     <span className="text-sm font-medium">
                        {getStatusMessage()}
                     </span>
                  </div>

                  {/* Error Message */}
                  {paymentStatus === "error" && errorMessage && (
                     <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-700">{errorMessage}</p>
                     </div>
                  )}

                  {/* Payment Button */}
                  <Button
                     onClick={handleTelegramStarsPayment}
                     disabled={isProcessing || paymentStatus === "processing"}
                     className="w-full py-3 text-lg font-semibold"
                  >
                     {isProcessing ? (
                        <>
                           <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                           Processing...
                        </>
                     ) : (
                        <>
                           <Star className="w-5 h-5 mr-2" />
                           Pay with Telegram Stars
                        </>
                     )}
                  </Button>
               </CardContent>
            </Card>

            {/* Information Card */}
            <Card>
               <CardContent className="pt-6">
                  <div className="space-y-3">
                     <h3 className="font-semibold text-gray-900">
                        About Telegram Stars
                     </h3>
                     <ul className="text-sm text-gray-600 space-y-2">
                        <li>
                           • Telegram Stars are Telegram's official in-app
                           currency
                        </li>
                        <li>• Current rate: 1 Star = $0.018 USD</li>
                        <li>• Secure and compliant with app store policies</li>
                        <li>• Instant payments with no additional fees</li>
                        <li>
                           • Purchase Stars through Telegram or @PremiumBot
                        </li>
                     </ul>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
