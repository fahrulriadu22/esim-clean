"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CardPaymentFormProps {
  amount: number;
  sku: string;
  telegramId: string;
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
}

export function CardPaymentForm({ amount, sku, telegramId, onSuccess, onError }: CardPaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/doku/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          sku,
          telegramId,
          ...formData
        })
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(data.data);
      } else {
        onError(data.error || "Payment failed");
      }
    } catch (err) {
      onError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Card Number</Label>
        <Input
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          value={formData.cardNumber}
          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>Cardholder Name</Label>
        <Input
          placeholder="JOHN DOE"
          value={formData.cardholderName}
          onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value.toUpperCase() })}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Expiry Month</Label>
          <Input
            placeholder="MM"
            maxLength={2}
            value={formData.expiryMonth}
            onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Expiry Year</Label>
          <Input
            placeholder="YY"
            maxLength={2}
            value={formData.expiryYear}
            onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>CVV</Label>
          <Input
            placeholder="123"
            maxLength={4}
            type="password"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : `Pay ${amount} USD`}
      </Button>
    </form>
  );
}
