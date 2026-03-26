"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Wifi,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  RefreshCw,
  X,
  Search,
  WifiOff,
} from "lucide-react"

interface TroubleshootingPageProps {
  onBack: () => void
}

interface TroubleshootingItem {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
  severity: "warning" | "error" | "info"
}

export function TroubleshootingPage({ onBack }: TroubleshootingPageProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const troubleshootingItems: TroubleshootingItem[] = [
    {
      id: "adjusting-esim",
      question: "Adjusting eSIM",
      answer: "To adjust eSIM settings: iPhone - Go to Settings > Cellular, select your eSIM line, then adjust Label, Turn This Line On/Off, or Cellular Data options. You can switch between Primary and Secondary lines for calls, SMS, and data. Android - Go to Settings > Network & Internet > Mobile Network, select your eSIM, and modify Name, Enable/Disable, or Data preferences. You can also change which SIM is used for calls, messages, and mobile data.",
      icon: <RefreshCw className="w-4 h-4" />,
      severity: "info"
    },
    {
      id: "activation-failure-iphone",
      question: "eSIM Activation Failure on iPhone",
      answer: "If eSIM activation fails on iPhone: 1) Check internet connection - use strong Wi-Fi, 2) Restart your iPhone and try again, 3) Ensure iOS is updated to latest version, 4) Check if device is carrier unlocked, 5) Try Settings > General > Reset > Reset Network Settings (will remove Wi-Fi passwords), 6) Contact your carrier if device is locked, 7) Wait 24 hours before trying again as some carriers have activation limits, 8) If QR code was already used, contact support for a new one.",
      icon: <AlertTriangle className="w-4 h-4" />,
      severity: "error"
    },
    {
      id: "qr-no-longer-valid",
      question: "Error: This QR Code is No Longer Valid",
      answer: "This error occurs when: 1) QR code was already used (most are single-use), 2) QR code has expired (usually 30-90 days after purchase), 3) Plan was already activated on another device, 4) There was a technical issue during previous activation attempt. Solutions: Contact support immediately with your order number, don't attempt to scan again, provide error screenshot, and request a new QR code if eligible. Keep your original purchase receipt ready.",
      icon: <X className="w-4 h-4" />,
      severity: "error"
    },
    {
      id: "find-correct-sim",
      question: "How to Find the Correct SIM Card",
      answer: "To identify the correct SIM for your needs: iPhone - Go to Settings > Cellular, you'll see 'Primary' and 'Secondary' lines with carrier names and labels you assigned. Tap each to see phone numbers and data usage. Android - Settings > Network & Internet > Mobile Network shows all SIM cards with names, carrier info, and status. Look for signal strength indicators and data usage stats. You can rename SIMs for easier identification (Personal, Work, Travel, etc.).",
      icon: <Search className="w-4 h-4" />,
      severity: "info"
    },
    {
      id: "internet-connection-problems",
      question: "Problems with internet connection",
      answer: "To fix internet connectivity issues: 1) Check if eSIM is enabled in settings, 2) Verify you have data balance remaining, 3) Check if you're in coverage area, 4) Toggle Airplane Mode on/off, 5) Manually select network operator (Settings > Cellular/Mobile Network > Network Selection), 6) Reset network settings, 7) Check APN settings if provided by carrier, 8) Restart device, 9) Contact support if issues persist. Some areas may have weak signal requiring manual network selection.",
      icon: <WifiOff className="w-4 h-4" />,
      severity: "warning"
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error": return "text-red-500"
      case "warning": return "text-yellow-500"
      case "info": return "text-blue-500"
      default: return "text-gray-500"
    }
  }

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "error": return "bg-red-500/10"
      case "warning": return "bg-yellow-500/10"
      case "info": return "bg-blue-500/10"
      default: return "bg-gray-500/10"
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <Wifi className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-bold text-foreground">Troubleshooting Issues</h1>
            <p className="text-sm text-muted-foreground">Common problems and solutions</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-3">Quick Fixes</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Restart Device
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Toggle Airplane Mode
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Check Signal
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Reset Network
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting List */}
      <div className="space-y-3">
        {troubleshootingItems.map((item, index) => (
          <Card
            key={item.id}
            className="transition-all animate-in fade-in slide-in-from-bottom-2"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both'
            }}
          >
            <CardContent className="p-0">
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${getSeverityBg(item.severity)} rounded-full flex items-center justify-center`}>
                      <span className={getSeverityColor(item.severity)}>
                        {item.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {item.question}
                      </p>
                    </div>
                  </div>
                  {expandedItems.includes(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {expandedItems.includes(item.id) && (
                <div className="px-4 pb-4 animate-in slide-in-from-top-2">
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
            Still Having Issues?
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            If these solutions don't help, our support team is ready to assist you 24/7.
          </p>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => window.open('mailto:support@esimstore.com')}
            >
              Email Support
            </Button>
            <Button size="sm" className="flex-1">
              Live Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}