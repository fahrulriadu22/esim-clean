import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { extractUserData } from "@/lib/utils";

// Initialize Redis client
const redis = new Redis({
   url: process.env.UPSTASH_REDIS_REST_URL!,
   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create different rate limiters for different types of endpoints
export const rateLimiters = {
   // General API endpoints - 100 requests per minute
   general: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1m"),
      prefix: "ratelimit:general",
   }),

   // Payment endpoints - 20 requests per minute (more restrictive)
   payment: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1m"),
      prefix: "ratelimit:payment",
   }),

   // Authentication endpoints - 10 requests per minute (very restrictive)
   auth: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1m"),
      prefix: "ratelimit:auth",
   }),

   // Webhook endpoints - 200 requests per minute (less restrictive for external services)
   webhook: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(200, "1m"),
      prefix: "ratelimit:webhook",
   }),
};

// Admin routes that should be excluded from rate limiting
const ADMIN_ROUTES = [
   "/api/data/dashboard",
   "/api/data/orders",
   "/api/data/users",
   "/api/data/topups",
];

// Payment routes that need stricter rate limiting
const PAYMENT_ROUTES = [
   "/api/init-payment",
   "/api/order",
   "/api/paypal/create",
];

// Authentication routes that need very strict rate limiting
const AUTH_ROUTES = ["/api/init-user"];

// Webhook routes that need less restrictive rate limiting
const WEBHOOK_ROUTES = ["/api/webhook", "/api/verify-ton"];

/**
 * Get the appropriate rate limiter for a given route
 */
function getRateLimiterForRoute(pathname: string): Ratelimit {
   if (PAYMENT_ROUTES.some((route) => pathname.startsWith(route))) {
      return rateLimiters.payment;
   }

   if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
      return rateLimiters.auth;
   }

   if (WEBHOOK_ROUTES.some((route) => pathname.startsWith(route))) {
      return rateLimiters.webhook;
   }

   return rateLimiters.general;
}

/**
 * Check if a route should be excluded from rate limiting
 */
function isAdminRoute(pathname: string): boolean {
   return ADMIN_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Get client identifier for rate limiting
 * Uses Telegram ID for authenticated routes, IP address for others
 */
function getClientIdentifier(request: NextRequest, pathname: string): string {
   // Guard untuk build time
   if (process.env.NEXT_PHASE === 'phase-production-build') {
      return 'build-time';
   }
   // For authenticated routes, try to extract Telegram ID first
   if (isAuthenticatedRoute(pathname)) {
      const telegramData = request.headers.get("X-Telegram-Data");
      if (telegramData) {
         try {
            const userData = extractUserData(telegramData);
            if (userData && userData.id) {
               return `telegram:${userData.id}`;
            }
         } catch (error) {
            console.warn(
               "Failed to extract Telegram ID for rate limiting:",
               error
            );
         }
      }
   }

   // Fallback to IP address for non-authenticated routes or when Telegram ID is not available
   const forwarded = request.headers.get("x-forwarded-for");
   const realIp = request.headers.get("x-real-ip");
   const cfConnectingIp = request.headers.get("cf-connecting-ip");

   if (forwarded) {
      return `ip:${forwarded.split(",")[0].trim()}`;
   }

   if (realIp) {
      return `ip:${realIp}`;
   }

   if (cfConnectingIp) {
      return `ip:${cfConnectingIp}`;
   }

   // Fallback to a default identifier
   return "unknown";
}

/**
 * Check if a route requires Telegram authentication
 */
function isAuthenticatedRoute(pathname: string): boolean {
   // Routes that require Telegram authentication
   const authenticatedRoutes = [
      "/api/package",
      "/api/balance",
      "/api/orders",
      "/api/esims",
      "/api/transaction-detail",
      "/api/topup-history",
      "/api/init-payment",
      "/api/order",
      "/api/init-user",
      "/api/paypal/create",
   ];

   return authenticatedRoutes.some((route) => pathname.startsWith(route));
}

/**
 * Apply rate limiting to a request
 * Returns null if rate limit is not exceeded, or a NextResponse if it is
 */
export async function applyRateLimit(
   request: NextRequest,
   pathname: string
): Promise<NextResponse | null> {
   // Skip rate limiting for admin routes
   if (isAdminRoute(pathname)) {
      return null;
   }

   try {
      const identifier = getClientIdentifier(request, pathname);
      const rateLimiter = getRateLimiterForRoute(pathname);

      const { success, remaining, reset, limit } = await rateLimiter.limit(
         identifier
      );

      if (!success) {
         return NextResponse.json(
            {
               success: false,
               error: "Rate limit exceeded",
               message: "Too many requests. Please try again later.",
               retryAfter: Math.ceil((reset - Date.now()) / 1000),
            },
            {
               status: 429,
               headers: {
                  "X-RateLimit-Limit": limit.toString(),
                  "X-RateLimit-Remaining": remaining.toString(),
                  "X-RateLimit-Reset": reset.toString(),
                  "Retry-After": Math.ceil(
                     (reset - Date.now()) / 1000
                  ).toString(),
               },
            }
         );
      }

      // Add rate limit headers to successful responses
      return null;
   } catch (error) {
      // If rate limiting fails, log the error but don't block the request
      console.error("Rate limiting error:", error);
      return null;
   }
}

/**
 * Middleware function to apply rate limiting
 * This can be used in Next.js middleware or directly in API routes
 */
export async function rateLimitMiddleware(
   request: NextRequest
): Promise<NextResponse | null> {
   const { pathname } = request.nextUrl;

   // Only apply rate limiting to API routes
   if (!pathname.startsWith("/api/")) {
      return null;
   }

   return await applyRateLimit(request, pathname);
}

