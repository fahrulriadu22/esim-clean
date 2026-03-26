"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
   ArrowLeft,
   Calendar,
   MoreVertical,
   Signal,
   Plus,
   Smartphone,
   Info,
   QrCode,
   RefreshCw,
} from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { useESIMs, ESIMData } from "@/hooks/useESIMs";
import { ESIMDetailsModal } from "./ESIMDetailsModal";
import { ESIMQRModal } from "./ESIMQRModal";
import { useState, useEffect, useRef, useCallback } from "react";

interface MyESIMsPageProps {
   onBack: () => void;
}

export function MyESIMsPage({ onBack }: MyESIMsPageProps) {
   const { t } = useTranslations();
   const { esims, loading, error, refetch, loadMore, hasMore, loadingMore } =
      useESIMs();
   const [selectedESIM, setSelectedESIM] = useState<ESIMData | null>(null);
   const [showDetailsModal, setShowDetailsModal] = useState(false);
   const [showQRModal, setShowQRModal] = useState(false);
   const observerRef = useRef<IntersectionObserver | null>(null);

   const handleShowDetails = (esim: ESIMData) => {
      setSelectedESIM(esim);
      setShowDetailsModal(true);
   };

   const handleShowQR = (esim: ESIMData) => {
      setSelectedESIM(esim);
      setShowQRModal(true);
   };

   const handleCloseDetails = () => {
      setShowDetailsModal(false);
      setSelectedESIM(null);
   };

   const handleCloseQR = () => {
      setShowQRModal(false);
      setSelectedESIM(null);
   };

   const handleShowQRFromDetails = () => {
      setShowDetailsModal(false);
      setShowQRModal(true);
   };

   // Intersection Observer for infinite scroll
   const lastESIMElementRef = useCallback(
      (node: HTMLDivElement) => {
         if (loading || loadingMore) return;
         if (observerRef.current) observerRef.current.disconnect();

         observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
               loadMore();
            }
         });

         if (node) observerRef.current.observe(node);
      },
      [loading, loadingMore, hasMore, loadMore]
   );

   // Cleanup observer on unmount
   useEffect(() => {
      return () => {
         if (observerRef.current) {
            observerRef.current.disconnect();
         }
      };
   }, []);

   const getStatusColor = (status: string) => {
      switch (status) {
         case "new":
            return "destructive";
         case "active":
            return "default";
         case "low-data":
            return "destructive";
         case "expired":
            return "secondary";
         default:
            return "default";
      }
   };

   const getStatusText = (status: string) => {
      switch (status) {
         case "new":
            return t("myesims.new");
         case "active":
            return t("myesims.active");
         case "low-data":
            return t("myesims.lowData");
         case "expired":
            return t("myesims.expired");
         default:
            return t("myesims.unknown");
      }
   };

   if (loading) {
      return (
         <div className="p-4 space-y-6">
            <div className="flex items-center space-x-4 py-4">
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="p-2"
               >
                  <ArrowLeft className="w-5 h-5" />
               </Button>
               <div>
                  <Skeleton className="h-8 w-48 mb-2 bg-foreground/20" />
                  <Skeleton className="h-4 w-32 bg-muted-foreground/20" />
               </div>
            </div>
            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                  <Card
                     key={i}
                     className="overflow-hidden shadow-premium bg-gradient-to-r from-card to-muted/10"
                  >
                     <CardContent className="p-0">
                        <div className="flex items-center justify-between p-4 bg-card">
                           <div className="flex items-center space-x-3">
                              <Skeleton className="w-6 h-6 rounded-sm bg-muted-foreground/30" />
                              <div>
                                 <Skeleton className="h-4 w-24 mb-2 bg-foreground/20" />
                                 <Skeleton className="h-3 w-32 bg-muted-foreground/20" />
                              </div>
                           </div>
                           <Skeleton className="h-6 w-20 rounded-full bg-muted-foreground/30" />
                        </div>
                        <div className="p-4 bg-muted/10">
                           <Skeleton className="h-3 w-20 mb-2 bg-muted-foreground/20" />
                           <Skeleton className="h-2 w-full mb-3 bg-foreground/20" />
                           <div className="flex justify-between">
                              <Skeleton className="h-3 w-16 bg-muted-foreground/20" />
                              <Skeleton className="h-3 w-20 bg-muted-foreground/20" />
                           </div>
                        </div>
                        <div className="p-4 bg-muted/5">
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <Skeleton className="h-3 w-16 mb-1 bg-muted-foreground/20" />
                                 <Skeleton className="h-4 w-20 bg-foreground/20" />
                              </div>
                              <div>
                                 <Skeleton className="h-3 w-12 mb-1 bg-muted-foreground/20" />
                                 <Skeleton className="h-4 w-16 bg-foreground/20" />
                              </div>
                           </div>
                        </div>
                        <div className="p-4 flex space-x-2">
                           <Skeleton className="h-9 flex-1 bg-muted-foreground/20" />
                           <Skeleton className="h-9 flex-1 bg-muted-foreground/20" />
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="p-4 space-y-6">
            <div className="flex items-center space-x-4 py-4">
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="p-2"
               >
                  <ArrowLeft className="w-5 h-5" />
               </Button>
               <div>
                  <h1 className="text-2xl font-bold text-foreground">
                     {t("myesims.title")}
                  </h1>
                  <p className="text-muted-foreground">
                     {t("myesims.subtitle")}
                  </p>
               </div>
            </div>
            <Card>
               <CardContent className="p-6 text-center">
                  <p className="text-destructive mb-4">{error}</p>
                  <Button onClick={refetch}>{t("common.retry")}</Button>
               </CardContent>
            </Card>
         </div>
      );
   }

   return (
      <div className="p-4 space-y-6">
         {/* Header with back button and refresh */}
         <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="p-2"
               >
                  <ArrowLeft className="w-5 h-5" />
               </Button>
               <div>
                  <h1 className="text-2xl font-bold text-foreground">
                     {t("myesims.title")}
                  </h1>
                  <p className="text-muted-foreground">
                     {t("myesims.subtitle")}
                  </p>
               </div>
            </div>
            <Button
               variant="ghost"
               size="sm"
               onClick={refetch}
               disabled={loading}
               className="p-2"
            >
               <RefreshCw
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
               />
            </Button>
         </div>

         {/* Active eSIMs */}
         <div className="space-y-4">
            {esims.map((esim, index) => (
               <Card
                  key={esim.id}
                  className="overflow-hidden"
                  ref={index === esims.length - 1 ? lastESIMElementRef : null}
               >
                  <CardContent className="p-0">
                     {/* Header */}
                     <div className="flex items-center justify-between p-4 bg-card">
                        <div className="flex items-center space-x-3">
                           <img
                              src={esim.flag}
                              alt={esim.country}
                              className="w-6 h-6 rounded"
                              onError={(e) => {
                                 e.currentTarget.style.display = "none";
                              }}
                           />
                           <div>
                              <h3 className="font-semibold text-foreground">
                                 {esim.country}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                 {esim.plan}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Badge variant={getStatusColor(esim.status)}>
                              {getStatusText(esim.status)}
                           </Badge>
                        </div>
                     </div>

                     {/* Data Usage */}
                     {esim.status !== "expired" && (
                        <div className="p-4 bg-muted/30">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-foreground">
                                 {t("myesims.dataUsage")}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                 {esim.dataUsed} GB / {esim.dataTotal} GB
                              </span>
                           </div>
                           <Progress
                              value={(esim.dataUsed / esim.dataTotal) * 100}
                              className="h-2 mb-3"
                           />
                           <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                 <Calendar className="w-4 h-4" />
                                 <span>
                                    {esim.daysLeft} {t("myesims.daysLeft")}
                                 </span>
                              </div>
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                 <Signal className="w-4 h-4" />
                                 <span>
                                    {esim.originalStatus === "IN_USE"
                                       ? t("myesims.connected")
                                       : t("myesims.disconnected")}
                                 </span>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Purchase Info */}
                     <div className="p-4 bg-muted/10">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                           <div>
                              <p className="text-muted-foreground">
                                 {t("myesims.purchased")}
                              </p>
                              <p className="font-medium text-foreground">
                                 {esim.purchaseDate}
                              </p>
                           </div>
                           <div>
                              <p className="text-muted-foreground">
                                 {t("myesims.activated")}
                              </p>
                              <p className="font-medium text-foreground">
                                 {esim.activationDate}
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Actions */}
                     <div className="p-4 flex space-x-2">
                        <Button
                           variant="outline"
                           size="sm"
                           className="flex-1 bg-transparent"
                           onClick={() => handleShowDetails(esim)}
                        >
                           <Info className="w-4 h-4 mr-2" />
                           {t("myesims.details")}
                        </Button>
                        <Button
                           size="sm"
                           className="flex-1"
                           onClick={() => handleShowQR(esim)}
                        >
                           <QrCode className="w-4 h-4 mr-2" />
                           {t("myesims.qrCode")}
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            ))}

            {/* Loading more indicator */}
            {loadingMore && (
               <div className="flex justify-center py-6">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                     <RefreshCw className="w-5 h-5 animate-spin" />
                     <span className="text-sm font-medium">
                        Loading more eSIMs...
                     </span>
                  </div>
               </div>
            )}

            {/* End of list indicator */}
            {!hasMore && esims.length > 0 && (
               <div className="flex justify-center py-4">
                  <div className="text-sm text-muted-foreground">
                     You've reached the end of your eSIMs
                  </div>
               </div>
            )}
         </div>

         {/* Statistics */}
         <Card>
            <CardContent className="p-4">
               <h3 className="font-semibold text-foreground mb-4">
                  {t("myesims.statistics")}
               </h3>
               <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                     <p className="text-2xl font-bold text-primary">
                        {esims.length}
                     </p>
                     <p className="text-sm text-muted-foreground">
                        {t("myesims.totalESIMs")}
                     </p>
                  </div>
                  <div>
                     <p className="text-2xl font-bold text-green-500">
                        {esims.filter((e) => e.status === "active").length}
                     </p>
                     <p className="text-sm text-muted-foreground">
                        {t("myesims.activeLabel")}
                     </p>
                  </div>
                  <div>
                     <p className="text-2xl font-bold text-orange-500">
                        {esims
                           .reduce((acc, esim) => acc + esim.dataUsed, 0)
                           .toFixed(1)}{" "}
                        GB
                     </p>
                     <p className="text-sm text-muted-foreground">
                        {t("myesims.dataUsedLabel")}
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Modals */}
         <ESIMDetailsModal
            esim={selectedESIM}
            isOpen={showDetailsModal}
            onClose={handleCloseDetails}
            onShowQR={handleShowQRFromDetails}
         />

         <ESIMQRModal
            esim={selectedESIM}
            isOpen={showQRModal}
            onClose={handleCloseQR}
         />
      </div>
   );
}
