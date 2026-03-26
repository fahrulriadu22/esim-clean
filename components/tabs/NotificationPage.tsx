"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell } from "lucide-react";
import { useTranslations } from "@/lib/i18n";

interface NotificationPageProps {
   onBack: () => void;
}

interface NotificationSetting {
   id: string;
   name: string;
   enabled: boolean;
}

export function NotificationPage({ onBack }: NotificationPageProps) {
   const { t } = useTranslations();

   const [notifications, setNotifications] = useState<NotificationSetting[]>([
      {
         id: "remaining-traffic-attentions",
         name: t("notifications.remainingTrafficAttentions"),
         enabled: true,
      },
      {
         id: "news-and-promotions",
         name: t("notifications.newsAndPromotions"),
         enabled: true,
      },
      {
         id: "marketing-notifications",
         name: t("notifications.marketingNotifications"),
         enabled: true,
      },
   ]);

   const toggleNotification = (id: string) => {
      setNotifications((prev) =>
         prev.map((notif) =>
            notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
         )
      );
   };

   return (
      <div className="p-4 space-y-6">
         {/* Header */}
         <div className="flex items-center space-x-4 py-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
               <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4 text-white" />
               </div>
               <div>
                  <h1 className="text-xl font-bold text-foreground">
                     {t("notifications.title")}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     {t("notifications.subtitle")}
                  </p>
               </div>
            </div>
         </div>

         {/* Notification Options */}
         <div className="space-y-3">
            {notifications.map((notif) => (
               <Card
                  key={notif.id}
                  className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
               >
                  <CardContent className="p-4">
                     <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">
                           {notif.name}
                        </span>
                        <Switch
                           checked={notif.enabled}
                           onCheckedChange={() => toggleNotification(notif.id)}
                        />
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}
