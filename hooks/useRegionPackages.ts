"use client";

import { useState, useEffect } from "react";

export interface RegionPackage {
   id: string;
   code: string;
   name: string;
   duration: number;
   durationUnit: string;
   price: number;
   data: string;
   dataUnit: string;
   pricePerData: number;
   margin: number;
   originalPrice: number;
}

export interface RegionPackagesData {
   packages: RegionPackage[];
   supportedCountries: string[];
}

interface UseRegionPackagesResult {
   data: RegionPackagesData | null;
   loading: boolean;
   error: string | null;
   refetch: () => void;
}

export function useRegionPackages(
   regionName?: string
): UseRegionPackagesResult {
   const [data, setData] = useState<RegionPackagesData | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchPackages = async () => {
      if (!regionName) {
         setData(null);
         return;
      }

      setLoading(true);
      setError(null);

      try {
         // Get Telegram WebApp data from window object
         const telegramData = (window as any).Telegram?.WebApp?.initData;

         if (!telegramData) {
            throw new Error("Telegram WebApp data not available");
         }

         const response = await fetch(
            `/api/region-packages?regionName=${encodeURIComponent(regionName)}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  "X-Telegram-Data": telegramData,
               },
            }
         );
         const result = await response.json();

         if (!response.ok) {
            throw new Error(result.error || "Failed to fetch region packages");
         }

         if (result.success) {
            setData(result.data);
         } else {
            throw new Error(result.error || "Failed to fetch region packages");
         }
      } catch (err) {
         const errorMessage =
            err instanceof Error
               ? err.message
               : "Failed to fetch region packages";
         setError(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchPackages();
   }, [regionName]);

   return {
      data,
      loading,
      error,
      refetch: fetchPackages,
   };
}

