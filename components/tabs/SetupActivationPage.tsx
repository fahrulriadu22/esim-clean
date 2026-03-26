"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Settings,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Apple,
} from "lucide-react"

interface SetupActivationPageProps {
  onBack: () => void
}

interface SetupItem {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
  category: "ios" | "android"
}

export function SetupActivationPage({ onBack }: SetupActivationPageProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("ios")

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const setupInstructions: SetupItem[] = [
    {
      id: "ios-setup-step1",
      question: "Step 1: Check Device Compatibility",
      answer: "Ensure your iPhone is XS/XR or newer and running iOS 12.1 or later. Go to Settings > General > About and look for 'Digital SIM' or check if Settings > Cellular shows 'Add Cellular Plan' option. Your device must also be carrier unlocked.",
      icon: <Apple className="w-4 h-4" />,
      category: "ios"
    },
    {
      id: "ios-setup-step2",
      question: "Step 2: Access eSIM Settings",
      answer: "Open Settings app, tap on 'Cellular' or 'Mobile Data'. You should see 'Add Cellular Plan' option. If you don't see this option, your device may not support eSIM or may be carrier locked.",
      icon: <Apple className="w-4 h-4" />,
      category: "ios"
    },
    {
      id: "ios-setup-step3",
      question: "Step 3: Scan QR Code",
      answer: "Tap 'Add Cellular Plan' then 'Use QR Code'. Point your camera at the QR code received in your email. Make sure you have good lighting and the entire QR code is visible. Alternatively, you can enter details manually by tapping 'Enter Details Manually'.",
      icon: <Apple className="w-4 h-4" />,
      category: "ios"
    },
    {
      id: "ios-setup-step4",
      question: "Step 4: Configure Your Plan",
      answer: "After scanning, you'll see plan details. Tap 'Add Cellular Plan' to confirm. Choose a label for your eSIM (like 'Travel' or 'Work'). Select which line to use for iMessage, FaceTime, and cellular data. You can change these settings later.",
      icon: <Apple className="w-4 h-4" />,
      category: "ios"
    },
    {
      id: "ios-setup-step5",
      question: "Step 5: Activate and Test",
      answer: "Your eSIM will activate automatically. You'll see carrier name and signal bars appear. Test by making a call or using data. If activation fails, restart your device and wait up to 15 minutes. Check Settings > Cellular to manage your eSIM lines.",
      icon: <Apple className="w-4 h-4" />,
      category: "ios"
    },
    {
      id: "android-setup-step1",
      question: "Step 1: Device Compatibility Check",
      answer: "Ensure your Android device supports eSIM (Pixel 3+, Galaxy S20+, etc.) and runs Android 9.0 or newer. Go to Settings > Network & Internet > Mobile Network. Look for 'Advanced' or 'Add carrier' options. Device must be unlocked.",
      icon: <Smartphone className="w-4 h-4" />,
      category: "android"
    },
    {
      id: "android-setup-step2",
      question: "Step 2: Access Mobile Network Settings",
      answer: "Go to Settings > Network & Internet > Mobile Network > Advanced. Look for 'Carrier' or 'Add carrier' option. Some devices show 'Download a SIM instead' or '+' button to add new carrier profiles.",
      icon: <Smartphone className="w-4 h-4" />,
      category: "android"
    },
    {
      id: "android-setup-step3",
      question: "Step 3: Add eSIM Profile",
      answer: "Tap 'Add carrier' or '+' button, then 'Don't have a SIM card?' or 'Download a SIM instead'. Choose 'Need help?' then 'Download a SIM'. Some devices may have direct 'QR code' option.",
      icon: <Smartphone className="w-4 h-4" />,
      category: "android"
    },
    {
      id: "android-setup-step4",
      question: "Step 4: Scan QR Code",
      answer: "Select 'Scan QR code' and point camera at your eSIM QR code. Ensure good lighting and steady hands. If scanning fails, try 'Enter it manually' option and input the SM-DP+ address and activation code from your email.",
      icon: <Smartphone className="w-4 h-4" />,
      category: "android"
    },
    {
      id: "android-setup-step5",
      question: "Step 5: Complete Setup",
      answer: "Follow on-screen prompts to download and activate your eSIM profile. Give your eSIM a name for easy identification. Enable the eSIM profile and set preferences for calls, SMS, and data. Activation may take 5-15 minutes.",
      icon: <Smartphone className="w-4 h-4" />,
      category: "android"
    },
  ]

  const categories = [
    { id: "ios", name: "iOS Devices", icon: <Apple className="w-4 h-4" /> },
    { id: "android", name: "Android Devices", icon: <Smartphone className="w-4 h-4" /> },
  ]

  const filteredInstructions = setupInstructions.filter(item => item.category === activeCategory)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-bold text-foreground">eSIM Setup & Activation</h1>
            <p className="text-sm text-muted-foreground">Step-by-step installation guide</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center space-x-2"
          >
            {category.icon}
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Setup Instructions */}
      <div className="space-y-3">
        {filteredInstructions.map((instruction, index) => (
          <Card
            key={instruction.id}
            className="transition-all animate-in fade-in slide-in-from-bottom-2"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both'
            }}
          >
            <CardContent className="p-0">
              <button
                onClick={() => toggleExpanded(instruction.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {instruction.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {instruction.question}
                      </p>
                    </div>
                  </div>
                  {expandedItems.includes(instruction.id) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {expandedItems.includes(instruction.id) && (
                <div className="px-4 pb-4 animate-in slide-in-from-top-2">
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {instruction.answer}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important Notes */}
      <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2 flex items-center">
            <Smartphone className="w-4 h-4 mr-2" />
            Important Notes
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Ensure stable Wi-Fi connection during activation process</li>
            <li>• QR code is usually single-use - don't scan multiple times</li>
            <li>• Keep your device powered on during activation</li>
            <li>• Activation may take 5-15 minutes depending on carrier</li>
            <li>• Restart device if eSIM doesn't appear after 30 minutes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}