import { NextRequest, NextResponse } from "next/server";
import { rateLimitMiddleware } from "./lib/rate-limiter";

export async function middleware(request: NextRequest) {
   // Apply rate limiting
   const rateLimitResponse = await rateLimitMiddleware(request);

   if (rateLimitResponse) {
      return rateLimitResponse;
   }

   // Continue with the request
   return NextResponse.next();
}

export const config = {
   matcher: [
      // Match all API routes except admin routes
      "/api/((?!data/).)*",
   ],
};
