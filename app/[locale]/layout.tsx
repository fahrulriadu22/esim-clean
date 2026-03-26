import type { Metadata } from "next";
import { locales, getLocaleFromParams } from "@/lib/translations";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
   title: "eSIM App",
   description: "Manage your eSIM connections",
};

export function generateStaticParams() {
   return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
   children,
   params,
}: {
   children: React.ReactNode;
   params: Promise<{ locale: string }>;
}) {
   const resolvedParams = await params;
   const locale = getLocaleFromParams(resolvedParams);

   // Validate locale
   if (!locales.includes(resolvedParams.locale as any)) {
      notFound();
   }

   // This layout only provides locale-specific logic
   // The HTML structure is handled by the root layout
   return <>{children}</>;
}
