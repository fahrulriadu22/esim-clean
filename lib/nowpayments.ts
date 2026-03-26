// NowPayments API wrapper
import { createHmac } from "crypto";

interface NowPaymentsConfig {
  apiKey: string;
  apiUrl: string;
  ipnSecret: string;
}

interface CreatePaymentParams {
  price_amount: number;
  price_currency: string;
  pay_currency?: string;
  order_id: string;
  order_description?: string;
  ipn_callback_url: string;
  success_url?: string;
  cancel_url?: string;
}

export class NowPaymentsClient {
  private config: NowPaymentsConfig;

  constructor(config: NowPaymentsConfig) {
    this.config = config;
  }

  async createPayment(params: CreatePaymentParams) {
    const response = await fetch(`${this.config.apiUrl}/payment`, {
      method: "POST",
      headers: {
        "x-api-key": this.config.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`NowPayments API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getPaymentStatus(paymentId: string) {
    const response = await fetch(`${this.config.apiUrl}/payment/${paymentId}`, {
      headers: {
        "x-api-key": this.config.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`NowPayments API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getCurrencies() {
    const response = await fetch(`${this.config.apiUrl}/currencies`, {
      headers: {
        "x-api-key": this.config.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`NowPayments API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getEstimatePrice(params: {
    amount: number;
    currency_from: string;
    currency_to: string;
  }) {
    const response = await fetch(
      `${this.config.apiUrl}/estimate?amount=${params.amount}&currency_from=${params.currency_from}&currency_to=${params.currency_to}`,
      {
        headers: {
          "x-api-key": this.config.apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`NowPayments API error: ${response.statusText}`);
    }

    return response.json();
  }

  verifyIPN(ipnData: any, signature: string): boolean {
    const hmac = createHmac("sha512", this.config.ipnSecret);
    const calculatedSignature = hmac
      .update(JSON.stringify(ipnData))
      .digest("hex");
    return calculatedSignature === signature;
  }
}

export const createNowPaymentsClient = () => {
  return new NowPaymentsClient({
    apiKey: process.env.NOWPAYMENTS_API_KEY!,
    apiUrl: process.env.NOWPAYMENTS_API_URL!,
    ipnSecret: process.env.NOWPAYMENTS_IPN_SECRET!,
  });
};
