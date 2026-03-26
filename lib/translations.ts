// Define available locales
export const locales = ["en", "ru", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// Translation type
type TranslationKey = string;
type TranslationValue = string | Record<string, any>;
type Translations = Record<TranslationKey, TranslationValue>;

// Import translation data from JSON files
import enTranslations from "../locales/en/common.json";
import ruTranslations from "../locales/ru/common.json";
import idTranslations from "../locales/id/common.json";

// Flatten nested JSON objects to dot notation
function flattenTranslations(obj: any, prefix = ""): Record<string, string> {
   const result: Record<string, string> = {};

   for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
         const newKey = prefix ? `${prefix}.${key}` : key;

         if (
            typeof obj[key] === "object" &&
            obj[key] !== null &&
            !Array.isArray(obj[key])
         ) {
            // Recursively flatten nested objects
            Object.assign(result, flattenTranslations(obj[key], newKey));
         } else {
            // Convert to string for leaf values
            result[newKey] = String(obj[key]);
         }
      }
   }

   return result;
}

// Translation data loaded from JSON files
export const translations: Record<Locale, Translations> = {
   en: flattenTranslations(enTranslations),
   ru: flattenTranslations(ruTranslations),
   id: flattenTranslations(idTranslations),
};

// Function to get translation for a specific locale and key
export function getTranslation(locale: Locale, key: TranslationKey): string {
   const value = translations[locale]?.[key];
   if (typeof value === "string") {
      return value;
   }
   // Fallback to English if translation doesn't exist
   const fallback = translations[defaultLocale]?.[key];
   if (typeof fallback === "string") {
      return fallback;
   }
   return key; // Return key if no translation found
}

// Function to get locale from server-side params
export function getLocaleFromParams(params: { locale: string }): Locale {
   const locale = params.locale as Locale;
   return locales.includes(locale) ? locale : defaultLocale;
}
