'use client'

import { useParams } from 'next/navigation'
import { translations, locales, defaultLocale, getTranslation, type Locale } from './translations'

// Re-export for convenience
export { locales, defaultLocale } from './translations'
export type { Locale } from './translations'

// Custom hook to get translations (client components only)
export function useTranslations() {
  const params = useParams()
  const locale = (params?.locale as Locale) || defaultLocale

  const t = (key: string): string => {
    return getTranslation(locale, key)
  }

  return { t, locale }
}