"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function InternetTabSkeleton() {
   return (
      <div className="p-6 space-y-8">
         {/* Search bar skeleton */}
         <div className="relative">
            <Skeleton className="w-full h-12 rounded-2xl bg-gray-200 dark:bg-gray-800" />
         </div>

         {/* Tab switcher skeleton - 3 tabs (Countries, Regions, Global) - LEBIH PENDEK */}
         <div className="flex bg-gray-200 dark:bg-gray-800 rounded-full p-1 max-w-xs">
            <Skeleton className="flex-1 h-8 rounded-full bg-gray-400 dark:bg-gray-600" />
            <Skeleton className="flex-1 h-8 rounded-full ml-1 bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="flex-1 h-8 rounded-full ml-1 bg-gray-300 dark:bg-gray-700" />
         </div>

         {/* Section title skeleton */}
         <div className="space-y-6">
            <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700" />

            {/* Country/Region cards skeleton - 5 cards aja biar ga kepanjangan */}
            <div className="space-y-2">
               {Array.from({ length: 5 }).map((_, index) => (
                  <Card
                     key={index}
                     className="shadow-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                  >
                     <CardContent className="flex items-center justify-between py-2 px-3">
                        <div className="flex items-center space-x-2.5">
                           {/* Flag skeleton */}
                           <Skeleton className="w-6 h-6 rounded-sm bg-gray-300 dark:bg-gray-700" />

                           {/* Text content skeleton */}
                           <div className="space-y-1">
                              <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-700" />
                              <Skeleton className="h-3 w-32 bg-gray-200 dark:bg-gray-800" />
                           </div>
                        </div>

                        {/* Arrow skeleton */}
                        <Skeleton className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full" />
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   );
}
