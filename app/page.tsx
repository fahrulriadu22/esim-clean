"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { defaultLocale } from "@/i18n";

// This page only renders when the user visits the root path
export default function RootPage() {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);

      // Only run TWA SDK initialization on client side
      if (typeof window !== "undefined") {
         import("@twa-dev/sdk")
            .then(({ default: WebApp }) => {
               WebApp.ready();
               WebApp.MainButton.hide();
               WebApp.expand();
               WebApp.enableClosingConfirmation();
            })
            .catch((error) => {
               // TWA SDK not available
            });
      }
   }, []);

   // Prevent hydration mismatch by not redirecting until mounted
   if (!mounted) {
      return null;
   }

   redirect(`/${defaultLocale}`);
}
