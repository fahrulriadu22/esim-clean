"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   ArrowLeft,
   Bitcoin,
   Loader2,
   CheckCircle,
   XCircle,
   Copy,
   ExternalLink,
   LogOut,
} from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { convertUsdToTon, getTonPrice } from "@/lib/coingecko";
import {
   useTonConnect,
   formatTonAddress,
   RECIPIENT_ADDRESS,
} from "@/lib/ton-connect";
import { Address, toNano } from "@ton/core";

interface TonTopupPageProps {
   amount: number;
   onBack: () => void;
   onSuccess: () => void;
}

interface TonPriceData {
   tonAmount: number;
   tonPrice: number;
}

export function TonTopupPage({ amount, onBack, onSuccess }: TonTopupPageProps) {
   const { t } = useTranslations();
   const {
      connectWallet,
      disconnectWallet,
      sendTransaction,
      isConnected,
      wallet,
   } = useTonConnect();
   const [isLoadingPrice, setIsLoadingPrice] = useState(true);
   const [priceData, setPriceData] = useState<TonPriceData | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [isProcessing, setIsProcessing] = useState(false);
   const [transactionHash, setTransactionHash] = useState<string | null>(null);
   const [paymentStatus, setPaymentStatus] = useState<
      "pending" | "confirmed" | "failed"
   >("pending");
   const [referenceId, setReferenceId] = useState<string | null>(null);
   const [isInitializing, setIsInitializing] = useState(false);

   // Load TON price and initialize payment
   useEffect(() => {
      loadTonPriceAndInitPayment();
   }, [amount]);

   const loadTonPriceAndInitPayment = async () => {
      setIsLoadingPrice(true);
      setError(null);

      try {
         const tonPrice = await getTonPrice();
         const tonAmount = await convertUsdToTon(amount);

         setPriceData({
            tonAmount,
            tonPrice,
         });

         // Initialize payment
         await initializePayment();
      } catch (error) {
         setError(
            error instanceof Error ? error.message : "Failed to load TON price"
         );
      } finally {
         setIsLoadingPrice(false);
      }
   };

   const initializePayment = async () => {
      setIsInitializing(true);
      setError(null);

      try {
         const WebApp = await import("@twa-dev/sdk");

         const response = await fetch("/api/init-payment", {
            method: "POST",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               "X-Telegram-Data": WebApp.default.initData,
            },
            body: JSON.stringify({
               amount: Number(amount),
               paymentMethod: "TON",
               type: "TOPUP",
            }),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
               errorData.message || "Failed to initialize payment"
            );
         }

         const data = await response.json();
         setReferenceId(data.data.referenceId);
      } catch (error) {
         setError(
            error instanceof Error
               ? error.message
               : "Failed to initialize payment"
         );
      } finally {
         setIsInitializing(false);
      }
   };

   const handleCopyAddress = () => {
      navigator.clipboard.writeText(RECIPIENT_ADDRESS);
      // You could add a toast notification here
   };

   const handleCopyAmount = () => {
      if (priceData) {
         navigator.clipboard.writeText(priceData.tonAmount.toString());
         // You could add a toast notification here
      }
   };

   const handleConnectWallet = async () => {
      try {
         await connectWallet();
      } catch (error) {
         setError("Failed to connect wallet. Please try again.");
      }
   };

   const handleDisconnectWallet = async () => {
      try {
         await disconnectWallet();
      } catch (error) {
         setError("Failed to disconnect wallet. Please try again.");
      }
   };

   const handleSendTransaction = async () => {
      if (!priceData || !isConnected || !referenceId) {
         setError("Please wait for payment initialization to complete");
         return;
      }

      try {
         setIsProcessing(true);
         setPaymentStatus("pending");

         // Convert TON amount to nanoTON (1 TON = 10^9 nanoTON)
         const nanoTonAmount = toNano(priceData.tonAmount).toString();

         const txHash = await sendTransaction(
            RECIPIENT_ADDRESS,
            nanoTonAmount,
            referenceId
         );

         if (txHash && wallet) {
            setTransactionHash(txHash);
            pollTransactionStatus(
               Address.parse(wallet.account.address).toString({
                  bounceable: false,
               }) || ""
            );
         } else {
            throw new Error("Transaction failed");
         }
      } catch (error) {
         setIsProcessing(false);
         setPaymentStatus("failed");
         setError("Failed to send transaction. Please try again.");
      }
   };

   const handleTransactionSubmit = () => {
      const senderAddress = prompt("Please enter your TON wallet address:");
      if (senderAddress && senderAddress.trim()) {
         setTransactionHash("manual");
         setIsProcessing(true);
         setPaymentStatus("pending");
         pollTransactionStatus(senderAddress.trim());
      }
   };

   const pollTransactionStatus = async (senderAddress: string) => {
      const maxAttempts = 30; // Poll for 5 minutes (30 * 10 seconds)
      let attempts = 0;

      const poll = async () => {
         try {
            const response = await fetch(
               `/api/verify-ton?senderAddress=${encodeURIComponent(
                  senderAddress
               )}`,
               {
                  method: "GET",
                  headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                  },
               }
            );

            if (response.ok) {
               const data = await response.json();
               if (data.success) {
                  setIsProcessing(false);
                  setPaymentStatus("confirmed");
                  onSuccess();
                  return;
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
            setPaymentStatus("failed");
            setError(
               "Transaction verification timeout. Please check your transaction status manually."
            );
         }
      };

      // Start polling after a short delay
      setTimeout(poll, 5000);
   };

   if (error && !isLoadingPrice) {
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
                        TON Payment Error
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
                        <Button
                           onClick={loadTonPriceAndInitPayment}
                           className="w-full"
                        >
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

   if (isLoadingPrice) {
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
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                     <Bitcoin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                     <h1 className="text-xl font-bold text-foreground">
                        TON Payment
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
                        Loading TON price...
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
               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bitcoin className="w-4 h-4 text-white" />
               </div>
               <div>
                  <h1 className="text-xl font-bold text-foreground">
                     TON Payment
                  </h1>
               </div>
            </div>
         </div>

         {/* TON Amount Display */}
         {priceData && (
            <Card>
               <CardContent className="p-6">
                  <div className="text-center space-y-4">
                     <h3 className="font-semibold text-foreground">
                        TON Amount
                     </h3>
                     <div className="text-3xl font-bold text-primary">
                        {priceData.tonAmount.toFixed(4)} TON
                     </div>
                     <p className="text-sm text-muted-foreground">
                        1 TON = ${priceData.tonPrice.toFixed(2)}
                     </p>
                  </div>
               </CardContent>
            </Card>
         )}

         {/* Wallet Connection Status */}
         <Card>
            <CardContent className="p-6">
               <h3 className="font-semibold text-foreground mb-4">
                  Wallet Connection
               </h3>
               {isConnected ? (
                  <div className="space-y-3">
                     <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">
                           Wallet Connected
                        </span>
                     </div>
                     <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                           Address:
                        </p>
                        <code className="text-sm font-mono text-foreground">
                           {wallet?.account?.address
                              ? formatTonAddress(
                                   Address.parse(
                                      wallet.account.address
                                   ).toString({
                                      bounceable: false,
                                   })
                                )
                              : "Unknown"}
                        </code>
                     </div>
                     <Button
                        onClick={handleDisconnectWallet}
                        variant="outline"
                        className="w-full"
                     >
                        <LogOut className="w-4 h-4 mr-2" />
                        Disconnect Wallet
                     </Button>
                  </div>
               ) : (
                  <div className="space-y-3">
                     <div className="flex items-center space-x-2 text-orange-600">
                        <XCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">
                           Wallet Not Connected
                        </span>
                     </div>
                     <Button onClick={handleConnectWallet} className="w-full">
                        Connect TON Wallet
                     </Button>
                  </div>
               )}
            </CardContent>
         </Card>

         {/* Payment Actions */}
         {!transactionHash && (
            <div className="space-y-3">
               {isConnected ? (
                  <Button
                     onClick={handleSendTransaction}
                     disabled={!priceData || !referenceId || isInitializing}
                     className="w-full py-3 text-lg font-semibold"
                  >
                     <div className="flex items-center space-x-2">
                        <Bitcoin className="w-5 h-5" />
                        <span>
                           {isInitializing
                              ? "Initializing Payment..."
                              : `Send ${priceData?.tonAmount.toFixed(4)} TON`}
                        </span>
                     </div>
                  </Button>
               ) : (
                  <Button
                     onClick={handleConnectWallet}
                     className="w-full py-3 text-lg font-semibold"
                  >
                     <div className="flex items-center space-x-2">
                        <ExternalLink className="w-5 h-5" />
                        <span>Connect Wallet to Pay</span>
                     </div>
                  </Button>
               )}

               <Button variant="outline" onClick={onBack} className="w-full">
                  Cancel
               </Button>
            </div>
         )}

         {/* Processing Status */}
         {isProcessing && (
            <Card>
               <CardContent className="p-4">
                  <div className="text-center space-y-2">
                     <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                     <p className="text-sm text-muted-foreground">
                        Verifying transaction...
                     </p>
                     <p className="text-xs text-muted-foreground">
                        Hash: {transactionHash?.slice(0, 8)}...
                        {transactionHash?.slice(-8)}
                     </p>
                  </div>
               </CardContent>
            </Card>
         )}

         {/* Payment Status */}
         {paymentStatus === "confirmed" && (
            <Card>
               <CardContent className="p-4">
                  <div className="text-center space-y-2">
                     <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                     <p className="text-sm font-semibold text-green-600">
                        Payment Confirmed!
                     </p>
                     <p className="text-xs text-muted-foreground">
                        Your balance has been updated
                     </p>
                  </div>
               </CardContent>
            </Card>
         )}

         {paymentStatus === "failed" && (
            <Card>
               <CardContent className="p-4">
                  <div className="text-center space-y-2">
                     <XCircle className="mx-auto h-8 w-8 text-red-500" />
                     <p className="text-sm font-semibold text-red-600">
                        Payment Verification Failed
                     </p>
                     <p className="text-xs text-muted-foreground">
                        Please check your transaction and try again
                     </p>
                  </div>
               </CardContent>
            </Card>
         )}
      </div>
   );
}
