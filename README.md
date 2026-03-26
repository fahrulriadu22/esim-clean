# eSIM App

A Telegram Web App for purchasing and managing eSIM packages with multi-language support and real-time package updates.

## 🚀 Features

-  **Telegram Integration**: Built as a Telegram Web App using TWA SDK
-  **Multi-language Support**: English, Indonesian, and Russian translations
-  **eSIM Package Management**: Browse and purchase eSIM packages by region
-  **Real-time Updates**: Automated package and location data synchronization
-  **User Management**: Telegram user authentication and balance tracking
-  **Multiple Payment Methods**: TON blockchain, Telegram Stars, and PayPal payments
-  **Comprehensive Help System**: FAQ, troubleshooting guides, and support integration
-  **Advanced Security**: Rate limiting, transaction verification, and secure authentication
-  **Modern UI**: Built with Next.js 15, Tailwind CSS, and Radix UI components

## 🛠 Tech Stack

-  **Framework**: Next.js 15 with App Router
-  **Database**: PostgreSQL with Drizzle ORM
-  **Styling**: Tailwind CSS with custom design system
-  **UI Components**: Radix UI primitives
-  **Authentication**: Telegram Web App SDK
-  **Internationalization**: next-intl
-  **Package Manager**: pnpm
-  **Deployment**: OpenNext for Cloudflare Pages optimization
-  **Blockchain**: TON Connect integration with TON Center API
-  **Caching**: Upstash Redis for price caching and rate limiting
-  **Payment APIs**: CoinGecko API, PayPal API, Telegram Bot API
-  **Security**: Rate limiting, HMAC validation, transaction verification

## 📋 Prerequisites

-  Node.js 18+
-  PostgreSQL database
-  Telegram Bot Token (for Web App)
-  eSIM Access API credentials
-  TON wallet address (for receiving payments)
-  Upstash Redis account (for caching and rate limiting)
-  PayPal Developer Account (for PayPal payments)
-  CoinGecko API access (for TON price conversion)

## ⚙️ Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/esim_app"

# eSIM Access API
ESIM_ACCESS_CODE="your_access_code"
ESIM_SECRET_KEY="your_secret_key"

# Exchange Rate API (optional)
EXCHANGE_RATE_API_KEY="your_api_key"

# TON Blockchain
NEXT_PUBLIC_TON_RECIPIENT_ADDRESS="your_ton_wallet_address"

# Telegram Stars
STARS_RATE=0.018

# Upstash Redis (for caching and rate limiting)
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_redis_token"

# PayPal (optional)
PAYPAL_CLIENT_ID="your_paypal_client_id"
PAYPAL_CLIENT_SECRET="your_paypal_client_secret"

# Admin API (optional)
DATA_API_KEY="your_data_api_key"
```

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Setup database**:

   ```bash
   npx drizzle-kit push
   ```

3. **Seed initial data**:

   ```bash
   # Update locations from eSIM Access API
   curl -X POST http://localhost:3000/api/cron \
     -H "Content-Type: application/json" \
     -d '{"type": "update-location"}'

   # Update packages for all regions
   pnpm run update-packages
   ```

4. **Start development server**:
   ```bash
   pnpm dev
   ```

## 📱 App Structure

```
app/
├── [locale]/           # Internationalized routes
├── api/               # API endpoints
│   ├── cron/          # Background job endpoints
│   ├── locations/     # Location data API
│   ├── package/       # Package data API
│   ├── init-user/     # User initialization
│   ├── init-payment/  # Payment initialization
│   ├── verify-ton/    # TON transaction verification
│   ├── balance/       # User balance management
│   ├── orders/        # Order management
│   ├── webhook/       # Webhook handlers (PayPal, Telegram)
│   └── data/          # Admin analytics endpoints
components/
├── tabs/              # Main app tabs (Internet, My eSIMs, Account, Help)
│   ├── CheckoutScreen.tsx
│   ├── BalanceScreen.tsx
│   ├── FAQPage.tsx
│   ├── BasicConceptsPage.tsx
│   └── SetupActivationPage.tsx
└── ui/                # Reusable UI components
lib/
├── ton-connect.ts     # TON Connect integration
├── coingecko.ts       # CoinGecko API integration
└── rate-limiter.ts    # Rate limiting utilities
```

## 🔄 Data Synchronization

The app automatically syncs with eSIM Access API:

-  **Locations**: Regional data and sub-regions
-  **Packages**: eSIM package details, pricing, and availability
-  **Exchange Rates**: USD to IDR conversion for pricing

### Manual Updates

```bash
# Update all packages
pnpm run update-packages

# Update specific region
curl -X POST http://localhost:3000/api/cron \
  -H "Content-Type: application/json" \
  -d '{"type": "update-package", "regionCode": "US"}'
```

## 🌍 Internationalization

Supported languages:

-  English (`en`)
-  Indonesian (`id`)
-  Russian (`ru`)

Translation files are located in `locales/[lang]/common.json`.

## 🗄️ Database Schema

Key models:

-  **User**: Telegram user data and balance
-  **Region**: Countries/regions with sub-regions
-  **Package**: eSIM packages with pricing and data limits
-  **Order**: eSIM orders with status tracking
-  **PaymentHistory**: Payment transactions and verification (includes packageCode for ORDER type)
-  **Balance**: User wallet balance and transaction history

## 📦 Available Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm update-packages  # Update all eSIM packages
pnpm preview          # Preview OpenNext build locally
pnpm deploy           # Deploy to Cloudflare Pages
```

## 🔧 API Endpoints

### User Endpoints

-  `GET /api/locations` - Fetch available regions and packages
-  `GET /api/package` - Package details by region
-  `GET /api/balance` - Get user balance
-  `GET /api/orders` - Get user orders (including pending transactions)
-  `GET /api/transaction-detail` - Get transaction details
-  `POST /api/init-user` - Initialize Telegram user

### Payment Endpoints

-  `POST /api/init-payment` - Initialize payment (TON, PayPal, Telegram Stars)
-  `GET /api/verify-ton` - Verify TON blockchain transactions
-  `POST /api/webhook/paypal` - PayPal webhook handler
-  `POST /api/webhook/telegram` - Telegram webhook handler
-  `GET /api/payment-history/clear` - Clear old pending payments (12+ hours)
-  `GET /api/payment-history/remind` - Send payment reminders (1+ hour pending)

### Admin Endpoints

-  `GET /api/data/dashboard` - Analytics dashboard
-  `GET /api/data/orders` - Admin orders list
-  `GET /api/data/users` - Admin users list
-  `GET /api/data/topups` - Admin topups list

### Background Jobs

-  `POST /api/cron` - Background data synchronization

## 💳 Payment Methods

The app supports multiple payment methods for both balance top-ups and eSIM purchases:

### TON Blockchain Payments

-  **TON Connect Integration**: Direct wallet connection and transaction sending
-  **Manual Verification**: Support for any TON wallet with manual transaction verification
-  **Real-time Pricing**: CoinGecko API integration for USD ↔ TON conversion
-  **Blockchain Verification**: Automatic transaction verification via TON Center API
-  **Security**: Duplicate prevention, amount validation, and address verification

### Telegram Stars

-  **Native Integration**: Built-in Telegram Stars payment system
-  **Instant Processing**: Direct integration with Telegram Bot API
-  **User-friendly**: Seamless experience within Telegram Web App

### PayPal Payments

-  **PayPal API Integration**: Secure payment processing via PayPal
-  **Webhook Support**: Automatic payment verification and order processing
-  **International Support**: Global payment acceptance

## 🆘 Help System

The app includes a comprehensive help system with multiple support channels:

### Self-Service Resources

-  **FAQ Section**: Common questions and answers about eSIM usage
-  **Basic Concepts**: Educational content about eSIM technology
-  **Setup Guides**: Step-by-step activation instructions
-  **Troubleshooting**: Common issues and solutions

### Support Features

-  **Multi-language Support**: Help content in English, Indonesian, and Russian
-  **Contact Support**: Direct support channel integration
-  **Interactive Guides**: Visual setup and activation instructions

## 🚀 Deployment

### Cloudflare Pages (Recommended)

This project is configured with OpenNext for optimal Cloudflare deployment:

1. **Build and deploy to Cloudflare Pages**:

   ```bash
   # Build the application
   pnpm build

   # Preview locally
   pnpm preview

   # Deploy to Cloudflare Pages
   pnpm deploy
   ```

2. **Set up environment variables** in Cloudflare Pages dashboard

3. **Configure Telegram Web App** with your deployed URL

### Other Platforms

For other hosting platforms (Vercel, Railway, etc.):

1. **Build the application**:

   ```bash
   pnpm build
   ```

2. **Deploy to your hosting platform**

3. **Set up environment variables** in your hosting platform

4. **Configure Telegram Web App** with your deployed URL

## 📝 Development Notes

-  The app is configured to ignore TypeScript and ESLint errors during builds
-  Images are unoptimized for Telegram Web App compatibility
-  Database schema is managed with Drizzle ORM
-  Custom UI components use Tailwind CSS with design tokens
-  Rate limiting is implemented using Upstash Redis with different limits per endpoint type
-  TON price caching reduces API calls and improves performance
-  Webhook endpoints include IP whitelisting for security
-  Transaction verification includes blockchain polling with timeout handling
-  OpenNext configuration optimizes the app for Cloudflare Pages deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📚 Documentation

-  **[API Documentation](./docs/API_DOCUMENTATION.md)** - Complete API reference and integration guide
-  **[Scripts Documentation](./docs/scripts.md)** - Setup and utility scripts guide
-  **[Telegram Stars Integration](./docs/TELEGRAM_STARS_INTEGRATION.md)** - Telegram Stars payment integration guide
-  **[Rate Limiting](./docs/RATE_LIMITING.md)** - Rate limiting implementation and configuration
-  **[TON Integration](./docs/TON_INTEGRATION.md)** - TON blockchain integration and setup

## 📄 License

Private project - All rights reserved.
