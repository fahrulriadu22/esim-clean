"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Database,
  Users,
  Globe,
} from "lucide-react"

interface PrivacyNoticePageProps {
  onBack: () => void
}

export function PrivacyNoticePage({ onBack }: PrivacyNoticePageProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Effective Date: [Insert Date]</p>
          </div>
        </div>
      </div>

      {/* About Our Service */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div>
            <p className="font-semibold text-foreground mb-2">About Our Service</p>
            <p className="text-sm text-muted-foreground">
              We are NOT a mobile network operator. eSIM data services are provided by third-party network providers in each respective country. We act solely as a reseller and service distributor.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              We do not control network quality, coverage, speed, or availability. Telegram is not owned or controlled by us. Telegram operates under its own privacy policy.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Sections */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Information We Collect</h3>
              <p className="text-sm text-muted-foreground mb-2">We may collect:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Name and email</li>
                <li>• Telegram username / Telegram ID</li>
                <li>• Device and technical information (IP, device model)</li>
                <li>• eSIM activation data (ICCID, network info)</li>
                <li>• Payment confirmation details (processed via third-party providers)</li>
                <li>• Usage logs</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2 font-medium">We do not sell personal data.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">How We Use Your Data</h3>
              <p className="text-sm text-muted-foreground mb-2">We use data to:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Provide and activate eSIM services</li>
                <li>• Process payments</li>
                <li>• Provide customer support</li>
                <li>• Prevent fraud, abuse, and unauthorized chargebacks</li>
                <li>• Improve service quality</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Data Sharing</h3>
              <p className="text-sm text-muted-foreground mb-2">
                We may share necessary data with:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Mobile network operators (for activation)</li>
                <li>• Payment processors</li>
                <li>• Hosting providers</li>
                <li>• Legal authorities when required</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">We do not store full credit card details.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Data Retention</h3>
              <p className="text-sm text-muted-foreground mb-2">
                We retain personal data only as long as necessary:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Account data: while active</li>
                <li>• Billing records: as required by law (5–7 years)</li>
                <li>• Logs: up to 12 months</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">Data is securely deleted when no longer required.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">International Transfers & Security</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Your data may be processed outside your country of residence. Reasonable safeguards are applied.
              </p>
              <p className="text-sm text-muted-foreground">
                We implement encryption (SSL/TLS) and industry-standard safeguards. No system guarantees absolute security.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Your Rights</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Depending on your location, you may request:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Access</li>
                <li>• Correction</li>
                <li>• Deletion</li>
                <li>• Restriction</li>
                <li>• Data portability</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Limitation Notice</h3>
              <p className="text-sm text-muted-foreground mb-2">
                We are not responsible for:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Network performance</li>
                <li>• Carrier interruptions</li>
                <li>• Coverage limitations</li>
                <li>• Device incompatibility</li>
                <li>• Telegram platform policies</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2">Contact Information</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Operator: Roamwi
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            Country of Operation: Indonesia
          </p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Email: support@roamwi.com</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.open('mailto:support@roamwi.com')}
        >
          Contact Privacy Team
        </Button>
        <Button 
          className="w-full" 
          onClick={onBack}
        >
          I Understand
        </Button>
      </div>
    </div>
  )
}