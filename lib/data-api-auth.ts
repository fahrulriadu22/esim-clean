import { NextRequest, NextResponse } from "next/server";

/**
 * Validates API key for data endpoints
 * @param request - The incoming request
 * @returns NextResponse with error if validation fails, null if successful
 */
export function validateDataApiKey(request: NextRequest): NextResponse | null {
   const apiKey = request.headers.get("X-API-Key");
   const expectedApiKey = process.env.DATA_API_KEY;

   if (!expectedApiKey) {
      return NextResponse.json(
         { error: "API key not configured" },
         { status: 500 }
      );
   }

   if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
         { error: "Invalid or missing API key" },
         { status: 401 }
      );
   }

   return null; // Validation passed
}
