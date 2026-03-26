"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

interface TonConnectProviderProps {
   children: React.ReactNode;
}

export function TonConnectProvider({ children }: TonConnectProviderProps) {
   return (
      <TonConnectUIProvider
         manifestUrl={`${process.env.NEXT_PUBLIC_APP_URL}/tonconnect-manifest.json`}
         restoreConnection={true}
      >
         {children}
      </TonConnectUIProvider>
   );
}
