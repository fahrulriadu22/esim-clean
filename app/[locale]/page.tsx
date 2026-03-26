"use client";

import { useEffect, useState } from "react";
import { User, HelpCircle, Wifi, Smartphone } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { InternetTab } from "@/components/tabs/InternetTab";
import { AccountTab } from "@/components/tabs/AccountTab";
import { HelpTab } from "@/components/tabs/HelpTab";
import { MyESIMsPage } from "@/components/tabs/MyESIMsPage";
import { ClientOnly } from "@/components/ClientOnly";

type TabType = "internet" | "my-esims" | "account" | "help";
export interface UserData {
   id: number;
   first_name: string;
   last_name?: string;
   username?: string;
   language_code: string;
   is_premium?: boolean;
   photo_url?: string;
}

export default function eSIMApp() {
   const [userData, setUserData] = useState<UserData | null>(null);
   const [activeTab, setActiveTab] = useState<TabType>("internet");
   const { t } = useTranslations();

   const renderContent = () => {
      switch (activeTab) {
         case "internet":
            return (
               <InternetTab
                  onNavigateToMyESIMs={() => setActiveTab("my-esims")}
               />
            );
         case "my-esims":
            return <MyESIMsPage onBack={() => setActiveTab("internet")} />;
         case "account":
            return <AccountTab />;
         case "help":
            return <HelpTab />;
         default:
            return (
               <InternetTab
                  onNavigateToMyESIMs={() => setActiveTab("my-esims")}
               />
            );
      }
   };

   useEffect(() => {
      async function initUser() {
         // Only run on client side
         if (typeof window === "undefined") return;

         try {
            const WebApp = await import("@twa-dev/sdk");

            // Check if WebApp is available
            if (!WebApp.default.initData) {
               return;
            }

            await fetch("/api/init-user", {
               method: "POST",
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Telegram-Data": WebApp.default.initData,
               },
               body: JSON.stringify({
                  telegramId: WebApp.default.initDataUnsafe.user?.id,
               }),
            });

            if (
               WebApp.default.initDataUnsafe.user &&
               WebApp.default.initDataUnsafe
            ) {
               setUserData(WebApp.default.initDataUnsafe.user as UserData);
            }
         } catch (error) {
            // Failed to initialize Telegram WebApp
         }
      }
      initUser();
   }, []);

   return (
      <ClientOnly
         fallback={
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col max-w-md mx-auto">
               <main className="flex-1 pb-24 flex items-center justify-center">
                  <div className="text-center">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                     <p className="text-muted-foreground">Loading...</p>
                  </div>
               </main>
            </div>
         }
      >
         <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col max-w-md mx-auto">
            {/* Main Content */}
            <main className="flex-1 pb-24">{renderContent()}</main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur-lg border-t border-border shadow-premium-lg">
               <div className="flex justify-around py-3 px-2">
                  <button
                     onClick={() => setActiveTab("internet")}
                     className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                        activeTab === "internet"
                           ? "text-primary bg-primary/10 shadow-premium scale-105"
                           : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                     }`}
                  >
                     <Wifi className="h-4 w-4 mb-1" />
                     <span className="text-xs font-semibold tracking-wide">
                        {t("navigation.internet")}
                     </span>
                  </button>
                  <button
                     onClick={() => setActiveTab("my-esims")}
                     className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                        activeTab === "my-esims"
                           ? "text-primary bg-primary/10 shadow-premium scale-105"
                           : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                     }`}
                  >
                     <Smartphone className="h-4 w-4 mb-1" />
                     <span className="text-xs font-semibold tracking-wide">
                        {t("navigation.myESIMs")}
                     </span>
                  </button>
                  <button
                     onClick={() => setActiveTab("account")}
                     className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                        activeTab === "account"
                           ? "text-primary bg-primary/10 shadow-premium scale-105"
                           : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                     }`}
                  >
                     <User className="h-4 w-4 mb-1" />
                     <span className="text-xs font-semibold tracking-wide">
                        {t("navigation.account")}
                     </span>
                  </button>
                  <button
                     onClick={() => setActiveTab("help")}
                     className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                        activeTab === "help"
                           ? "text-primary bg-primary/10 shadow-premium scale-105"
                           : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                     }`}
                  >
                     <HelpCircle className="h-4 w-4 mb-1" />
                     <span className="text-xs font-semibold tracking-wide">
                        {t("navigation.help")}
                     </span>
                  </button>
               </div>
            </nav>
         </div>
      </ClientOnly>
   );
}
