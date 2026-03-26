"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  FileText,
  Scale,
  CreditCard,
  Smartphone,
  Ban,
  AlertTriangle,
} from "lucide-react"

interface TermsConditionsPageProps {
  onBack: () => void
}

export function TermsConditionsPage({ onBack }: TermsConditionsPageProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Terms & Conditions</h1>
            <p className="text-sm text-muted-foreground">Effective: January 1, 2025</p>
          </div>
        </div>
      </div>

      {/* Agreement Overview */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div>
            <p className="font-semibold text-foreground mb-2">Service Agreement</p>
            <p className="text-sm text-muted-foreground">
              By using our eSIM services, you agree to these terms and conditions. Please read them carefully before using our services.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Terms Sections */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Service Usage</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• eSIM services are provided for personal use only</li>
                <li>• Compatible device required for eSIM activation</li>
                <li>• Data usage subject to fair use policies</li>
                <li>• Service availability varies by country and carrier</li>
                <li>• One eSIM per device activation limit may apply</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Payment Terms</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Payment required before eSIM activation</li>
                <li>• All prices displayed in USD unless specified</li>
                <li>• Refunds processed within 7-14 business days</li>
                <li>• Auto-renewal applies to subscription plans</li>
                <li>• Failed payments may result in service suspension</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Prohibited Uses</h3>
              <p className="text-sm text-muted-foreground mb-2">
                You may not use our services for:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Illegal activities or fraud</li>
                <li>• Spam, harassment, or abuse</li>
                <li>• Reselling or commercial redistribution</li>
                <li>• Network disruption or hacking attempts</li>
                <li>• Violating local laws or regulations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Limitations & Liability</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Services provided "as is" without warranty</li>
                <li>• We are not liable for network outages</li>
                <li>• Coverage and speed may vary by location</li>
                <li>• Emergency services may not be available</li>
                <li>• Maximum liability limited to service cost</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Account Termination</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You may terminate your account at any time</li>
                <li>• We may suspend accounts for terms violations</li>
                <li>• Unused credit may be forfeited upon termination</li>
                <li>• Data will be retained per our Privacy Policy</li>
                <li>• Some terms survive account termination</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Changes to Terms</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We may update these terms periodically</li>
                <li>• Material changes will be communicated</li>
                <li>• Continued use constitutes acceptance</li>
                <li>• Previous versions archived for reference</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legal Information */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2">Governing Law</h3>
          <p className="text-sm text-muted-foreground mb-3">
            These terms are governed by the laws of Delaware, United States. Any disputes will be resolved through binding arbitration.
          </p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Legal Entity: eSIM Store Inc.</p>
            <p>Registration: Delaware Corporation #12345</p>
            <p>Contact: legal@esimstore.com</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.open('mailto:legal@esimstore.com')}
        >
          Legal Questions
        </Button>
        <Button 
          className="w-full" 
          onClick={onBack}
        >
          I Accept Terms
        </Button>
      </div>
    </div>
  )
}