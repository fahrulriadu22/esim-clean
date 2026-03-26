import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { TonConnectProvider } from "@/components/providers/TonConnectProvider";

// This file is required for the app directory to work.
export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body
            className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
            suppressHydrationWarning
         >
            <ThemeProvider
               attribute="class"
               defaultTheme="light"
               enableSystem
               disableTransitionOnChange
            >
               <TonConnectProvider>{children}</TonConnectProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
