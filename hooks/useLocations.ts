import { useState, useEffect } from "react";

export interface Location {
   code: string;
   name: string;
   type: number; // 1 = country (no sub-locations), 2 = region (has sub-locations)
   subLocationList?: Array<{
      code: string;
      name: string;
   }> | null;
   packageCount?: number;
   startingPrice?: number;
}

export interface ProcessedLocation {
   code: string;
   name: string;
   flag: string;
   color: string;
   plans: string;
   type: number;
   subLocationList?: Array<{
      code: string;
      name: string;
   }> | null;
}

export function useLocations() {
   const [locations, setLocations] = useState<ProcessedLocation[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // Color palette for different countries/regions
   const colorPalette = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-lime-500",
      "bg-amber-500",
      "bg-emerald-500",
      "bg-violet-500",
      "bg-rose-500",
      "bg-sky-500",
   ];

   // Get flag URL from flagsapi.com
   const getFlagUrl = (code: string): string => {
      return `https://flagsapi.com/${code}/flat/64.png`;
   };

   // Process location data
   const processLocation = (
      location: Location,
      index: number
   ): ProcessedLocation => {
      const color = colorPalette[index % colorPalette.length];
      const flag = getFlagUrl(location.code); // Use flag API URL instead of emoji

      // Use actual package count and starting price from database
      const planCount = location.packageCount || 0;
      const startingPrice = location.startingPrice || 0;

      // Format the plans text with actual data
      const plans =
         planCount > 0
            ? `${planCount} plans from $${startingPrice.toFixed(2)}`
            : "No plans available";

      return {
         code: location.code,
         name: location.name,
         flag,
         color,
         plans,
         type: location.type,
         subLocationList: location.subLocationList,
      };
   };

   useEffect(() => {
      const fetchLocations = async () => {
         try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/locations");
            const result = await response.json();

            if (!result.success) {
               throw new Error(result.error || "Failed to fetch locations");
            }

            const processedLocations = result.data.map(
               (location: Location, index: number) =>
                  processLocation(location, index)
            );

            setLocations(processedLocations);
         } catch (err) {
            setError(
               err instanceof Error ? err.message : "Failed to fetch locations"
            );
         } finally {
            setLoading(false);
         }
      };

      fetchLocations();
   }, []);

   // Separate countries and regions based on sub-locations
   // Countries: type 1 (no sub-locations) - individual countries
   // Regions: type 2 (has sub-locations) - grouped regions
   const countries = locations.filter((location) => location.type === 1);
   const regions = locations.filter((location) => location.type === 2);

   return {
      locations,
      countries,
      regions,
      loading,
      error,
      refetch: () => {
         setLoading(true);
         setError(null);
         // Re-trigger the effect
         window.location.reload();
      },
   };
}
