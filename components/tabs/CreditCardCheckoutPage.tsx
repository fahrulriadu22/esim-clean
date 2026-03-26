"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Loader2, CheckCircle } from "lucide-react";
import { CardPaymentForm } from "./CardPaymentForm";

interface CreditCardCheckoutPageProps {
   amount: number;
   sku: string;
   telegramId: string;
   onBack: () => void;
   onSuccess: () => void;
}

export function CreditCardCheckoutPage({
   amount,
   sku,
   telegramId,
   onBack,
   onSuccess,
}: CreditCardCheckoutPageProps) {
   const [success, setSuccess] = useState(false);
   const [paymentData, setPaymentData] = useState<any>(null);

   const handlePaymentSuccess = (data: any) => {
      setPaymentData(data);
      setSuccess(true);
      setTimeout(() => {
         onSuccess();
      }, 2000);
   };

   const handlePaymentError = (error: string) => {
      console.error("Payment error:", error);
   };

   if (success) {
      return (
         <div className="p-4 space-y-6">
            <Card>
               <CardContent className="p-6 text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h2 className="text-xl font-bold">Payment Successful!</h2>
                  <p className="text-muted-foreground">
                     Your eSIM is being prepared. You will receive it shortly.
                  </p>
                  <Button onClick={onSuccess} className="w-full">
                     Continue
                  </Button>
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
            <h1 className="text-xl font-bold">Credit Card Payment</h1>
         </div>

         {/* Amount */}
         <Card>
            <CardContent className="p-6 text-center">
               <p className="text-sm text-muted-foreground">Amount to Pay</p>
               <p className="text-3xl font-bold">${amount.toFixed(2)}</p>
               <p className="text-xs text-muted-foreground mt-1">SKU: {sku}</p>
            </CardContent>
         </Card>

         {/* Card Payment Form */}
         <CardPaymentForm
            amount={amount}
            sku={sku}
            telegramId={telegramId}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
         />

         {/* Security Note */}
         <p className="text-xs text-center text-muted-foreground">
            Your payment is secured by DOKU. We do not store your card details.
         </p>
      </div>
   );
}
