"use client";

import { useState, useEffect } from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
   Loader2,
   CreditCard,
   Calendar,
   DollarSign,
   Hash,
   Mail,
} from "lucide-react";
import { useTranslations } from "@/lib/i18n";

interface TransactionDetailModalProps {
   isOpen: boolean;
   onClose: () => void;
   transactionId: string | null;
}

interface TransactionDetail {
   id: string;
   referenceId: string;
   amount: number;
   paymentMethod: string;
   status: string;
   payerEmail?: string;
   createdAt: string;
   updatedAt: string;
   transactionType: string;
   currency: string;
}

export function TransactionDetailModal({
   isOpen,
   onClose,
   transactionId,
}: TransactionDetailModalProps) {
   const { t } = useTranslations();
   const [transaction, setTransaction] = useState<TransactionDetail | null>(
      null
   );
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (isOpen && transactionId) {
         fetchTransactionDetails();
      }
   }, [isOpen, transactionId]);

   const fetchTransactionDetails = async () => {
      if (!transactionId) return;

      setIsLoading(true);
      setError(null);

      try {
         const WebApp = await import("@twa-dev/sdk");

         const response = await fetch(
            `/api/transaction-detail?id=${transactionId}`,
            {
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Telegram-Data": WebApp.default.initData,
               },
            }
         );

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
               errorData.message || "Failed to fetch transaction details"
            );
         }

         const data = await response.json();
         setTransaction(data.data);
      } catch (err) {
         setError(
            err instanceof Error ? err.message : "Unknown error occurred"
         );
      } finally {
         setIsLoading(false);
      }
   };

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return {
         date: date.toLocaleDateString(),
         time: date.toLocaleTimeString(),
         full: date.toLocaleString(),
      };
   };

   const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
         case "completed":
            return "bg-green-100 text-green-800 border-green-200";
         case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
         case "failed":
            return "bg-red-100 text-red-800 border-red-200";
         default:
            return "bg-gray-100 text-gray-800 border-gray-200";
      }
   };

   const getPaymentMethodIcon = (method: string) => {
      switch (method.toLowerCase()) {
         case "paypal":
            return "💳";
         case "ton":
            return "₮";
         case "crypto":
            return "₿";
         default:
            return "💳";
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-md mx-auto">
            <DialogHeader>
               <DialogTitle className="text-lg font-semibold">
                  Transaction Details
               </DialogTitle>
            </DialogHeader>

            {isLoading ? (
               <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-2">
                     <Loader2 className="w-4 h-4 animate-spin" />
                     <p className="text-sm text-muted-foreground">
                        Loading transaction details...
                     </p>
                  </div>
               </div>
            ) : error ? (
               <div className="text-center py-8">
                  <p className="text-sm text-red-600 mb-4">{error}</p>
                  <Button
                     onClick={fetchTransactionDetails}
                     variant="outline"
                     size="sm"
                  >
                     Try Again
                  </Button>
               </div>
            ) : transaction ? (
               <div className="space-y-4">
                  {/* Transaction Amount */}
                  <Card>
                     <CardContent className="p-6">
                        <div className="text-center space-y-2">
                           <div className="text-3xl font-bold text-green-600">
                              +${transaction.amount.toFixed(2)}
                           </div>
                           <div className="flex items-center justify-center space-x-2">
                              <span className="text-2xl">
                                 {getPaymentMethodIcon(
                                    transaction.paymentMethod
                                 )}
                              </span>
                              <span className="text-sm text-muted-foreground capitalize">
                                 {transaction.paymentMethod}
                              </span>
                           </div>
                           <Badge
                              className={`${getStatusColor(
                                 transaction.status
                              )} border`}
                           >
                              {transaction.status}
                           </Badge>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Transaction Details */}
                  <div className="space-y-3">
                     <div className="flex items-center space-x-3">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                           <p className="text-sm text-muted-foreground">
                              Reference ID
                           </p>
                           <p className="text-sm font-mono">
                              {transaction.referenceId}
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                           <p className="text-sm text-muted-foreground">
                              Date & Time
                           </p>
                           <p className="text-sm">
                              {formatDate(transaction.createdAt).full}
                           </p>
                        </div>
                     </div>

                     {transaction.payerEmail && (
                        <div className="flex items-center space-x-3">
                           <Mail className="w-4 h-4 text-muted-foreground" />
                           <div className="flex-1">
                              <p className="text-sm text-muted-foreground">
                                 Payer Email
                              </p>
                              <p className="text-sm">
                                 {transaction.payerEmail}
                              </p>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            ) : null}
         </DialogContent>
      </Dialog>
   );
}
