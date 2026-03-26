"use client";

import { useState, useEffect, useRef } from "react";

export interface Package {
   id: string;
   name: string;
   code: string;
   duration: number;
   durationUnit: string;
   price: number;
   data: string;
   dataUnit: string;
   pricePerData: number;
   regionId: string;
   region: {
      id: string;
      name: string;
      code: string;
   };
   polarLink?: string;
   createdAt: string;
   updatedAt: string;
}

interface UsePackagesResult {
   packages: Package[];
   loading: boolean;
   error: string | null;
   refetch: () => void;
}

export function usePackages(locationCode?: string): UsePackagesResult {
   const [packages, setPackages] = useState<Package[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   
   const fetchedRef = useRef<string | null>(null);
   const abortControllerRef = useRef<AbortController | null>(null);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
   const isMountedRef = useRef(true);

   useEffect(() => {
      isMountedRef.current = true;
      return () => {
         isMountedRef.current = false;
      };
   }, []);

   const fetchPackages = async () => {
      if (!locationCode) {
         setPackages([]);
         return;
      }

      // RESET PAKET SEBELUMNYA
      setPackages([]);
      
      // CEK APAKAH SUDAH DI-FETCH UNTUK LOCATION INI
      if (fetchedRef.current === locationCode) {
         console.log(`⏭ Skipping fetch for ${locationCode} (already fetched)`);
         return;
      }

      // BATALKAN FETCH SEBELUMNYA KALAU ADA
      if (abortControllerRef.current) {
         abortControllerRef.current.abort();
      }

      // BUAT ABORT CONTROLLER BARU
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setLoading(true);
      setError(null);

      try {
         console.log(`📡 Fetching packages for ${locationCode}...`);
         
         const response = await fetch(
            `/api/public-packages?locationCode=${locationCode}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
               signal,
            }
         );
         
         const result = await response.json();

         if (!response.ok) {
            throw new Error(result.error || "Failed to fetch packages");
         }

         if (result.success && isMountedRef.current) {
            setPackages(result.data);
            fetchedRef.current = locationCode;
            console.log(`✅ Fetched ${result.data?.length || 0} packages for ${locationCode}`);
         } else if (isMountedRef.current) {
            throw new Error(result.error || "Failed to fetch packages");
         }
      } catch (err: any) {
         if (err.name === 'AbortError' || err.code === 20) {
            console.log(`🛑 Fetch aborted for ${locationCode}`);
            return;
         }
         
         if (isMountedRef.current) {
            const errorMessage =
               err instanceof Error ? err.message : "Failed to fetch packages";
            setError(errorMessage);
            console.error(`❌ Error fetching ${locationCode}:`, errorMessage);
         }
      } finally {
         if (isMountedRef.current) {
            setLoading(false);
         }
      }
   };

   useEffect(() => {
      // CLEANUP TIMEOUT SEBELUMNYA
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
      }

      // RESET fetchedRef KALAU locationCode BERUBAH
      if (locationCode !== fetchedRef.current) {
         fetchedRef.current = null;
      }

      // DEBOUNCE: TUNGGU 300ms SEBELUM FETCH
      timeoutRef.current = setTimeout(() => {
         fetchPackages();
      }, 300);
      
      return () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }
         if (abortControllerRef.current) {
            abortControllerRef.current.abort();
         }
      };
   }, [locationCode]);

   return {
      packages,
      loading,
      error,
      refetch: () => {
         fetchedRef.current = null;
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }
         fetchPackages();
      },
   };
}
