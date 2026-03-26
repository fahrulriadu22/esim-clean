"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  HelpCircle,
  Settings,
  Wifi,
  MessageCircle,
} from "lucide-react"
import { useTranslations } from "@/lib/i18n"
import { BasicConceptsPage } from "./BasicConceptsPage"
import { SetupActivationPage } from "./SetupActivationPage"
import { TroubleshootingPage } from "./TroubleshootingPage"
import { ContactSupportPage } from "./ContactSupportPage"

type ViewType = "main" | "concepts" | "setup" | "troubleshooting" | "support"

export function HelpTab() {
  const { t } = useTranslations()
  const [currentView, setCurrentView] = useState<ViewType>("main")

  if (currentView === "concepts") {
    return <BasicConceptsPage onBack={() => setCurrentView("main")} />
  }

  if (currentView === "setup") {
    return <SetupActivationPage onBack={() => setCurrentView("main")} />
  }

  if (currentView === "troubleshooting") {
    return <TroubleshootingPage onBack={() => setCurrentView("main")} />
  }

  if (currentView === "support") {
    return <ContactSupportPage onBack={() => setCurrentView("main")} />
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-foreground">{t('help.mobileSupport')}</h1>
      </div>

      {/* Help Topics */}
      <div className="space-y-3">
        <Card
          className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
          onClick={() => setCurrentView("concepts")}
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t('help.whatIsESIM')}</p>
                <p className="text-sm text-muted-foreground">{t('help.whatIsESIMDesc')}</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
          onClick={() => setCurrentView("setup")}
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t('help.setupActivation')}</p>
                <p className="text-sm text-muted-foreground">{t('help.setupActivationDesc')}</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] shadow-premium bg-gradient-to-r from-card to-muted/10"
          onClick={() => setCurrentView("troubleshooting")}
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t('help.troubleshooting')}</p>
                <p className="text-sm text-muted-foreground">{t('help.troubleshootingDesc')}</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <Card 
        className="bg-primary/5 cursor-pointer hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02]"
        onClick={() => setCurrentView("support")}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t('help.writeToSupport')}</p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">{t('help.online')}</span>
                </div>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}