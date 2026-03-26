"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
   ArrowLeft,
   Download,
   RefreshCw,
   CheckCircle,
   Clock,
   XCircle,
   AlertCircle,
   CreditCard,
} from "lucide-react";
import { useOrders, Order } from "@/hooks/useOrders";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

interface OrdersPageProps {
   onBack: () => void;
}

type FilterType = "all" | "completed" | "pending" | "failed";

export function OrdersPage({ onBack }: OrdersPageProps) {
   const { orders, loading, loadingMore, error, refetch, loadMore, hasMore } =
      useOrders();
   const [activeFilter, setActiveFilter] = useState<FilterType>("all");
   const [completingPayment, setCompletingPayment] = useState<string | null>(
      null
   );
   const observerRef = useRef<IntersectionObserver | null>(null);

   const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
         case "completed":
            return "default";
         case "pending":
         case "processing":
            return "secondary";
         case "failed":
            return "destructive";
         default:
            return "default";
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status.toLowerCase()) {
         case "completed":
            return <CheckCircle className="w-4 h-4" />;
         case "pending":
         case "processing":
            return <Clock className="w-4 h-4" />;
         case "failed":
            return <XCircle className="w-4 h-4" />;
         default:
            return <Clock className="w-4 h-4" />;
      }
   };

   const getStatusText = (status: string) => {
      switch (status.toLowerCase()) {
         case "completed":
            return "Completed";
         case "pending":
            return "Pending";
         case "processing":
            return "Processing";
         case "failed":
            return "Failed";
         default:
            return "Unknown";
      }
   };

   // Intersection Observer for infinite scroll
   const lastOrderElementRef = useCallback(
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

   // Filter orders based on active filter
   const filteredOrders = orders.filter((order) => {
      if (activeFilter === "all") return true;
      return order.status.toLowerCase() === activeFilter;
   });

   const completedOrders = orders.filter(
      (order) => order.status.toLowerCase() === "completed"
   ).length;
   const totalSpent = orders
      .filter((order) => order.status.toLowerCase() === "completed")
      .reduce((acc, order) => acc + order.price, 0);

   // Handle complete payment button click
   const handleCompletePayment = async (order: Order) => {
      if (completingPayment) return;

      setCompletingPayment(order.id);

      try {
         const telegramData = (window as any).Telegram?.WebApp?.initData;

         if (!telegramData) {
            toast.error("Telegram data not available");
            setCompletingPayment(null);
            return;
         }

         // Get payment completion information using referenceId
         // For pending payments, order.id is the referenceId, for completed orders it's orderNo
         const referenceId = order.status.toLowerCase() === "pending" 
            ? order.id 
            : order.txId;
            
         const response = await fetch(
            `/api/payment-history/complete?referenceId=${referenceId}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  "X-Telegram-Data": telegramData,
               },
            }
         );

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
               errorData.error || "Failed to get payment information"
            );
         }

         const data = await response.json();

         if (!data.success) {
            throw new Error(data.error || "Failed to get payment information");
         }

         const paymentData = data.data;

         if (paymentData.type === "PAYPAL" && paymentData.payLink) {
            // Open PayPal payment link
            window.open(paymentData.payLink, "_blank");
            toast.success("Opening PayPal checkout...");
         } else if (paymentData.type === "STARS" && paymentData.invoiceLink) {
            // Open Telegram Stars payment
            if (
               typeof window !== "undefined" &&
               window.Telegram?.WebApp?.openInvoice
            ) {
               window.Telegram.WebApp.openInvoice(
                  paymentData.invoiceLink,
                  (status) => {
                     if (status === "paid") {
                        toast.success("Payment successful!");
                        setTimeout(() => {
                           refetch();
                        }, 2000);
                     } else if (status === "cancelled") {
                        toast.info("Payment was cancelled");
                     } else if (status === "failed") {
                        toast.error("Payment failed");
                     }
                  }
               );
            } else {
               // Fallback: open in new window
               window.open(paymentData.invoiceLink, "_blank");
               toast.success("Opening payment page...");
            }
         } else if (paymentData.type === "TON") {
            // Show TON payment instructions
            const appUrl =
               process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
            const tonPaymentUrl = `${appUrl}/ton-payment?referenceId=${paymentData.referenceId}&amount=${paymentData.amount}`;

            // Open TON payment page or show instructions
            if (
               window.confirm(
                  `Complete TON payment for $${paymentData.amount.toFixed(2)}?\n\nReference ID: ${paymentData.referenceId}\n\nYou will be redirected to the TON payment page.`
               )
            ) {
               window.open(tonPaymentUrl, "_blank");
               toast.info(
                  "Please complete the TON payment and verify the transaction"
               );
            }
         } else {
            toast.error("Unknown payment method or missing payment link");
         }
      } catch (error) {
         console.error("Error completing payment:", error);
         toast.error(
            error instanceof Error
               ? error.message
               : "Failed to complete payment"
         );
      } finally {
         setCompletingPayment(null);
      }
   };

   // Loading skeleton component
   const OrderSkeleton = () => (
      <Card className="overflow-hidden shadow-premium bg-gradient-to-r from-card to-muted/10">
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
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <Skeleton className="h-3 w-16 mb-1 bg-muted-foreground/20" />
                     <Skeleton className="h-4 w-20 bg-foreground/20" />
                  </div>
                  <div>
                     <Skeleton className="h-3 w-12 mb-1 bg-muted-foreground/20" />
                     <Skeleton className="h-4 w-16 bg-foreground/20" />
                  </div>
                  <div>
                     <Skeleton className="h-3 w-20 mb-1 bg-muted-foreground/20" />
                     <Skeleton className="h-4 w-24 bg-foreground/20" />
                  </div>
                  <div>
                     <Skeleton className="h-3 w-16 mb-1 bg-muted-foreground/20" />
                     <Skeleton className="h-4 w-12 bg-foreground/20" />
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );

   // Error state component
   const ErrorState = () => (
      <Card className="border-destructive/50">
         <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
               Failed to Load Orders
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={refetch} variant="outline" size="sm">
               <RefreshCw className="w-4 h-4 mr-2" />
               Try Again
            </Button>
         </CardContent>
      </Card>
   );

   // Empty state component
   const EmptyState = () => (
      <Card>
         <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
               <CheckCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
               No Orders Found
            </h3>
            <p className="text-muted-foreground">
               {activeFilter === "all"
                  ? "You haven't made any orders yet."
                  : `No ${activeFilter} orders found.`}
            </p>
         </CardContent>
      </Card>
   );

   return (
      <div className="p-4 space-y-6">
         {/* Header with back button */}
         <div className="flex items-center space-x-4 py-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
               <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
               <h1 className="text-2xl font-bold text-foreground">Orders</h1>
               <p className="text-muted-foreground">Your purchase history</p>
            </div>
            {!loading && (
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={refetch}
                  className="p-2"
               >
                  <RefreshCw className="w-5 h-5" />
               </Button>
            )}
         </div>

         {/* Order Statistics */}
         {!loading && !error && (
            <Card>
               <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-4">
                     Overview
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                     <div>
                        <p className="text-2xl font-bold text-primary">
                           {orders.length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                           Total Orders
                        </p>
                     </div>
                     <div>
                        <p className="text-2xl font-bold text-green-500">
                           {completedOrders}
                        </p>
                        <p className="text-sm text-muted-foreground">
                           Completed
                        </p>
                     </div>
                     <div>
                        <p className="text-2xl font-bold text-blue-500">
                           ${totalSpent.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                           Total Spent
                        </p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         )}

         {/* Filter Tabs */}
         {!loading && !error && orders.length > 0 && (
            <div className="flex bg-muted/50 rounded-lg p-0.5">
               <button
                  className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                     activeFilter === "all"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveFilter("all")}
               >
                  All Orders
               </button>
               <button
                  className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                     activeFilter === "completed"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveFilter("completed")}
               >
                  Completed
               </button>
               <button
                  className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                     activeFilter === "pending"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveFilter("pending")}
               >
                  Pending
               </button>
               <button
                  className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                     activeFilter === "failed"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveFilter("failed")}
               >
                  Failed
               </button>
            </div>
         )}

         {/* Content Area */}
         {loading ? (
            <div className="space-y-4">
               {[...Array(3)].map((_, i) => (
                  <OrderSkeleton key={i} />
               ))}
            </div>
         ) : error ? (
            <ErrorState />
         ) : filteredOrders.length === 0 ? (
            <EmptyState />
         ) : (
            <div className="space-y-4">
               {filteredOrders.map((order, index) => (
                  <Card
                     key={order.id}
                     className="overflow-hidden"
                     ref={
                        index === filteredOrders.length - 1
                           ? lastOrderElementRef
                           : null
                     }
                  >
                     <CardContent className="p-0">
                        {/* Order Header */}
                        <div className="flex items-center justify-between p-4 bg-card">
                           <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 flex items-center justify-center">
                                 <img
                                    src={order.flag}
                                    alt={order.country}
                                    className="w-6 h-6 object-cover rounded"
                                    onError={(e) => {
                                       e.currentTarget.src = "🌍";
                                       e.currentTarget.className =
                                          "w-6 h-6 text-2xl";
                                    }}
                                 />
                              </div>
                              <div>
                                 <h3 className="font-semibold text-foreground">
                                    {order.country}
                                 </h3>
                                 <p className="text-sm text-muted-foreground">
                                    {order.plan}
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-center space-x-2">
                              <Badge
                                 variant={getStatusColor(order.status)}
                                 className="flex items-center space-x-1"
                              >
                                 {getStatusIcon(order.status)}
                                 <span>{getStatusText(order.status)}</span>
                              </Badge>
                           </div>
                        </div>

                        {/* Order Details */}
                        <div className="p-4 bg-muted/10">
                           <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div>
                                 <p className="text-muted-foreground">
                                    Order ID
                                 </p>
                                 <p className="font-medium text-foreground">
                                    {order.id}
                                 </p>
                              </div>
                              <div>
                                 <p className="text-muted-foreground">Amount</p>
                                 <p className="font-medium text-foreground">
                                    ${order.price.toFixed(2)}
                                 </p>
                              </div>
                              <div>
                                 <p className="text-muted-foreground">
                                    Order Date
                                 </p>
                                 <p className="font-medium text-foreground">
                                    {new Date(
                                       order.orderDate
                                    ).toLocaleDateString()}
                                 </p>
                              </div>
                              <div>
                                 <p className="text-muted-foreground">
                                    Payment
                                 </p>
                                 <p className="font-medium text-foreground">
                                    {order.paymentMethod}
                                 </p>
                              </div>
                           </div>

                           {/* eSIM Details */}
                           {order.esims && order.esims.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-muted">
                                 <h4 className="font-medium text-foreground mb-2">
                                    eSIM Details
                                 </h4>
                                 {order.esims.map((esim) => (
                                    <div
                                       key={esim.id}
                                       className="grid grid-cols-2 gap-4 text-sm"
                                    >
                                       <div>
                                          <p className="text-muted-foreground">
                                             ICCID
                                          </p>
                                          <p className="font-mono text-xs text-foreground">
                                             {esim.iccid}
                                          </p>
                                       </div>
                                       <div>
                                          <p className="text-muted-foreground">
                                             Status
                                          </p>
                                          <p className="font-medium text-foreground">
                                             {esim.status}
                                          </p>
                                       </div>
                                       <div>
                                          <p className="text-muted-foreground">
                                             Remaining Data
                                          </p>
                                          <p className="font-medium text-foreground">
                                             {esim.remainingDataFormatted.value.toFixed(
                                                2
                                             )}{" "}
                                             {esim.remainingDataFormatted.unit}
                                          </p>
                                       </div>
                                       <div>
                                          <p className="text-muted-foreground">
                                             Expires
                                          </p>
                                          <p className="font-medium text-foreground">
                                             {new Date(
                                                esim.expiredAt
                                             ).toLocaleDateString()}
                                          </p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {/* Complete Payment Button for Pending Orders */}
                           {order.status.toLowerCase() === "pending" && (
                              <div className="mt-4 pt-4 border-t border-muted">
                                 <Button
                                    onClick={() => handleCompletePayment(order)}
                                    disabled={completingPayment === order.id}
                                    className="w-full"
                                    size="lg"
                                 >
                                    {completingPayment === order.id ? (
                                       <>
                                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                          Processing...
                                       </>
                                    ) : (
                                       <>
                                          <CreditCard className="w-4 h-4 mr-2" />
                                          Complete Payment
                                       </>
                                    )}
                                 </Button>
                                 <p className="text-xs text-muted-foreground mt-2 text-center">
                                    Complete your payment to activate your eSIM
                                 </p>
                              </div>
                           )}
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
                           Loading more orders...
                        </span>
                     </div>
                  </div>
               )}

               {/* End of list indicator */}
               {!hasMore && orders.length > 0 && (
                  <div className="flex justify-center py-4">
                     <div className="text-sm text-muted-foreground">
                        You've reached the end of your orders
                     </div>
                  </div>
               )}
            </div>
         )}

         {/* Support Section */}
         {!loading && !error && (
            <Card className="bg-primary/5">
               <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                           <CheckCircle className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div>
                           <p className="font-medium text-foreground">
                              Need Help?
                           </p>
                           <p className="text-sm text-muted-foreground">
                              Contact support for order assistance
                           </p>
                        </div>
                     </div>
                     <Button variant="outline" size="sm">
                        Contact Support
                     </Button>
                  </div>
               </CardContent>
            </Card>
         )}
      </div>
   );
}
