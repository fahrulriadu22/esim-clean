"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { useRouter, usePathname } from "next/navigation";

interface LanguagePageProps {
   onBack: () => void;
}

interface Language {
   code: string;
   name: string;
   nativeName: string;
   flag: string;
}

export function LanguagePage({ onBack }: LanguagePageProps) {
   const { t, locale } = useTranslations();
   const [selectedLanguage, setSelectedLanguage] = useState<string>(locale);
   const [isPending, startTransition] = useTransition();
   const router = useRouter();
   const pathname = usePathname();

   const languages: Language[] = [
      { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
      { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
      {
         code: "id",
         name: "Indonesian",
         nativeName: "Bahasa Indonesia",
         flag: "🇮🇩",
      },
   ];

   const handleLanguageChange = (langCode: string) => {
      setSelectedLanguage(langCode);

      startTransition(() => {
         // Create new path with the selected locale
         const segments = pathname.split("/");
         segments[1] = langCode;
         const newPathname = segments.join("/");
         router.push(newPathname);
      });
   };

   return (
      <div className="p-4 space-y-6">
         {/* Header */}
         <div className="flex items-center space-x-4 py-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
               <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
               </div>
               <div>
                  <h1 className="text-xl font-bold text-foreground">
                     {t("language.title")}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     {t("language.subtitle")}
                  </p>
               </div>
            </div>
         </div>

         {/* Current Language */}
         <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
               <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                     {
                        languages.find((lang) => lang.code === selectedLanguage)
                           ?.flag
                     }
                  </div>
                  <div>
                     <p className="font-semibold text-foreground">
                        {t("language.currentLanguage")}
                     </p>
                     <p className="text-sm text-muted-foreground">
                        {
                           languages.find(
                              (lang) => lang.code === selectedLanguage
                           )?.nativeName
                        }
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Language List */}
         <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
               {t("language.availableLanguages")}
            </h2>
            <div className="space-y-2">
               {languages.map((language, index) => (
                  <Card
                     key={language.code}
                     className={`cursor-pointer transition-all animate-in fade-in slide-in-from-bottom-2 ${
                        selectedLanguage === language.code
                           ? "ring-2 ring-primary bg-primary/5"
                           : "hover:shadow-md"
                     }`}
                     onClick={() => handleLanguageChange(language.code)}
                     style={{
                        animationDelay: `${index * 30}ms`,
                        animationFillMode: "both",
                     }}
                  >
                     <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 flex items-center justify-center text-xl">
                              {language.flag}
                           </div>
                           <div>
                              <p className="font-medium text-foreground">
                                 {language.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {language.nativeName}
                              </p>
                           </div>
                        </div>
                        {selectedLanguage === language.code && (
                           <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary-foreground" />
                           </div>
                        )}
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   );
}
