import { useState, useEffect } from "react";

export interface OrderEsim {
   id: string;
   iccid: string;
   imsi: string;
   ac: string;
   status: string;
   remainingData: number;
   remainingDataFormatted: { value: number; unit: string };
   expiredAt: Date;
}

export interface Order {
   id: string;
   country: string;
   flag: string; // Now a URL to the flag image
   plan: string;
   price: number;
   status: string;
   orderDate: string;
   activationDate: string;
   paymentMethod: string;
   color: string;
   txId: string;
   packageCode?: string; // Package code for pending orders
   esims: OrderEsim[];
}

interface PaginationInfo {
   page: number;
   limit: number;
   totalCount: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPrevPage: boolean;
}

interface UseOrdersResult {
   orders: Order[];
   loading: boolean;
   loadingMore: boolean;
   error: string | null;
   refetch: () => void;
   loadMore: () => void;
   hasMore: boolean;
   pagination: PaginationInfo | null;
}

export function useOrders(): UseOrdersResult {
   const [orders, setOrders] = useState<Order[]>([]);
   const [loading, setLoading] = useState(true);
   const [loadingMore, setLoadingMore] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [pagination, setPagination] = useState<PaginationInfo | null>(null);
   const [currentPage, setCurrentPage] = useState(1);

   const fetchOrders = async (page: number = 1, append: boolean = false) => {
      try {
         if (append) {
            setLoadingMore(true);
         } else {
            setLoading(true);
         }
         setError(null);

         // Get Telegram WebApp data from window object
         const telegramData = (window as any).Telegram?.WebApp?.initData;

         if (!telegramData) {
            throw new Error("Telegram WebApp data not available");
         }

         const response = await fetch(`/api/orders?page=${page}&limit=5`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "X-Telegram-Data": telegramData,
            },
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch orders");
         }

         const data = await response.json();

         if (data.success) {
            if (append) {
               setOrders((prev) => [...prev, ...data.data]);
            } else {
               setOrders(data.data);
            }
            setPagination(data.pagination);
            setCurrentPage(page);
         } else {
            throw new Error(data.error || "Failed to fetch orders");
         }
      } catch (err) {
         setError(
            err instanceof Error ? err.message : "Unknown error occurred"
         );
      } finally {
         setLoading(false);
         setLoadingMore(false);
      }
   };

   const loadMore = async () => {
      if (pagination?.hasNextPage && !loadingMore) {
         // Add 1 second delay to see the loading indicator
         await new Promise((resolve) => setTimeout(resolve, 1000));
         fetchOrders(currentPage + 1, true);
      }
   };

   const refetch = () => {
      setCurrentPage(1);
      fetchOrders(1, false);
   };

   useEffect(() => {
      fetchOrders(1, false);
   }, []);

   return {
      orders,
      loading,
      loadingMore,
      error,
      refetch,
      loadMore,
      hasMore: pagination?.hasNextPage || false,
      pagination,
   };
}
