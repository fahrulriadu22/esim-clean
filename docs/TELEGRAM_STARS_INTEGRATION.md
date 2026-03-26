# 🌟 Telegram Stars Integration

This document describes the comprehensive Telegram Stars payment integration in the eSIM app, providing users with a seamless, native payment experience within the Telegram ecosystem.

## 📋 Overview

Telegram Stars is Telegram's official in-app currency that allows users to make payments directly within the Telegram Web App. This integration provides a secure, compliant, and user-friendly payment method for both balance top-ups and eSIM purchases.

## ✨ Key Features

### 🚀 Native Integration

-  **Telegram WebApp API**: Direct integration with Telegram's payment system
-  **Seamless UX**: Payments open natively within the Telegram interface
-  **No External Redirects**: Complete payment flow within the app
-  **Instant Processing**: Real-time payment verification and processing

### 💰 Dual Payment Types

-  **Balance Top-ups**: Users can top up their account balance using Telegram Stars
-  **Direct eSIM Purchases**: Users can purchase eSIM packages directly with Stars
-  **Flexible Amounts**: Support for custom amounts and preset values

### 🔒 Security & Compliance

-  **App Store Compliant**: Follows Telegram's official payment guidelines
-  **Secure Authentication**: HMAC-SHA256 validation for all requests
-  **Amount Verification**: Automatic validation of payment amounts
-  **Duplicate Prevention**: Protection against duplicate transactions

## 🏗️ Technical Architecture

### Frontend Components

#### 1. TelegramStarsCheckoutPage.tsx

```typescript
// Main checkout component for eSIM purchases
interface TelegramStarsCheckoutPageProps {
   plan: Package;
   onBack: () => void;
   onSuccess: () => void;
}
```

**Features:**

-  Plan details display with Stars conversion
-  Payment status tracking (idle, processing, success, error)
-  Native Telegram WebApp integration
-  Fallback handling for unsupported environments

#### 2. TelegramStarsTopupPage.tsx

```typescript
// Balance top-up component
interface TelegramStarsTopupPageProps {
   amount: number;
   onBack: () => void;
   onSuccess: () => void;
}
```

**Features:**

-  Amount display with Stars conversion
-  Payment processing with status updates
-  Success/error handling with user feedback
-  Information about Telegram Stars

### Backend API Integration

#### Payment Initialization (`/api/init-payment`)

**Request Flow:**

1. **Authentication**: Verify Telegram WebApp data
2. **Rate Limiting**: Apply payment-specific rate limits
3. **User Validation**: Ensure user exists in database
4. **Invoice Creation**: Generate Telegram Stars invoice
5. **Database Storage**: Save payment record with PENDING status

**Key Implementation:**

```typescript
// Convert USD to Stars (1 Star = $0.018 USD)
const starsAmount = Math.ceil(amount / process.env.STARS_RATE);

const invoiceLink = await bot.createInvoiceLink(
   title,
   description,
   referenceId,
   "",
   "XTR", // Currency for Telegram Stars
   [{ label: "eSIM Package", amount: starsAmount }]
);
```

#### Webhook Handler (`/api/webhook/telegram`)

**Payment Verification Process:**

1. **Currency Validation**: Ensure payment is in XTR (Telegram Stars)
2. **Amount Verification**: Validate received amount matches expected
3. **Reference Matching**: Verify reference ID
4. **Status Update**: Update payment status to COMPLETED
5. **Service Provision**: Process eSIM order or balance update

**Key Features:**

-  **Amount Tolerance**: 0.01 Stars tolerance for rounding differences
-  **Duplicate Prevention**: Check for existing completed payments
-  **Automatic Processing**: Handle both TOPUP and ORDER payment types

## 💳 Payment Flow

### 1. User Initiates Payment

```
User clicks "Pay with Telegram Stars"
    ↓
App calls /api/init-payment
    ↓
Backend creates Telegram invoice
    ↓
Returns invoice link to frontend
```

### 2. Payment Processing

```
Frontend opens invoice via Telegram WebApp API
    ↓
User completes payment in Telegram interface
    ↓
Telegram sends webhook to /api/webhook/telegram
    ↓
Backend verifies payment and updates status
```

### 3. Service Provision

```
Payment verified successfully
    ↓
For TOPUP: Update user balance
    ↓
For ORDER: Create eSIM order via external API
    ↓
Send confirmation to user
```

## 🔧 Configuration

### Environment Variables

```env
# Telegram Bot Configuration
BOT_KEY="your_telegram_bot_token"

# Stars Exchange Rate
STARS_RATE=0.018  # 1 Star = $0.018 USD

# App URL for webhook callbacks
NEXT_PUBLIC_APP_URL="https://your-app-url.com"
```

### Database Schema

```sql
-- Payment History Table
CREATE TABLE PaymentHistory (
   id UUID PRIMARY KEY,
   userId UUID REFERENCES User(id),
   amount DECIMAL(10,2),
   paymentMethod VARCHAR(20),
   status VARCHAR(20),
   referenceId VARCHAR(255),
   orderNo VARCHAR(255),
   createdAt TIMESTAMP,
   updatedAt TIMESTAMP
);
```

## 📊 Exchange Rate Management

### Current Rate

-  **1 Telegram Star = $0.018 USD**
-  **1 USD ≈ 55.56 Telegram Stars**
-  **Configurable via STARS_RATE environment variable**

### Conversion Logic

```typescript
// USD to Stars conversion
const starsAmount = Math.ceil(amount / STARS_RATE);

// Stars to USD conversion (for display)
const usdAmount = starsAmount * STARS_RATE;
```

## 🛡️ Security Features

### Authentication

-  **HMAC-SHA256 Validation**: All requests validated using Telegram's signature
-  **Time-based Security**: 20-second window for request validity
-  **User Data Extraction**: Secure extraction of user information

### Payment Security

-  **Amount Verification**: Strict validation of payment amounts
-  **Currency Validation**: Only XTR (Telegram Stars) accepted
-  **Reference Matching**: Invoice payload must match database record
-  **Duplicate Prevention**: Check for existing completed payments

### Rate Limiting

-  **Payment Endpoints**: 20 requests per minute
-  **User-based Limiting**: Per Telegram ID rate limiting
-  **IP Fallback**: IP-based limiting for non-authenticated requests

## 🎨 User Experience

### Visual Design

-  **Consistent Branding**: Telegram Stars yellow color scheme
-  **Status Indicators**: Clear visual feedback for payment states
-  **Loading States**: Smooth transitions during processing
-  **Error Handling**: User-friendly error messages

### Payment States

1. **Idle**: Ready to pay with clear call-to-action
2. **Processing**: Loading indicator with status message
3. **Success**: Confirmation with next steps
4. **Error**: Clear error message with retry option

### Information Display

-  **Amount Conversion**: Real-time USD ↔ Stars conversion
-  **Plan Details**: Clear display of eSIM package information
-  **Stars Information**: Educational content about Telegram Stars

## 🔄 Error Handling

### Common Error Scenarios

1. **Telegram Data Missing**: Fallback to manual payment flow
2. **Invoice Creation Failed**: Retry mechanism with user feedback
3. **Payment Cancelled**: Graceful handling with retry option
4. **Amount Mismatch**: Clear error message with correction steps
5. **Network Issues**: Retry logic with exponential backoff

### Error Recovery

-  **Automatic Retries**: Built-in retry mechanism for failed requests
-  **User Guidance**: Clear instructions for resolving issues
-  **Fallback Options**: Alternative payment methods available
-  **Support Integration**: Direct access to customer support

## 📈 Analytics & Monitoring

### Payment Tracking

-  **Success Rate**: Monitor payment completion rates
-  **Error Analysis**: Track common failure points
-  **User Behavior**: Analyze payment method preferences
-  **Performance Metrics**: Response times and processing speeds

### Key Metrics

-  **Conversion Rate**: Stars payment adoption
-  **Completion Rate**: Successful payment percentage
-  **Error Rate**: Failed payment analysis
-  **User Satisfaction**: Payment experience feedback

## 🚀 Future Enhancements

### Planned Features

-  **Bulk Payments**: Support for multiple eSIM purchases
-  **Subscription Model**: Recurring payments for monthly plans
-  **Loyalty Program**: Stars-based rewards system
-  **Advanced Analytics**: Detailed payment insights

### Integration Improvements

-  **Webhook Reliability**: Enhanced webhook handling
-  **Payment Scheduling**: Delayed payment processing
-  **Refund System**: Automated refund processing
-  **Multi-currency**: Support for different Stars rates

## 📚 API Documentation

### Endpoints

#### `POST /api/init-payment`

Initialize Telegram Stars payment

**Request:**

```json
{
   "amount": 25.0,
   "paymentMethod": "STARS",
   "type": "ORDER",
   "sku": "US_5GB_30D"
}
```

**Response:**

```json
{
   "success": true,
   "data": {
      "invoiceLink": "https://t.me/invoice/...",
      "starsAmount": 1389,
      "referenceId": "uuid-reference-id"
   }
}
```

#### `POST /api/webhook/telegram`

Handle Telegram payment webhooks

**Webhook Payload:**

```json
{
   "update_id": 123456789,
   "message": {
      "successful_payment": {
         "currency": "XTR",
         "total_amount": 1389,
         "invoice_payload": "reference-id",
         "telegram_payment_charge_id": "charge-id"
      }
   }
}
```

## 🛠️ Development Notes

### Testing

-  **Mock Telegram API**: Use test bot for development
-  **Webhook Testing**: ngrok for local webhook testing
-  **Payment Simulation**: Test payment flows without real Stars

### Deployment

-  **Environment Setup**: Configure bot token and webhook URL
-  **Database Migration**: Ensure payment tables are created
-  **Webhook Registration**: Set up Telegram webhook endpoint

### Monitoring

-  **Payment Logs**: Comprehensive logging of all payment attempts
-  **Error Tracking**: Detailed error logging and alerting
-  **Performance Monitoring**: Track API response times
-  **User Analytics**: Monitor payment method adoption

## 🤝 Support & Maintenance

### Common Issues

1. **Webhook Not Receiving**: Check bot token and webhook URL
2. **Payment Not Processing**: Verify amount and currency
3. **User Not Found**: Ensure user initialization
4. **Rate Limiting**: Monitor request frequency

### Maintenance Tasks

-  **Regular Updates**: Keep Telegram Bot API updated
-  **Rate Monitoring**: Monitor and adjust rate limits
-  **Error Analysis**: Regular review of payment failures
-  **Performance Optimization**: Continuous improvement of response times
