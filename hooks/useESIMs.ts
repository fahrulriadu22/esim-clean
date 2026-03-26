import { useState, useEffect } from "react";

export interface ESIMData {
   id: string;
   country: string;
   flag: string;
   plan: string;
   dataUsed: number;
   dataTotal: number;
   daysLeft: number;
   status: "new" | "active" | "low-data" | "expired";
   color: string;
   purchaseDate: string;
   activationDate: string;
   iccid: string;
   imsi: string;
   ac: string;
   shortUrl: string;
   originalStatus: string; // Original eSIM status from webhook (IN_USE, GOT_RESOURCE, etc.)
   remainingData: number;
   remainingDataFormatted: { value: number; unit: string };
   expiredAt: string;
   orderNo: string;
}

interface PaginationInfo {
   page: number;
   limit: number;
   total: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPrevPage: boolean;
}

interface UseESIMsResult {
   esims: ESIMData[];
   loading: boolean;
   error: string | null;
   refetch: () => void;
   loadMore: () => void;
   hasMore: boolean;
   pagination: PaginationInfo | null;
   loadingMore: boolean;
}

export function useESIMs(): UseESIMsResult {
   const [esims, setESIMs] = useState<ESIMData[]>([]);
   const [loading, setLoading] = useState(true);
   const [loadingMore, setLoadingMore] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [pagination, setPagination] = useState<PaginationInfo | null>(null);
   const [currentPage, setCurrentPage] = useState(1);

   const fetchESIMs = async (page: number = 1, append: boolean = false) => {
      try {
         if (append) {
            setLoadingMore(true);
         } else {
            setLoading(true);
         }
         setError(null);

         const response = await fetch(`/api/esims?page=${page}&limit=5`, {
            method: "GET",
            headers: {
               "X-Telegram-Data":
                  (typeof window !== "undefined" &&
                     window.Telegram?.WebApp?.initData) ||
                  "",
            },
         });

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         const result = await response.json();

         if (result.success) {
            if (append) {
               setESIMs((prev) => [...prev, ...result.data]);
            } else {
               setESIMs(result.data);
            }
            setPagination(result.pagination);
            setCurrentPage(page);
         } else {
            throw new Error(result.message || "Failed to fetch ESIMs");
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
         fetchESIMs(currentPage + 1, true);
      }
   };

   const refetch = () => {
      setCurrentPage(1);
      fetchESIMs(1, false);
   };

   useEffect(() => {
      fetchESIMs(1, false);
   }, []);

   return {
      esims,
      loading,
      error,
      refetch,
      loadMore,
      hasMore: pagination?.hasNextPage || false,
      pagination,
      loadingMore,
   };
}
