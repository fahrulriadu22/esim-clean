# 🚦 Rate Limiting Implementation

This document describes the rate limiting implementation using Upstash Redis for the eSIM App API endpoints.

## 📋 Overview

Rate limiting has been implemented to protect API endpoints from abuse and ensure fair usage. The implementation uses different rate limits based on endpoint types and excludes admin endpoints from rate limiting.

### 🎯 Key Benefits

-  **Per-User Rate Limiting**: Authenticated routes use Telegram ID for more accurate user-based limiting
-  **IP Fallback**: Non-authenticated routes fall back to IP-based limiting
-  **Flexible Limits**: Different rate limits for different endpoint types
-  **Admin Exclusions**: Administrative endpoints are not rate limited

## 🔧 Configuration

### Rate Limiter Types

| Type        | Limit        | Window   | Use Case                  |
| ----------- | ------------ | -------- | ------------------------- |
| **General** | 100 requests | 1 minute | Standard API endpoints    |
| **Payment** | 20 requests  | 1 minute | Payment-related endpoints |
| **Auth**    | 10 requests  | 1 minute | Authentication endpoints  |
| **Webhook** | 200 requests | 1 minute | Webhook endpoints         |

### Endpoint Classifications

#### 🔒 Payment Endpoints (20 req/min)

-  `/api/init-payment`
-  `/api/order`
-  `/api/paypal/create`

#### 🔐 Authentication Endpoints (10 req/min)

-  `/api/init-user`

#### 🔗 Webhook Endpoints (200 req/min)

-  `/api/webhook`
-  `/api/verify-ton`

#### 📊 General Endpoints (100 req/min)

-  `/api/package`
-  `/api/balance`
-  `/api/orders`
-  `/api/esims`
-  `/api/locations`
-  `/api/transaction-detail`
-  `/api/topup-history`

#### 🚫 Admin Endpoints (No Rate Limiting)

-  `/api/data/dashboard`
-  `/api/data/orders`
-  `/api/data/users`
-  `/api/data/topups`

## 🛠️ Implementation Details

### Core Files

1. **`lib/rate-limiter.ts`** - Main rate limiting logic
2. **`middleware.ts`** - Next.js middleware for global rate limiting
3. **Individual API routes** - Rate limiting applied per endpoint

### Rate Limiting Logic

```typescript
// Apply rate limiting to a request
const rateLimitResponse = await applyRateLimit(request, "/api/endpoint");
if (rateLimitResponse) {
   return rateLimitResponse; // Returns 429 if rate limited
}
```

### Client Identification

The rate limiter uses different identification strategies based on route type:

#### For Authenticated Routes (Telegram ID-based)

1. **Telegram ID** - Extracted from `X-Telegram-Data` header
2. **IP Address** - Fallback if Telegram ID is not available

#### For Non-Authenticated Routes (IP-based)

1. `X-Forwarded-For` header (first IP)
2. `X-Real-IP` header
3. `CF-Connecting-IP` header (Cloudflare)
4. Fallback to 'unknown'

#### Identifier Format

-  **Telegram users**: `telegram:{telegram_id}`
-  **IP addresses**: `ip:{ip_address}`
-  **Unknown**: `unknown`

## 📊 Response Headers

When rate limiting is applied, the following headers are included:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
Retry-After: 60
```

## 🚨 Rate Limit Exceeded Response

```json
{
   "success": false,
   "error": "Rate limit exceeded",
   "message": "Too many requests. Please try again later.",
   "retryAfter": 60
}
```

**Status Code:** `429 Too Many Requests`

## 🧪 Testing

### Manual Testing

Use the provided test script:

```bash
node scripts/test-rate-limit.js
```

### Environment Variables Required

```bash
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
```

## 📈 Monitoring

### Redis Keys

Rate limiting data is stored in Redis with the following key patterns:

-  `ratelimit:general:{identifier}`
-  `ratelimit:payment:{identifier}`
-  `ratelimit:auth:{identifier}`
-  `ratelimit:webhook:{identifier}`

### Metrics to Monitor

1. **Rate Limit Hits** - Number of 429 responses
2. **Remaining Requests** - Track `X-RateLimit-Remaining` headers
3. **Reset Times** - Monitor `X-RateLimit-Reset` values
4. **Client Distribution** - Unique identifiers hitting limits

## 🔧 Configuration Updates

### Adjusting Rate Limits

To modify rate limits, update the configuration in `lib/rate-limiter.ts`:

```typescript
export const rateLimiters = {
   general: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1m"), // Change these values
      prefix: "ratelimit:general",
   }),
   // ... other limiters
};
```

### Adding New Endpoint Types

1. Add new rate limiter configuration
2. Update route classification arrays
3. Modify `getRateLimiterForRoute()` function

## 🚀 Deployment Considerations

### Production Setup

1. **Upstash Redis** - Ensure Redis instance is properly configured
2. **Environment Variables** - Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
3. **Monitoring** - Set up alerts for high rate limit usage
4. **Scaling** - Consider Redis clustering for high-traffic applications

### Performance Impact

-  **Minimal Latency** - Rate limiting adds ~1-5ms per request
-  **Redis Dependency** - Requires Redis availability
-  **Memory Usage** - Minimal impact on application memory

## 🔍 Troubleshooting

### Common Issues

1. **Rate Limiting Not Working**

   -  Check Redis connection
   -  Verify environment variables
   -  Check middleware configuration

2. **Too Many 429 Errors**

   -  Review rate limit values
   -  Check for client misidentification
   -  Consider increasing limits for legitimate users

3. **Admin Endpoints Being Rate Limited**
   -  Verify admin route patterns in `ADMIN_ROUTES` array
   -  Check middleware matcher configuration

### Debug Mode

Enable debug logging by adding console.log statements in the rate limiter:

```typescript
console.log("Rate limiting check:", {
   pathname,
   identifier,
   rateLimiter: rateLimiter.prefix,
   success,
   remaining,
});
```

## 📚 Additional Resources

-  [Upstash Rate Limiting Documentation](https://upstash.com/docs/redis/sdks/ratelimit-ts)
-  [Next.js Middleware Documentation](https://nextjs.org/docs/middleware)
-  [Redis Rate Limiting Patterns](https://redis.io/docs/manual/patterns/distributed-locks/)
