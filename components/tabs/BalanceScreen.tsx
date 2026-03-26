"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";
import {
   ArrowLeft,
   DollarSign,
   Minus,
   Plus,
   CreditCard,
   Bitcoin,
   Loader2,
   Star,
} from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { PayPalTopupPage } from "./PayPalTopupPage";
import { TonTopupPage } from "./TonTopupPage";
import { TelegramStarsTopupPage } from "./TelegramStarsTopupPage";
import { TransactionDetailModal } from "../modals/TransactionDetailModal";

interface PaymentMethod {
   id: string;
   name: string;
   icon: React.ReactNode;
   color: string;
}

interface BalanceScreenProps {
   onBack: () => void;
}

interface BalanceData {
   balance: number;
   currency: string;
   user: {
      id: string;
      telegramId: string;
      username: string;
      fullName: string;
   };
}

interface TopupHistoryItem {
   id: string;
   referenceId: string;
   amount: number;
   paymentMethod: string;
   status: string;
   createdAt: string;
   updatedAt: string;
}

export function BalanceScreen({ onBack }: BalanceScreenProps) {
   const { t } = useTranslations();
   const [depositAmount, setDepositAmount] = useState(10);
   const [selectedPaymentMethod, setSelectedPaymentMethod] =
      useState<string>("telegramStars");
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const [balance, setBalance] = useState<number>(0);
   const [topupHistory, setTopupHistory] = useState<TopupHistoryItem[]>([]);
   const [isLoadingBalance, setIsLoadingBalance] = useState(true);
   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
   const [showPayPalTopup, setShowPayPalTopup] = useState(false);
   const [showTonTopup, setShowTonTopup] = useState(false);
   const [showTelegramStarsTopup, setShowTelegramStarsTopup] = useState(false);
   const [showTransactionModal, setShowTransactionModal] = useState(false);
   const [selectedTransactionId, setSelectedTransactionId] = useState<
      string | null
   >(null);

   const paymentMethods: PaymentMethod[] = [
      {
         id: "paypal",
         name: "PayPal and Credit Card",
         icon: <CreditCard className="w-5 h-5" />,
         color: "bg-blue-500",
      },
      {
         id: "telegramStars",
         name: t("payment.telegramStars"),
         icon: <Star className="w-5 h-5" />,
         color: "bg-yellow-500",
      },
      {
         id: "ton",
         name: t("payment.ton"),
         icon: <Bitcoin className="w-5 h-5" />,
         color: "bg-blue-600",
      },
   ];

   const presetAmounts = [10, 20, 50, 100];

   // Handle payment method confirmation
   const handlePaymentConfirmation = async () => {
      if (selectedPaymentMethod === "telegramStars") {
         setShowTelegramStarsTopup(true);
      } else if (selectedPaymentMethod === "paypal") {
         setShowPayPalTopup(true);
      } else if (selectedPaymentMethod === "ton") {
         setShowTonTopup(true);
      }
      setIsDrawerOpen(false);
   };

   // Handle Telegram Stars payment
   const handleTelegramStarsPayment = async () => {
      try {
         const WebApp = await import("@twa-dev/sdk");

         // Open Telegram Stars payment
         WebApp.default.openTelegramLink(
            `https://t.me/your_bot?startapp=topup_${depositAmount}`
         );

         // For now, we'll simulate a successful payment
         // In a real implementation, you would handle the payment result via webhook

         // Refresh balance and history after a short delay
         setTimeout(() => {
            fetchBalance();
            fetchTopupHistory();
         }, 2000);
      } catch (error) {
         // Silent error handling
      }
   };

   // Handle successful PayPal payment
   const handlePayPalSuccess = () => {
      setShowPayPalTopup(false);
      // Refresh balance and history
      fetchBalance();
      fetchTopupHistory();
   };

   // Handle successful TON payment
   const handleTonSuccess = () => {
      setShowTonTopup(false);
      // Refresh balance and history
      fetchBalance();
      fetchTopupHistory();
   };

   // Handle successful Telegram Stars payment
   const handleTelegramStarsSuccess = () => {
      setShowTelegramStarsTopup(false);
      // Refresh balance and history
      fetchBalance();
      fetchTopupHistory();
   };

   // Handle transaction card click
   const handleTransactionClick = (transactionId: string) => {
      setSelectedTransactionId(transactionId);
      setShowTransactionModal(true);
   };

   // Handle modal close
   const handleModalClose = () => {
      setShowTransactionModal(false);
      setSelectedTransactionId(null);
   };

   // Fetch balance data
   const fetchBalance = async () => {
      try {
         const WebApp = await import("@twa-dev/sdk");
         const response = await fetch("/api/balance", {
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
               setBalance(data.data.balance);
            }
         }
      } catch (error) {
         // Silent error handling
      } finally {
         setIsLoadingBalance(false);
      }
   };

   // Fetch topup history
   const fetchTopupHistory = async () => {
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
               setTopupHistory(data.data.topups);
            }
         }
      } catch (error) {
         // Silent error handling
      } finally {
         setIsLoadingHistory(false);
      }
   };

   // Fetch balance data
   useEffect(() => {
      fetchBalance();
   }, []);

   // Fetch topup history
   useEffect(() => {
      fetchTopupHistory();
   }, []);

   // Show PayPal topup page if user selected PayPal
   if (showPayPalTopup) {
      return (
         <PayPalTopupPage
            amount={depositAmount}
            onBack={() => setShowPayPalTopup(false)}
            onSuccess={handlePayPalSuccess}
         />
      );
   }

   // Show TON topup page if user selected TON
   if (showTonTopup) {
      return (
         <TonTopupPage
            amount={depositAmount}
            onBack={() => setShowTonTopup(false)}
            onSuccess={handleTonSuccess}
         />
      );
   }

   // Show Telegram Stars topup page if user selected Telegram Stars
   if (showTelegramStarsTopup) {
      return (
         <TelegramStarsTopupPage
            amount={depositAmount}
            onBack={() => setShowTelegramStarsTopup(false)}
            onSuccess={handleTelegramStarsSuccess}
         />
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
               <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-accent-foreground" />
               </div>
               <div>
                  <h1 className="text-xl font-bold text-foreground">
                     {t("balance.title")}
                  </h1>
                  {isLoadingBalance ? (
                     <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <p className="text-lg font-semibold text-foreground">
                           Loading...
                        </p>
                     </div>
                  ) : (
                     <p className="text-lg font-semibold text-foreground">
                        ${balance.toFixed(2)}
                     </p>
                  )}
               </div>
            </div>
         </div>

         {/* Top up deposit */}
         <Card>
            <CardContent className="p-4">
               <h3 className="font-semibold text-foreground mb-4">
                  {t("balance.topUpDeposit")}
               </h3>

               {/* Amount Selector */}
               <div className="flex items-center justify-between mb-4">
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={() =>
                        setDepositAmount(Math.max(1, depositAmount - 1))
                     }
                  >
                     <Minus className="w-4 h-4" />
                  </Button>
                  <div className="text-center">
                     <span className="text-2xl font-bold text-foreground">
                        ${depositAmount}
                     </span>
                  </div>
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => setDepositAmount(depositAmount + 1)}
                  >
                     <Plus className="w-4 h-4" />
                  </Button>
               </div>

               {/* Preset Amounts */}
               <div className="grid grid-cols-4 gap-2 mb-6">
                  {presetAmounts.map((amount) => (
                     <Button
                        key={amount}
                        variant={
                           depositAmount === amount ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setDepositAmount(amount)}
                        className="text-sm"
                     >
                        ${amount}
                     </Button>
                  ))}
               </div>

               {/* Pay Button */}
               <Button
                  className="w-full py-3 text-lg font-semibold mb-4"
                  onClick={() => setIsDrawerOpen(true)}
               >
                  {t("balance.pay")}
               </Button>
            </CardContent>
         </Card>

         {/* Payment Method Drawer */}
         <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent>
               <DrawerHeader>
                  <DrawerTitle>{t("balance.selectPaymentMethod")}</DrawerTitle>
               </DrawerHeader>
               <div className="p-4 space-y-3">
                  {paymentMethods.map((method) => (
                     <Card
                        key={method.id}
                        className={`cursor-pointer transition-all ${
                           selectedPaymentMethod === method.id
                              ? "ring-2 ring-primary"
                              : "hover:shadow-md"
                        }`}
                        onClick={() => {
                           setSelectedPaymentMethod(method.id);
                        }}
                     >
                        <CardContent className="flex items-center justify-between p-4">
                           <div className="flex items-center space-x-3">
                              <div
                                 className={`w-8 h-8 ${method.color} rounded-full flex items-center justify-center text-white`}
                              >
                                 {method.icon}
                              </div>
                              <span className="font-medium text-foreground">
                                 {method.name}
                              </span>
                           </div>
                           <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                 selectedPaymentMethod === method.id
                                    ? "border-primary bg-primary"
                                    : "border-muted-foreground"
                              }`}
                           >
                              {selectedPaymentMethod === method.id && (
                                 <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                              )}
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
               <div className="p-4">
                  <Button
                     className="w-full"
                     onClick={handlePaymentConfirmation}
                  >
                     {t("common.confirm")}
                  </Button>
               </div>
            </DrawerContent>
         </Drawer>

         {/* History */}
         <div>
            <h3 className="font-semibold text-foreground mb-3">
               {t("balance.history")}
            </h3>
            {isLoadingHistory ? (
               <Card>
                  <CardContent className="p-4">
                     <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <p className="text-sm text-muted-foreground">
                           Loading history...
                        </p>
                     </div>
                  </CardContent>
               </Card>
            ) : topupHistory.length > 0 ? (
               <div className="space-y-2">
                  {topupHistory.map((topup) => (
                     <Card
                        key={topup.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleTransactionClick(topup.id)}
                     >
                        <CardContent className="p-4">
                           <div className="flex items-center justify-between">
                              <div>
                                 <p className="text-sm text-muted-foreground">
                                    {new Date(
                                       topup.createdAt
                                    ).toLocaleDateString()}
                                    ,{" "}
                                    {new Date(
                                       topup.createdAt
                                    ).toLocaleTimeString()}
                                 </p>
                                 <p className="font-medium text-foreground">
                                    + ${topup.amount.toFixed(2)}
                                 </p>
                              </div>
                              <span className="text-sm text-muted-foreground capitalize">
                                 {topup.paymentMethod || "Payment"}
                              </span>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            ) : (
               <Card>
                  <CardContent className="p-4">
                     <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                           No topup history found
                        </p>
                     </div>
                  </CardContent>
               </Card>
            )}
         </div>

         {/* Transaction Detail Modal */}
         <TransactionDetailModal
            isOpen={showTransactionModal}
            onClose={handleModalClose}
            transactionId={selectedTransactionId}
         />
      </div>
   );
}
