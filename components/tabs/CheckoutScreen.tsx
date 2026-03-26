"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
   Drawer,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
} from "@/components/ui/drawer";
import {
   ArrowLeft,
   CreditCard,
   DollarSign,
   Bitcoin,
   Loader2,
   CheckCircle,
   XCircle,
   AlertCircle,
   Star,
} from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { Package } from "@/hooks/usePackages";
import { TonCheckoutPage } from "./TonCheckoutPage";
import { TelegramStarsCheckoutPage } from "./TelegramStarsCheckoutPage";
import { CoinPaymentsCheckoutPage } from "./CoinPaymentsCheckoutPage";
import { CreditCardCheckoutPage } from "./CreditCardCheckoutPage";

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

interface Country {
   name: string;
   flag: string;
   color: string;
   plans: string;
}

interface PaymentMethod {
   id: string;
   name: string;
   icon: React.ReactNode;
   color: string;
}

interface CheckoutScreenProps {
   country: Country;
   plan: Package;
   onBack: () => void;
   onBalanceClick: () => void;
   onSuccess?: () => void;
}

export function CheckoutScreen({
   country,
   plan,
   onBack,
   onBalanceClick,
   onSuccess,
}: CheckoutScreenProps) {
   const { t } = useTranslations();
   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
   const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
   const [useDeposit, setUseDeposit] = useState(true);
   const [promoCode, setPromoCode] = useState("");
   const [promoApplied, setPromoApplied] = useState(false);
   const [promoDiscount, setPromoDiscount] = useState(0);
   const [finalPrice, setFinalPrice] = useState(plan.price);
   const [promoError, setPromoError] = useState("");
   const [isApplyingPromo, setIsApplyingPromo] = useState(false);
   const [isPurchasing, setIsPurchasing] = useState(false);
   const [purchaseError, setPurchaseError] = useState<string | null>(null);
   const [telegramData, setTelegramData] = useState<string | null>(null);
   const [balance, setBalance] = useState<number>(0);
   const [isLoadingBalance, setIsLoadingBalance] = useState(true);
   const [transactionStatus, setTransactionStatus] = useState<
      "idle" | "processing" | "success" | "error"
   >("idle");
   const [transactionMessage, setTransactionMessage] = useState<string>("");
   const [paypalOrderData, setPaypalOrderData] = useState<any>(null);
   const [isPollingPayment, setIsPollingPayment] = useState(false);
   const [showTonCheckout, setShowTonCheckout] = useState(false);
   const [showTelegramStarsCheckout, setShowTelegramStarsCheckout] = useState(false);
   const [showCoinPayments, setShowCoinPayments] = useState(false);
const [showCreditCardForm, setShowCreditCardForm] = useState(false);

   // Extract telegram data from window.Telegram.WebApp
   useEffect(() => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp?.initData) {
         setTelegramData(window.Telegram.WebApp.initData);
      }
   }, []);

   // Fetch user balance
   useEffect(() => {
      const fetchBalance = async () => {
         if (!telegramData) return;

         try {
            const response = await fetch("/api/balance", {
               method: "GET",
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Telegram-Data": telegramData,
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

      if (telegramData) {
         fetchBalance();
      }
   }, [telegramData]);

   const paymentMethods: PaymentMethod[] = [
   {
      id: "credit_card",
      name: "Credit Card / Debit Card",
      icon: <CreditCard className="w-5 h-5" />,
      color: "bg-green-500",
   },
      {
         id: "paypal",
         name: "PayPal",
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
   {
      id: "crypto",
      name: "Crypto (USDT, USDC, TRX, BNB)",
      icon: <Bitcoin className="w-5 h-5" />,
      color: "bg-purple-600",
   },
   ];

   // Get selected payment method details
   const getSelectedPaymentMethod = () => {
      return paymentMethods.find(
         (method) => method.id === selectedPaymentMethod
      );
   };

   // Handle Telegram Stars payment
   const handleTelegramStarsPayment = async () => {
      try {
         setShowTelegramStarsCheckout(true);
         setIsPurchasing(false);
      } catch (error) {
         setPurchaseError(
            "Failed to initiate Telegram Stars payment. Please try again."
         );
         setTransactionStatus("error");
         setTransactionMessage("Payment failed");
         setIsPurchasing(false);
      }
   };

   // Handle PayPal payment
   const handlePayPalPayment = async () => {
      try {
         setTransactionMessage("Creating PayPal payment...");

         if (!telegramData) {
            throw new Error("Telegram data not available");
         }

         const urlParams = new URLSearchParams(telegramData);
         const userParam = urlParams.get("user");
         if (!userParam) {
            throw new Error("User data not found in Telegram data");
         }

         const userData = JSON.parse(decodeURIComponent(userParam));
         const telegramId = userData.id;

         if (!telegramId) {
            throw new Error("Telegram ID not found");
         }

         // 🔥 PAKAI finalPrice KALO ADA PROMO
         const paymentAmount = promoApplied ? finalPrice : plan.price;

         const response = await fetch("/api/paypal/create", {
            method: "POST",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               "X-Telegram-Data": telegramData,
            },
            body: JSON.stringify({
               amount: paymentAmount,
               originalAmount: plan.price,
               discount: promoDiscount,
               promoCode: promoApplied ? promoCode : null,
               type: "ORDER",
               telegramId: String(telegramId),
               sku: plan.code,
               paymentMethod: "paypal",
            }),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create PayPal order");
         }

         const orderData = await response.json();

         setPaypalOrderData(orderData);
         setTransactionStatus("processing");
         setTransactionMessage("PayPal payment ready. Click to proceed...");
         setIsPurchasing(false);
      } catch (error) {
         setPurchaseError(
            error instanceof Error
               ? error.message
               : "Failed to initiate PayPal payment. Please try again."
         );
         setTransactionStatus("error");
         setTransactionMessage("Payment failed");
         setIsPurchasing(false);
      }
   };

// Handle Credit Card payment
const handleCreditCardPayment = async () => {
   setShowCreditCardForm(true);
};

   // Handle PayPal payment completion
   const handlePayPalPaymentComplete = () => {
      if (paypalOrderData?.payLink) {
         setIsPollingPayment(true);
         setTransactionMessage("Waiting for payment confirmation...");
         window.open(paypalOrderData.payLink, "_blank");
         pollPaymentStatus();
      }
   };

   const handlePolarPayment = async () => {
      console.log('🚀 handlePolarPayment dipanggil');
      console.log('📦 Plan data:', plan);
      console.log('🏷️ Plan code:', plan.code);
      
      // 🔥 CEK PROMO - POLAR TIDAK SUPPORT DISKON DINAMIS
      if (promoApplied) {
         alert("Promo codes cannot be used with Credit Card payment. Please use PayPal or remove promo code.");
         return;
      }
      
      try {
         console.log('🔍 Fetching package detail...');
         const response = await fetch(`/api/package/detail?code=${plan.code}`);
         const data = await response.json();
         
         console.log('📦 API Response:', data);
         
         if (data.success && data.data.polarLink) {
            console.log('✅ Polar link ditemukan:', data.data.polarLink);
            window.location.href = data.data.polarLink;
         } else {
            console.log('❌ polarLink tidak ada di response');
            alert("Credit card payment not available for this package");
         }
      } catch (error) {
         console.error('❌ Error fetching package:', error);
         alert("Payment unavailable. Please try again.");
      }
   };

const handleCryptoPayment = () => {
  // Encode telegram data ke URL
  const encodedTelegramData = encodeURIComponent(telegramData || "");
  
  const params = new URLSearchParams({
    name: plan.name,
    price: plan.price.toString(),
    data: plan.data.toString(),
    duration: plan.duration.toString(),
    code: plan.code,
    tg: encodedTelegramData,
  });
  window.location.href = `/crypto-payment?${params.toString()}`;
};

const handleCreditCardSuccess = () => {
   setShowCreditCardForm(false);
   if (onSuccess) {
      onSuccess();
   }
};

const handleCreditCardBack = () => {
   setShowCreditCardForm(false);
};

   const handleApplyPromo = async () => {
      if (!promoCode.trim()) {
         setPromoError("Please enter a promo code");
         return;
      }

      setIsApplyingPromo(true);
      setPromoError("");

      try {
         const response = await fetch("/api/validate-promo", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               code: promoCode,
               packageCode: plan.code,
               amount: plan.price,
            }),
         });

         const data = await response.json();

         if (data.valid) {
            setPromoApplied(true);
            setPromoDiscount(data.discount);
            setFinalPrice(plan.price - data.discount);
            setTransactionMessage(`Promo applied! You saved $${data.discount}`);
         } else {
            setPromoError(data.message || "Invalid promo code");
         }
      } catch (error) {
         setPromoError("Failed to validate promo code");
      } finally {
         setIsApplyingPromo(false);
      }
   };

   const pollPaymentStatus = async () => {
      if (!paypalOrderData?.payment?.referenceId) return;

      const maxAttempts = 30;
      let attempts = 0;

      const poll = async () => {
         try {
            const response = await fetch("/api/orders", {
               method: "GET",
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Telegram-Data": telegramData!,
               },
            });

            if (response.ok) {
               const data = await response.json();
               if (data.success) {
                  const recentOrder = data.data.find(
                     (order: any) =>
                        order.txId === paypalOrderData.payment.referenceId
                  );

                  if (recentOrder && recentOrder.status === "completed") {
                     setIsPollingPayment(false);
                     setTransactionStatus("success");
                     setTransactionMessage(
                        "Payment successful! Your eSIM is being prepared."
                     );

                     setTimeout(() => {
                        if (onSuccess) {
                           onSuccess();
                        }
                     }, 2000);
                     return;
                  }
               }
            }
         } catch (error) {
            // Silent error handling
         }

         attempts++;
         if (attempts < maxAttempts) {
            setTimeout(poll, 10000);
         } else {
            setIsPollingPayment(false);
            setTransactionStatus("error");
            setTransactionMessage(
               "Payment verification timeout. Please check your orders manually."
            );
         }
      };

      setTimeout(poll, 5000);
   };

   // Handle TON payment
   const handleTONPayment = async () => {
      try {
         setShowTonCheckout(true);
         setIsPurchasing(false);
      } catch (error) {
         setPurchaseError("Failed to initiate TON payment. Please try again.");
         setTransactionStatus("error");
         setTransactionMessage("Payment failed");
         setIsPurchasing(false);
      }
   };

   // Handle successful TON payment
   const handleTonSuccess = () => {
      setShowTonCheckout(false);
      if (onSuccess) {
         onSuccess();
      }
   };

   // Handle TON checkout back
   const handleTonBack = () => {
      setShowTonCheckout(false);
   };

   // Handle successful Telegram Stars payment
   const handleTelegramStarsSuccess = () => {
      setShowTelegramStarsCheckout(false);
      if (onSuccess) {
         onSuccess();
      }
   };

   // Handle Telegram Stars checkout back
   const handleTelegramStarsBack = () => {
      setShowTelegramStarsCheckout(false);
   };

   const handlePurchase = async () => {
      setIsPurchasing(true);
      setPurchaseError(null);
      setTransactionStatus("processing");
      setTransactionMessage("Processing payment...");

      if (!telegramData) {
         setPurchaseError("Telegram data not available. Please try again.");
         setIsPurchasing(false);
         setTransactionStatus("error");
         setTransactionMessage("Authentication failed");
         return;
      }

      if (selectedPaymentMethod === "telegramStars") {
         await handleTelegramStarsPayment();
         return;
      }

      if (selectedPaymentMethod === "paypal") {
         await handlePayPalPayment();
         return;
      }

      if (selectedPaymentMethod === "polar") {
         handlePolarPayment();
         setIsPurchasing(false);
         return;
      }

      if (selectedPaymentMethod === "ton") {
         await handleTONPayment();
         return;
      }

if (selectedPaymentMethod === "crypto") {
   handleCryptoPayment();
   setIsPurchasing(false);
   return;
}

      if (selectedPaymentMethod === "credit_card") {
         handleCreditCardPayment();
         setIsPurchasing(false);
         return;
      }

      if (!useDeposit && !selectedPaymentMethod) {
         setPurchaseError("Please select a payment method or enable deposit.");
         setIsPurchasing(false);
         setTransactionStatus("error");
         setTransactionMessage("No payment method selected");
         return;
      }

      if (useDeposit) {
         const priceToCheck = promoApplied ? finalPrice : plan.price;
         if (balance < priceToCheck) {
            setPurchaseError(
               `Insufficient balance. You have $${balance.toFixed(
                  2
               )} but need $${priceToCheck.toFixed(2)}`
            );
            setIsPurchasing(false);
            setTransactionStatus("error");
            setTransactionMessage("Insufficient balance");
            return;
         }
      }

      try {
         const requestData = {
            packageCode: plan.code,
            price: promoApplied ? finalPrice : plan.price,
            originalPrice: plan.price,
            discount: promoDiscount,
            promoCode: promoApplied ? promoCode : null,
            count: 1,
            useDeposit: useDeposit,
         };

         setTransactionMessage("Processing payment...");

         const response = await fetch("/api/order", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "X-Telegram-Data": telegramData,
            },
            body: JSON.stringify(requestData),
         });

         const result = await response.json();

         if (!response.ok) {
            throw new Error(result.message || "Failed to create order");
         }

         if (result.success) {
            setTransactionStatus("success");
            setTransactionMessage("Order created successfully!");

            if (useDeposit) {
               setBalance((prev) => prev - plan.price);
            }

            setTimeout(() => {
               if (onSuccess) {
                  onSuccess();
               }
            }, 2000);
         } else {
            throw new Error(result.message || "Order creation failed");
         }
      } catch (error) {
         setPurchaseError(
            error instanceof Error ? error.message : "Purchase failed"
         );
         setTransactionStatus("error");
         setTransactionMessage("Transaction failed");
      } finally {
         setIsPurchasing(false);
      }
   };

   // Show TON checkout page if selected
   if (showTonCheckout) {
      // 🔥 OVERRIDE PRICE DENGAN finalPrice KALO ADA PROMO
      const tonPlan = promoApplied ? { ...plan, price: finalPrice } : plan;
      return (
         <TonCheckoutPage
            plan={tonPlan}
            onBack={handleTonBack}
            onSuccess={handleTonSuccess}
         />
      );
   }

   // Show Telegram Stars checkout page if selected
   if (showTelegramStarsCheckout) {
      // 🔥 OVERRIDE PRICE DENGAN finalPrice KALO ADA PROMO
      const starsPlan = promoApplied ? { ...plan, price: finalPrice } : plan;
      return (
         <TelegramStarsCheckoutPage
            plan={starsPlan}
            onBack={handleTelegramStarsBack}
            onSuccess={handleTelegramStarsSuccess}
         />
      );
   }

// Show Credit Card form if selected
if (showCreditCardForm) {
   const cardPlan = promoApplied ? { ...plan, price: finalPrice } : plan;
   return (
      <CreditCardCheckoutPage
         amount={cardPlan.price}
         sku={cardPlan.code}
         telegramId={telegramData ? JSON.parse(decodeURIComponent(new URLSearchParams(telegramData).get("user") || "{}")).id : ""}
         onBack={handleCreditCardBack}
         onSuccess={handleCreditCardSuccess}
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
               <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-full">
                  <img
                     src={country.flag}
                     alt={`${country.name} flag`}
                     className="w-8 h-8 object-cover"
                     onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                           parent.innerHTML = "🌍";
                           parent.className = `w-8 h-8 flex items-center justify-center text-lg`;
                        }
                     }}
                  />
               </div>
               <div>
                  <h1 className="text-xl font-bold text-foreground">
                     {country.name}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     {plan.data} {plan.dataUnit} / {plan.duration}{" "}
                     {plan.durationUnit}
                  </p>
               </div>
            </div>
         </div>

         {/* Order Summary */}
         <Card>
            <CardContent className="p-4">
               <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-foreground">
                     {t("checkout.total")}
                  </span>
                  <span className="text-lg font-bold text-foreground">
                     ${promoApplied ? finalPrice.toFixed(2) : plan.price.toFixed(2)}
                  </span>
               </div>
               {promoApplied && (
                  <div className="flex items-center justify-between text-sm text-green-600">
                     <span>Discount</span>
                     <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
               )}
            </CardContent>
         </Card>

         {/* Options */}
         <div className="space-y-4">
            {/* Promo Code */}
            <Card>
               <CardContent className="p-4">
                  <div className="flex space-x-2">
                     <input
                        type="text"
                        placeholder={t("checkout.promoCodePlaceholder")}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                     />
                     <Button 
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode.trim() || isApplyingPromo}
                     >
                        {isApplyingPromo ? (
                           <Loader2 className="w-4 h-4 animate-spin" />
                        ) : promoApplied ? (
                           "Applied"
                        ) : (
                           t("account.okButton")
                        )}
                     </Button>
                  </div>
                  {promoError && (
                     <p className="text-sm text-red-500 mt-2">{promoError}</p>
                  )}
                  {promoApplied && (
                     <p className="text-sm text-green-500 mt-2">
                        ✓ ${promoDiscount} discount applied!
                     </p>
                  )}
               </CardContent>
            </Card>

            {/* Use Deposit */}
            <Card>
               <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                           <DollarSign className="w-4 h-4 text-accent-foreground" />
                        </div>
                        <div>
                           <p className="font-medium text-foreground">
                              {t("checkout.useDeposit")}
                           </p>
                           <p className="text-sm text-muted-foreground">
                              {isLoadingBalance ? (
                                 <span className="flex items-center space-x-1">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    <span>Loading balance...</span>
                                 </span>
                              ) : (
                                 `${t("checkout.available")} $${balance.toFixed(
                                    2
                                 )}`
                              )}
                           </p>
                        </div>
                     </div>
                     <Switch
                        checked={useDeposit}
                        onCheckedChange={(checked) => {
                           setUseDeposit(checked);
                           if (checked) {
                              setSelectedPaymentMethod("");
                           }
                        }}
                     />
                  </div>
               </CardContent>
            </Card>

            {/* Payment Method */}
            <Card
               className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
               onClick={() => setIsPaymentDrawerOpen(true)}
            >
               <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div
                           className={`w-8 h-8 ${
                              getSelectedPaymentMethod()?.color || "bg-primary"
                           } rounded-full flex items-center justify-center text-white`}
                        >
                           {getSelectedPaymentMethod()?.icon || (
                              <CreditCard className="w-4 h-4" />
                           )}
                        </div>
                        <div>
                           <p className="font-medium text-foreground">
                              {t("checkout.paymentMethod")}
                           </p>
                           <p className="text-sm text-muted-foreground">
                              {getSelectedPaymentMethod()?.name || "None"}
                           </p>
                        </div>
                     </div>
                     <svg
                        className="w-5 h-5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M9 5l7 7-7 7"
                        />
                     </svg>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* PayPal Payment Interface */}
         {selectedPaymentMethod === "paypal" && paypalOrderData && (
            <>
               <Card>
                  <CardContent className="p-6">
                     <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                           <CreditCard className="w-8 h-8 text-white" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-foreground">
                              ${promoApplied ? finalPrice.toFixed(2) : plan.price.toFixed(2)}
                           </h2>
                           <p className="text-sm text-muted-foreground">
                              {plan.name}
                           </p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="p-6">
                     <h3 className="font-semibold text-foreground mb-4">
                        Payment Instructions
                     </h3>
                     <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start space-x-3">
                           <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold text-primary">1</span>
                           </div>
                           <p>Click "Pay with PayPal" to open the payment page</p>
                        </div>
                        <div className="flex items-start space-x-3">
                           <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold text-primary">2</span>
                           </div>
                           <p>Complete the payment on PayPal's secure platform</p>
                        </div>
                        <div className="flex items-start space-x-3">
                           <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold text-primary">3</span>
                           </div>
                           <p>Return to this page - your eSIM will be prepared automatically</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="space-y-3">
                  <Button
                     onClick={handlePayPalPaymentComplete}
                     disabled={isPollingPayment}
                     className="w-full py-3 text-lg font-semibold"
                  >
                     {isPollingPayment ? (
                        <div className="flex items-center space-x-2">
                           <Loader2 className="w-5 h-5 animate-spin" />
                           <span>Processing Payment...</span>
                        </div>
                     ) : (
                        <div className="flex items-center space-x-2">
                           <CreditCard className="w-5 h-5" />
                           <span>Pay with PayPal</span>
                        </div>
                     )}
                  </Button>
               </div>
            </>
         )}

         {/* Transaction Status */}
         {transactionStatus !== "idle" && !paypalOrderData && (
            <Card>
               <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                     {transactionStatus === "processing" && (
                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                     )}
                     {transactionStatus === "success" && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                     )}
                     {transactionStatus === "error" && (
                        <XCircle className="w-5 h-5 text-red-500" />
                     )}
                     <div className="flex-1">
                        <p
                           className={`text-sm font-medium ${
                              transactionStatus === "success"
                                 ? "text-green-700"
                                 : transactionStatus === "error"
                                 ? "text-red-700"
                                 : "text-blue-700"
                           }`}
                        >
                           {transactionMessage}
                        </p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         )}

         {/* PayPal Processing Status */}
         {isPollingPayment && (
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

         {/* Payment Method Drawer */}
         <Drawer
            open={isPaymentDrawerOpen}
            onOpenChange={setIsPaymentDrawerOpen}
         >
            <DrawerContent>
               <DrawerHeader>
                  <DrawerTitle>{t("checkout.paymentMethod")}</DrawerTitle>
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
                           setUseDeposit(false);
                           setIsPaymentDrawerOpen(false);
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
            </DrawerContent>
         </Drawer>

         {/* Error Message */}
         {purchaseError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
               <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-600">{purchaseError}</p>
               </div>
            </div>
         )}

         {/* Purchase Button */}
         {!(selectedPaymentMethod === "paypal" && paypalOrderData) && (
            <Button
               className="w-full py-3 text-lg font-semibold"
               onClick={handlePurchase}
               disabled={
                  isPurchasing ||
                  (useDeposit && balance < plan.price) ||
                  isLoadingBalance ||
                  (!useDeposit && !selectedPaymentMethod)
               }
            >
               {isPurchasing ? (
                  <>
                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                     {t("common.loading")}
                  </>
               ) : !useDeposit && !selectedPaymentMethod ? (
                  <>
                     <XCircle className="w-5 h-5 mr-2" />
                     Select Payment Method
                  </>
               ) : useDeposit && balance < plan.price ? (
                  <>
                     <XCircle className="w-5 h-5 mr-2" />
                     Insufficient Balance
                  </>
               ) : (
                  t("checkout.purchase")
               )}
            </Button>
         )}
      </div>
   );
}
