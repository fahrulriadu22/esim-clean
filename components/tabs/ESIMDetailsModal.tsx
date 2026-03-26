"use client";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Copy, Calendar, Clock, Smartphone, Wifi } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { ESIMData } from "@/hooks/useESIMs";
import { useState } from "react";

interface ESIMDetailsModalProps {
   esim: ESIMData | null;
   isOpen: boolean;
   onClose: () => void;
   onShowQR: () => void;
}

export function ESIMDetailsModal({
   esim,
   isOpen,
   onClose,
   onShowQR,
}: ESIMDetailsModalProps) {
   const { t } = useTranslations();
   const [copiedField, setCopiedField] = useState<string | null>(null);

   if (!esim) return null;

   const copyToClipboard = async (text: string, field: string) => {
      try {
         await navigator.clipboard.writeText(text);
         setCopiedField(field);
         setTimeout(() => setCopiedField(null), 2000);
      } catch (err) {
         // Failed to copy text
      }
   };

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

   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString();
   };

   const formatDateTime = (dateString: string) => {
      return new Date(dateString).toLocaleString();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center space-x-3">
                  <img
                     src={esim.flag}
                     alt={esim.country}
                     className="w-6 h-6 rounded"
                     onError={(e) => {
                        e.currentTarget.style.display = "none";
                     }}
                  />
                  <span>{esim.country}</span>
                  <Badge variant={getStatusColor(esim.status)}>
                     {getStatusText(esim.status)}
                  </Badge>
               </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
               {/* Plan Information */}
               <Card>
                  <CardContent className="p-4">
                     <h3 className="font-semibold text-foreground mb-3 flex items-center">
                        <Wifi className="w-4 h-4 mr-2" />
                        {t("myesims.planInfo")}
                     </h3>
                     <div className="space-y-2">
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">
                              {t("myesims.plan")}
                           </span>
                           <span className="font-medium">{esim.plan}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">
                              {t("myesims.dataUsed")}
                           </span>
                           <span className="font-medium">
                              {esim.dataUsed.toFixed(1)} GB / {esim.dataTotal}{" "}
                              GB
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">
                              {t("myesims.remainingData")}
                           </span>
                           <span className="font-medium">
                              {esim.remainingDataFormatted.value.toFixed(2)}{" "}
                              {esim.remainingDataFormatted.unit}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">
                              {t("myesims.daysLeft")}
                           </span>
                           <span className="font-medium">
                              {esim.daysLeft} {t("myesims.days")}
                           </span>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* ESIM Technical Details */}
               <Card>
                  <CardContent className="p-4">
                     <h3 className="font-semibold text-foreground mb-3 flex items-center">
                        <Smartphone className="w-4 h-4 mr-2" />
                        {t("myesims.technicalDetails")}
                     </h3>
                     <div className="space-y-3">
                        {/* ICCID */}
                        <div>
                           <label className="text-sm text-muted-foreground">
                              {t("myesims.iccid")}
                           </label>
                           <div className="flex items-center space-x-2 mt-1">
                              <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                                 {esim.iccid}
                              </code>
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() =>
                                    copyToClipboard(esim.iccid, "iccid")
                                 }
                              >
                                 <Copy className="w-4 h-4" />
                              </Button>
                           </div>
                           {copiedField === "iccid" && (
                              <p className="text-xs text-green-600 mt-1">
                                 {t("myesims.copied")}
                              </p>
                           )}
                        </div>

                        {/* IMSI */}
                        <div>
                           <label className="text-sm text-muted-foreground">
                              {t("myesims.imsi")}
                           </label>
                           <div className="flex items-center space-x-2 mt-1">
                              <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                                 {esim.imsi}
                              </code>
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() =>
                                    copyToClipboard(esim.imsi, "imsi")
                                 }
                              >
                                 <Copy className="w-4 h-4" />
                              </Button>
                           </div>
                           {copiedField === "imsi" && (
                              <p className="text-xs text-green-600 mt-1">
                                 {t("myesims.copied")}
                              </p>
                           )}
                        </div>

                        {/* Activation URL */}
                        <div>
                           <label className="text-sm text-muted-foreground">
                              {t("myesims.activationUrl")}
                           </label>
                           <div className="flex items-center space-x-2 mt-1">
                              <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                                 {esim.shortUrl || esim.ac}
                              </code>
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() =>
                                    copyToClipboard(
                                       esim.shortUrl || esim.ac,
                                       "shortUrl"
                                    )
                                 }
                              >
                                 <Copy className="w-4 h-4" />
                              </Button>
                           </div>
                           {copiedField === "shortUrl" && (
                              <p className="text-xs text-green-600 mt-1">
                                 {t("myesims.copied")}
                              </p>
                           )}
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Dates Information */}
               <Card>
                  <CardContent className="p-4">
                     <h3 className="font-semibold text-foreground mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {t("myesims.dates")}
                     </h3>
                     <div className="space-y-2">
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">
                              {t("myesims.purchased")}
                           </span>
                           <span className="font-medium">
                              {formatDate(esim.purchaseDate)}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">
                              {t("myesims.activated")}
                           </span>
                           <span className="font-medium">
                              {formatDate(esim.activationDate)}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">
                              {t("myesims.expires")}
                           </span>
                           <span className="font-medium">
                              {formatDate(esim.expiredAt)}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">
                              {t("myesims.orderNumber")}
                           </span>
                           <span className="font-medium font-mono text-sm">
                              {esim.orderNo}
                           </span>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Actions */}
               <div className="flex space-x-2 pt-4">
                  <Button
                     variant="outline"
                     className="flex-1"
                     onClick={onShowQR}
                  >
                     {t("myesims.showQRCode")}
                  </Button>
                  <Button
                     variant="outline"
                     className="flex-1"
                     onClick={onClose}
                  >
                     {t("common.close")}
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
