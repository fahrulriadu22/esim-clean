import crypto from "crypto";

export interface CoinPaymentsConfig {
  clientId: string;
  clientSecret: string;
  apiUrl: string;
}

export class CoinPaymentsClient {
  private config: CoinPaymentsConfig;

  constructor(config: CoinPaymentsConfig) {
    this.config = config;
  }

  private getTimestamp(): string {
    return new Date().toISOString().split('.')[0];
  }

  private generateSignature(
    method: string,
    url: string,
    clientId: string,
    timestamp: string,
    payload: string
  ): string {
    const fullUrl = `${this.config.apiUrl}${url}`;
    const message = `\ufeff${method}${fullUrl}${clientId}${timestamp}${payload}`;
    
    console.log("🔐 Generating signature for:", { method, url, clientId, timestamp });
    
    return crypto
      .createHmac("sha256", this.config.clientSecret)
      .update(message)
      .digest("base64");
  }

  private async request(endpoint: string, params: any, method: string = "POST") {
    const url = endpoint;
    const timestamp = this.getTimestamp();
    const payload = params ? JSON.stringify(params) : "";
    const signature = this.generateSignature(
      method,
      url,
      this.config.clientId,
      timestamp,
      payload
    );
    
    const fullUrl = `${this.config.apiUrl}${url}`;
    
    console.log("📤 CoinPayments request:", { 
      url: fullUrl, 
      method,
      timestamp,
      signatureLength: signature.length,
    });
    
    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-CoinPayments-Client": this.config.clientId,
        "X-CoinPayments-Timestamp": timestamp,
        "X-CoinPayments-Signature": signature,
      },
      body: payload || undefined,
    });

    const responseText = await response.text();
    console.log("📥 CoinPayments response:", response.status, responseText.substring(0, 200));
    
    if (!response.ok) {
      throw new Error(`CoinPayments API error: ${response.status} - ${responseText}`);
    }

    return responseText ? JSON.parse(responseText) : {};
  }

  // Create invoice dengan payload minimal
  async createInvoice(params: {
    amount: number;
    currency: string;
    itemName: string;
    itemDescription?: string;
    orderId: string;
    successUrl: string;
    cancelUrl: string;
    ipnUrl: string;
    buyerEmail?: string;
    buyerName?: string;
  }) {
const amountInCents = Math.round(params.amount * 100);

const payload = {
  invoiceId: params.orderId,
  description: params.itemDescription || params.itemName,
  // 🔥 TAMBAH AMOUNT DI ROOT
  amount: {
    value: amountInCents.toString(),
    valueAsDecimal: params.amount,
    currencyId: "USD"
  },
  items: [
    {
      name: params.itemName,
      description: params.itemDescription || "",
      quantity: {
        value: 1,
        type: "quantity"
      },
      amount: {
        value: amountInCents.toString(),
        valueAsDecimal: params.amount,
        currencyId: "USD"
      },
    },
  ],
  webhooks: [
    {
      notificationsUrl: params.ipnUrl,
      notifications: ["invoicePaid", "invoiceCompleted"],
    },
  ],
};

    console.log("📦 CoinPayments payload:", JSON.stringify(payload, null, 2));
    
    const result = await this.request("/api/v1/merchant/invoices", payload, "POST");
    return result;
  }
}

export const createCoinPaymentsClient = () => {
  return new CoinPaymentsClient({
    clientId: process.env.COINPAYMENTS_CLIENT_ID!,
    clientSecret: process.env.COINPAYMENTS_CLIENT_SECRET!,
    apiUrl: process.env.COINPAYMENTS_API_URL || "https://a-api.coinpayments.net",
  });
};
