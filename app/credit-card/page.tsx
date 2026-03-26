"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loadStripe,
  StripeCardElementOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Stripe public key dari Polar (ada di HTML)
const stripePromise = loadStripe("pk_live_51LzIVeDG1jUQrXwC7sH96FM58ydVBDw9KQ1Vaw4lXZFGGFRK3DKBorOPM86PkutdUyLdH7TbwS9QAVWI1igFiVCZ00fGmx9bnF");

// Style dari Polar
const cardElementOptions: StripeCardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#0f172a",
      fontFamily: "inherit",
      "::placeholder": {
        color: "#94a3b8",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
  hidePostalCode: true, // Polar pake field terpisah
};

function CheckoutForm({ amount, onSuccess, onError }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [businessPurchase, setBusinessPurchase] = useState(false);
  const [country, setCountry] = useState("ID");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      // Create payment intent di backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email, name }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment dengan Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name,
            email,
            address: { country },
          },
        },
      });

      if (error) throw new Error(error.message);
      if (paymentIntent?.status === "succeeded") onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
      {/* Email - style dari Polar */}
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="dark:bg-polar-800 dark:border-polar-700 h-10 rounded-xl border bg-white px-3 py-2 text-base shadow-xs"
          placeholder="your@email.com"
          required
        />
      </div>

      {/* Card Element - Stripe */}
      <div className="space-y-2">
        <Label>Card details</Label>
        <div className="dark:bg-polar-800 dark:border-polar-700 rounded-xl border bg-white p-3">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Cardholder name */}
      <div className="space-y-2">
        <Label>Cardholder name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="dark:bg-polar-800 dark:border-polar-700 h-10 rounded-xl border bg-white px-3 py-2 text-base shadow-xs"
          placeholder="John Doe"
          required
        />
      </div>

      {/* Billing country */}
      <div className="space-y-2">
        <Label>Billing country</Label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="dark:bg-polar-800 dark:border-polar-700 h-10 w-full rounded-xl border bg-white px-3 py-2 text-base shadow-xs"
        >
          <option value="ID">Indonesia</option>
          <option value="US">United States</option>
          <option value="SG">Singapore</option>
          <option value="MY">Malaysia</option>
        </select>
      </div>

      {/* Business checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="business"
          checked={businessPurchase}
          onChange={(e) => setBusinessPurchase(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="business" className="text-sm font-normal">
          I'm purchasing as a business
        </Label>
      </div>

      {/* Pay button */}
      <Button
        type="submit"
        disabled={!stripe || loading}
        className="h-12 w-full rounded-full bg-black text-white hover:opacity-85 dark:bg-white dark:text-black"
      >
        {loading ? "Processing..." : `Pay $${amount} now`}
      </Button>
    </form>
  );
}

export default function CheckoutPage() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[480px] px-4 py-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 text-2xl font-bold">Complete Payment</h2>
          
          {error ? (
            <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={6.56}
                onSuccess={() => (window.location.href = "/success")}
                onError={setError}
              />
            </Elements>
          )}

          <p className="dark:text-polar-500 mt-4 text-center text-xs text-gray-500">
            By clicking "Pay now," you authorize Polar Software, Inc. to charge your payment method.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
