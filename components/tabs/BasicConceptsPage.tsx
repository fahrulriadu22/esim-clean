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
  Info,
  CreditCard,
  Hash,
  Trash2,
} from "lucide-react"
import { useTranslations } from "@/lib/i18n"

interface BasicConceptsPageProps {
  onBack: () => void
}

interface ConceptItem {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
}

export function BasicConceptsPage({ onBack }: BasicConceptsPageProps) {
  const { t } = useTranslations()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const concepts: ConceptItem[] = [
    {
      id: "what-is-esim",
      question: t('concepts.whatIsESIM.question'),
      answer: t('concepts.whatIsESIM.answer'),
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: "important-info",
      question: t('concepts.importantInfo.question'),
      answer: t('concepts.importantInfo.answer'),
      icon: <Info className="w-4 h-4" />
    },
    {
      id: "phone-support",
      question: t('concepts.phoneSupport.question'),
      answer: t('concepts.phoneSupport.answer'),
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: "find-qr",
      question: t('concepts.findQR.question'),
      answer: t('concepts.findQR.answer'),
      icon: <HelpCircle className="w-4 h-4" />
    },
    {
      id: "check-balance",
      question: t('concepts.checkBalance.question'),
      answer: t('concepts.checkBalance.answer'),
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: "iccid-number",
      question: t('concepts.iccidNumber.question'),
      answer: t('concepts.iccidNumber.answer'),
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: "delete-esim",
      question: t('concepts.deleteESIM.question'),
      answer: t('concepts.deleteESIM.answer'),
      icon: <Trash2 className="w-4 h-4" />
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-bold text-foreground">{t('concepts.title')}</h1>
            <p className="text-sm text-muted-foreground">{t('concepts.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Concepts List */}
      <div className="space-y-3">
        {concepts.map((concept, index) => (
          <Card
            key={concept.id}
            className="transition-all animate-in fade-in slide-in-from-bottom-2"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both'
            }}
          >
            <CardContent className="p-0">
              <button
                onClick={() => toggleExpanded(concept.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {concept.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {concept.question}
                      </p>
                    </div>
                  </div>
                  {expandedItems.includes(concept.id) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {expandedItems.includes(concept.id) && (
                <div className="px-4 pb-4 animate-in slide-in-from-top-2">
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {concept.answer}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2">{t('concepts.quickTips')}</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• {t('concepts.tip1')}</li>
            <li>• {t('concepts.tip2')}</li>
            <li>• {t('concepts.tip3')}</li>
            <li>• {t('concepts.tip4')}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}