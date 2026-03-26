"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Smartphone,
  CreditCard,
  Globe,
  Settings,
  MessageCircle,
} from "lucide-react"

interface FAQPageProps {
  onBack: () => void
}

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  icon: React.ReactNode
}

export function FAQPage({ onBack }: FAQPageProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const faqs: FAQItem[] = [
    // General
    {
      id: "what-is-esim",
      question: "What is an eSIM?",
      answer: "An eSIM (embedded SIM) is a digital SIM card that's built into your device. Unlike traditional physical SIM cards, eSIMs can be activated digitally without needing to insert a physical card. This allows you to switch between carriers and plans instantly.",
      category: "general",
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: "device-compatibility",
      question: "Is my device compatible with eSIM?",
      answer: "Most modern smartphones support eSIM, including iPhone XS and newer, Google Pixel 3 and newer, Samsung Galaxy S20 and newer. Check your device settings under 'Cellular' or 'Mobile Network' to see if you have an 'Add eSIM' option.",
      category: "general",
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: "multiple-esims",
      question: "Can I have multiple eSIMs on one device?",
      answer: "Yes, most eSIM-compatible devices can store multiple eSIM profiles. However, typically only one eSIM can be active at a time, though some newer devices support dual eSIM functionality.",
      category: "general",
      icon: <Smartphone className="w-4 h-4" />
    },
    // Setup & Activation
    {
      id: "how-to-activate",
      question: "How do I activate my eSIM?",
      answer: "After purchase, you'll receive a QR code via email. Go to your device's cellular settings, select 'Add eSIM' or 'Add Cellular Plan', then scan the QR code. Follow the on-screen instructions to complete activation.",
      category: "setup",
      icon: <Settings className="w-4 h-4" />
    },
    {
      id: "activation-time",
      question: "How long does eSIM activation take?",
      answer: "eSIM activation is usually instant after scanning the QR code. In some cases, it may take up to 15 minutes for the service to become fully active depending on the carrier network.",
      category: "setup",
      icon: <Settings className="w-4 h-4" />
    },
    {
      id: "installation-failed",
      question: "What if eSIM installation fails?",
      answer: "First, ensure you have a stable internet connection. Check that your device is eSIM compatible and not carrier-locked. If issues persist, try restarting your device and attempting installation again. Contact support if problems continue.",
      category: "setup",
      icon: <Settings className="w-4 h-4" />
    },
    // Billing & Plans
    {
      id: "payment-methods",
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, Mastercard), cryptocurrency payments, digital wallets (Apple Pay, Google Pay), and Telegram Stars. All payments are processed securely.",
      category: "billing",
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: "refund-policy",
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer refunds within 7 days of purchase if the eSIM hasn't been activated. Once activated, refunds are considered case-by-case for technical issues. Contact our support team for assistance.",
      category: "billing",
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: "plan-duration",
      question: "What happens when my plan expires?",
      answer: "When your plan expires, data service will stop automatically. You can purchase a new plan or renew your existing one. Your eSIM profile remains on your device and can be reused for future purchases.",
      category: "billing",
      icon: <CreditCard className="w-4 h-4" />
    },
    // Coverage & Usage
    {
      id: "coverage-areas",
      question: "Which countries do you support?",
      answer: "We support eSIM services in over 190 countries worldwide. Coverage includes popular destinations in Europe, Asia, Americas, and other regions. Check our country list for specific availability and pricing.",
      category: "coverage",
      icon: <Globe className="w-4 h-4" />
    },
    {
      id: "data-speeds",
      question: "What data speeds can I expect?",
      answer: "Data speeds depend on the local carrier network and your location. Most plans provide 4G/LTE speeds, with some offering 5G where available. Speeds may be reduced during network congestion.",
      category: "coverage",
      icon: <Globe className="w-4 h-4" />
    },
    {
      id: "usage-tracking",
      question: "How can I track my data usage?",
      answer: "You can monitor your data usage through your device's cellular settings or our app. We also send notifications when you're approaching your data limit to help you manage your usage.",
      category: "coverage",
      icon: <Globe className="w-4 h-4" />
    },
  ]

  const categories = [
    { id: "all", name: "All Questions", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "general", name: "General", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "setup", name: "Setup & Activation", icon: <Settings className="w-4 h-4" /> },
    { id: "billing", name: "Billing & Plans", icon: <CreditCard className="w-4 h-4" /> },
    { id: "coverage", name: "Coverage & Usage", icon: <Globe className="w-4 h-4" /> },
  ]

  const filteredFAQs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">FAQ</h1>
            <p className="text-sm text-muted-foreground">Frequently Asked Questions</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search FAQ..."
          className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center space-x-1 whitespace-nowrap"
          >
            {category.icon}
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFAQs.map((faq, index) => (
          <Card
            key={faq.id}
            className="transition-all animate-in fade-in slide-in-from-bottom-2"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both'
            }}
          >
            <CardContent className="p-0">
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      {faq.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {faq.question}
                      </p>
                    </div>
                  </div>
                  {expandedItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {expandedItems.includes(faq.id) && (
                <div className="px-4 pb-4 animate-in slide-in-from-top-2">
                  <div className="ml-11 pl-3 border-l-2 border-primary/20">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Still need help?</p>
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for? Our support team is here to help.
              </p>
            </div>
          </div>
          <div className="flex space-x-2 mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => window.open('mailto:support@esimstore.com')}
            >
              Email Support
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
            >
              Live Chat
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-primary">{faqs.length}</p>
              <p className="text-xs text-muted-foreground">Total FAQs</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-500">4.8</p>
              <p className="text-xs text-muted-foreground">Helpful Rating</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-500">2m</p>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}