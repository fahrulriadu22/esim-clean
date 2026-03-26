import { NextResponse } from "next/server";

const COINPAYMENTS_CLIENT_ID = process.env.COINPAYMENTS_CLIENT_ID;
const COINPAYMENTS_CLIENT_SECRET = process.env.COINPAYMENTS_CLIENT_SECRET;

async function getAccessToken() {
  const auth = Buffer.from(`${COINPAYMENTS_CLIENT_ID}:${COINPAYMENTS_CLIENT_SECRET}`).toString('base64');
  
  // Endpoint yang benar dari curl
  const response = await fetch("https://www.coinpayments.net/oauth2/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    redirect: "follow", // follow redirect
  });
  
  const text = await response.text();
  console.log("Token response:", text);
  
  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status}`);
  }
  
  const data = JSON.parse(text);
  return data.access_token;
}

export async function GET() {
  try {
    console.log("🚀 Getting access token...");
    const accessToken = await getAccessToken();
    console.log("✅ Access token obtained:", accessToken.substring(0, 20) + "...");
    
    // Register webhook
    const webhookResponse = await fetch("https://www.coinpayments.net/api/v1/client-webhook", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: "https://roamwi.com/api/coinpayments/webhook",
        events: ["invoice.paid", "invoice.completed"],
      }),
    });
    
    const webhookData = await webhookResponse.json();
    
    if (webhookResponse.ok) {
      console.log("✅ Webhook registered!");
      return NextResponse.json({ success: true, data: webhookData });
    } else {
      console.error("Failed to register webhook:", webhookData);
      return NextResponse.json({ error: webhookData }, { status: webhookResponse.status });
    }
    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ 
      error: "Failed", 
      message: error instanceof Error ? error.message : "Unknown" 
    }, { status: 500 });
  }
}
