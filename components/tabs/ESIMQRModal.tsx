"use client";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, QrCode } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { ESIMData } from "@/hooks/useESIMs";
import { useState, useEffect } from "react";

interface ESIMQRModalProps {
   esim: ESIMData | null;
   isOpen: boolean;
   onClose: () => void;
}

export function ESIMQRModal({ esim, isOpen, onClose }: ESIMQRModalProps) {
   const { t } = useTranslations();
   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
   const [copied, setCopied] = useState(false);

   useEffect(() => {
      if (esim && isOpen) {
         // Generate QR code using a QR code service
         // Use shortUrl for eSIM activation instead of AC
         const qrData = encodeURIComponent(esim.shortUrl || esim.ac);
         const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrData}`;
         setQrCodeUrl(qrUrl);
      }
   }, [esim, isOpen]);

   const copyActivationCode = async () => {
      if (!esim) return;

      try {
         await navigator.clipboard.writeText(esim.shortUrl || esim.ac);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         // Failed to copy activation code
      }
   };

   const navigateToActivation = () => {
      if (!esim) return;

      const activationUrl = esim.shortUrl || esim.ac;
      if (activationUrl) {
         window.open(activationUrl, "_blank", "noopener,noreferrer");
      }
   };

   if (!esim) return null;

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-sm">
            <DialogHeader>
               <DialogTitle className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5" />
                  <span>{t("myesims.qrCode")}</span>
               </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
               {/* ESIM Info */}
               <div className="text-center">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                     <img
                        src={esim.flag}
                        alt={esim.country}
                        className="w-6 h-6 rounded"
                        onError={(e) => {
                           e.currentTarget.style.display = "none";
                        }}
                     />
                     <h3 className="font-semibold">{esim.country}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                     {esim.plan}
                  </p>
                  <Badge variant="outline" className="text-xs">
                     {esim.iccid}
                  </Badge>
               </div>

               {/* QR Code */}
               <div className="flex flex-col items-center space-y-3">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                     {qrCodeUrl ? (
                        <img
                           src={qrCodeUrl}
                           alt="ESIM QR Code"
                           className="w-40 h-40"
                           onError={(e) => {
                              e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
                        <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                          <rect width="160" height="160" fill="white"/>
                          <text x="80" y="80" text-anchor="middle" font-family="Arial" font-size="10" fill="black">
                            QR Code Error
                          </text>
                        </svg>
                       `)}`;
                           }}
                        />
                     ) : (
                        <div className="w-40 h-40 bg-gray-100 rounded flex items-center justify-center">
                           <QrCode className="w-10 h-10 text-gray-400" />
                        </div>
                     )}
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                     {t("myesims.scanQRInstructions")}
                  </p>
               </div>

               {/* Actions */}
               <div className="flex space-x-2 pt-2">
                  <Button
                     variant="outline"
                     className="flex-1"
                     onClick={navigateToActivation}
                  >
                     <ExternalLink className="w-4 h-4 mr-2" />
                     {t("myesims.activateESIM")}
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
