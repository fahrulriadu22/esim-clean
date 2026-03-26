"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   CreditCard,
   Smartphone,
   Globe,
   Palette,
   Bell,
   Loader2,
} from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { BalanceScreen } from "./BalanceScreen";
import { MyESIMsPage } from "./MyESIMsPage";
import { OrdersPage } from "./OrdersPage";
import { LanguagePage } from "./LanguagePage";
import { ThemePage } from "./ThemePage";
import { NotificationPage } from "./NotificationPage";
import { PrivacyNoticePage } from "./PrivacyNoticePage";
import { TermsConditionsPage } from "./TermsConditionsPage";
import { FAQPage } from "./FAQPage";

type ViewType =
   | "main"
   | "balance"
   | "my-esims"
   | "orders"
   | "language"
   | "theme"
   | "notifications"
   | "privacy"
   | "terms"
   | "faq";

export function AccountTab() {
   const [currentView, setCurrentView] = useState<ViewType>("main");
   const [balance, setBalance] = useState<number>(0);
   const [isLoadingBalance, setIsLoadingBalance] = useState(true);
   const { t } = useTranslations();

   const handleBalanceClick = () => {
      setCurrentView("balance");
   };

   // Fetch balance data
   useEffect(() => {
      async function fetchBalance() {
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
      }

      fetchBalance();
   }, []);

   if (currentView === "balance") {
      return <BalanceScreen onBack={() => setCurrentView("main")} />;
   }

   if (currentView === "my-esims") {
      return <MyESIMsPage onBack={() => setCurrentView("main")} />;
   }

   if (currentView === "orders") {
      return <OrdersPage onBack={() => setCurrentView("main")} />;
   }

   if (currentView === "language") {
      return <LanguagePage onBack={() => setCurrentView("main")} />;
   }

   if (currentView === "theme") {
      return <ThemePage onBack={() => setCurrentView("main")} />;
   }

   if (currentView === "notifications") {
      return <NotificationPage onBack={() => setCurrentView("main")} />;
   }

   if (currentView === "privacy") {
      return <PrivacyNoticePage onBack={() => setCurrentView("main")} />;
   }

   if (currentView === "terms") {
      return <TermsConditionsPage onBack={() => setCurrentView("main")} />;
   }

   if (currentView === "faq") {
      return <FAQPage onBack={() => setCurrentView("main")} />;
   }

   return (
      <div className="p-4 space-y-6">
         {/* Header */}
         <div className="text-center py-6">
            <h1 className="text-2xl font-bold text-foreground">
               {t("account.title")}
            </h1>
         </div>

         {/* Balance Section */}
         <Card
            className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
            onClick={handleBalanceClick}
         >
            <CardContent className="p-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-accent-foreground font-bold">
                           $
                        </span>
                     </div>
                     <div>
                        <p className="text-sm text-muted-foreground">
                           {t("account.balance")}
                        </p>
                        {isLoadingBalance ? (
                           <div className="flex items-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <p className="text-lg font-bold text-foreground">
                                 Loading...
                              </p>
                           </div>
                        ) : (
                           <p className="text-lg font-bold text-foreground">
                              ${balance.toFixed(2)}
                           </p>
                        )}
                     </div>
                  </div>
                  <Button variant="ghost" size="sm">
                     <svg
                        className="w-4 h-4"
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
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Promo Code */}
         <Card>
            <CardContent className="p-4">
               <div className="flex space-x-2">
                  <input
                     type="text"
                     placeholder={t("account.promoCodePlaceholder")}
                     className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button>{t("account.okButton")}</Button>
               </div>
            </CardContent>
         </Card>

         {/* Referral Program */}
         <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-4">
               <div className="flex items-center space-x-3">
                  <div className="text-4xl">🎁</div>
                  <div className="flex-1">
                     <p className="text-sm font-medium text-foreground">
                        {t("account.referralText")}
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Profile Section */}
         <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
               {t("account.profile")}
            </h2>
            <div className="space-y-3">
               <Card
                  className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
                  onClick={() => setCurrentView("my-esims")}
               >
                  <CardContent className="flex items-center justify-between p-4">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                           <Smartphone className="w-4 h-4 text-accent-foreground" />
                        </div>
                        <span className="font-medium text-foreground">
                           {t("account.myESIMs")}
                        </span>
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
                  </CardContent>
               </Card>
               <Card
                  className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
                  onClick={() => setCurrentView("orders")}
               >
                  <CardContent className="flex items-center justify-between p-4">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                           <CreditCard className="w-4 h-4 text-secondary-foreground" />
                        </div>
                        <span className="font-medium text-foreground">
                           {t("account.orders")}
                        </span>
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
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Settings */}
         <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
               {t("account.settings")}
            </h2>
            <div className="space-y-3">
               <Card
                  className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
                  onClick={() => setCurrentView("language")}
               >
                  <CardContent className="flex items-center justify-between p-4">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                           <Globe className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-foreground">
                           {t("account.language")}
                        </span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                           English
                        </span>
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

               <Card
                  className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
                  onClick={() => setCurrentView("theme")}
               >
                  <CardContent className="flex items-center justify-between p-4">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                           <Palette className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-foreground">
                           {t("account.theme")}
                        </span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                           {t("account.system")}
                        </span>
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

               <Card
                  className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
                  onClick={() => setCurrentView("notifications")}
               >
                  <CardContent className="flex items-center justify-between p-4">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                           <Bell className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-foreground">
                           {t("account.notifications")}
                        </span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                           {t("account.enabled")}
                        </span>
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
         </div>

         {/* Legal & Support */}
         <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
               LEGAL & SUPPORT
            </h2>
            <div className="space-y-3">
               <Card
                  className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
                  onClick={() => setCurrentView("privacy")}
               >
                  <CardContent className="flex items-center justify-between p-4">
                     <span className="font-medium text-foreground">
                        Privacy Policy
                     </span>
                     <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                           GDPR Compliant
                        </span>
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

               <Card
                  className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
                  onClick={() => setCurrentView("terms")}
               >
                  <CardContent className="flex items-center justify-between p-4">
                     <span className="font-medium text-foreground">
                        Terms of Service
                     </span>
                     <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                          v2.1.0
                        </span>
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

               <Card
                  className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
                  onClick={() => setCurrentView("faq")}
               >
                  <CardContent className="flex items-center justify-between p-4">
                     <span className="font-medium text-foreground">
                        Frequently Asked Questions
                     </span>
                     <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                          Help Center
                        </span>
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
         </div>
      </div>
   );
}