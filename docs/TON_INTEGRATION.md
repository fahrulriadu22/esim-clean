# TON Blockchain Payment Integration

This document describes the comprehensive TON blockchain payment integration added to the eSIM app.

## Overview

The app supports TON blockchain payments for both balance top-ups and eSIM purchases. Users can choose between PayPal and TON payment methods, with TON offering decentralized, fast, and low-cost transactions.

## Features

### 1. Payment Method Selection

-  Users can select TON as a payment method from the balance screen
-  TON option is available alongside Telegram Stars and PayPal
-  Supports both TOPUP (balance) and ORDER (eSIM purchase) payment types

### 2. TON Price Integration

-  Real-time TON to USD conversion using CoinGecko API
-  Automatic calculation of TON amount based on USD input
-  Price updates when user changes the amount
-  Bidirectional conversion (USD ↔ TON)

### 3. TON Connect Integration

-  Wallet connection using TON Connect protocol
-  Support for popular TON wallets (Tonkeeper, TON Wallet, etc.)
-  Direct transaction sending from connected wallet
-  Automatic transaction verification after sending

### 4. Manual Transaction Verification

-  Alternative flow for users who prefer to send transactions manually
-  Transaction verification through blockchain polling
-  Support for any TON wallet (not just TON Connect compatible)
-  Manual address input for verification

### 5. Advanced Transaction Verification

-  Real-time transaction status checking via TON Center API
-  Blockchain polling until confirmation (5-minute timeout)
-  Automatic balance update upon successful payment
-  eSIM auto-provisioning for ORDER type payments

## Technical Implementation

### Files Added/Modified

1. **`lib/coingecko.ts`** - CoinGecko API integration for TON price conversion
2. **`lib/ton-connect.ts`** - TON Connect wallet integration utilities and hooks
3. **`app/api/verify-ton/route.ts`** - API endpoint for transaction verification
4. **`app/api/init-payment/route.ts`** - Payment initialization for TON transactions
5. **`components/tabs/TonTopupPage.tsx`** - TON balance top-up UI component
6. **`components/tabs/TonCheckoutPage.tsx`** - TON eSIM purchase UI component
7. **`components/providers/TonConnectProvider.tsx`** - TON Connect provider setup
8. **`components/tabs/BalanceScreen.tsx`** - Updated to support TON payments
9. **`components/tabs/CheckoutScreen.tsx`** - Updated to support TON payments
10.   **`package.json`** - Added TON Connect dependencies

### Dependencies Added

```json
{
   "@tonconnect/sdk": "^2.0.0",
   "@tonconnect/ui": "^2.0.0",
   "@ton/core": "^0.56.3"
}
```

### API Endpoints

#### POST `/api/init-payment`

Initializes a TON payment and creates a payment record.

**Headers:**

```http
X-Telegram-Data: <telegram_webapp_data>
```

**Body:**

```json
{
  "amount": 25.0,
  "paymentMethod": "TON",
  "type": "TOPUP" | "ORDER"
}
```

**Response:**

```json
{
   "message": "Payment initialized",
   "data": {
      "referenceId": "TON-a1b2c3d4e5f6",
      "amount": 25.0,
      "tonAmount": "0.123"
   }
}
```

#### GET `/api/verify-ton`

Verifies TON transaction by checking the blockchain and processes payment.

**Query Parameters:**

-  `senderAddress` (string, required): TON wallet address to verify
-  `sku` (string, optional): Package code for eSIM orders (required for ORDER type)

**Response:**

```json
{
   "success": true,
   "message": "Ton transaction verified successfully"
}
```

**Error Responses:**

-  `400`: Sender address is required
-  `404`: Payment history not found
-  `400`: Ton history already exists (duplicate transaction)
-  `500`: Ton transaction verification failed, amount is not correct
-  `500`: Failed to order eSIM

### Configuration

#### Environment Variables

-  `NEXT_PUBLIC_TON_RECIPIENT_ADDRESS`: Fixed recipient address for all TON payments
-  Default fallback address: `kQBM0TlTk3-lhW4cjbRrGxzufUc_gaJOAQt-LdlmKudcGod0`

#### TON Connect Manifest

The app uses a TON Connect manifest for wallet integration. The manifest URL is:

```
https://thrush-crucial-lizard.ngrok-free.app/tonconnect-manifest.json
```

#### TON Center API

-  **Testnet**: `https://testnet.toncenter.com/api/v2/getTransactions`
-  **Mainnet**: Can be configured for production use
-  Used for transaction verification and blockchain polling

#### CoinGecko API

-  **Endpoint**: `https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd`
-  Used for real-time TON price conversion

## User Flow

### 1. Payment Method Selection

1. User navigates to balance screen or checkout screen
2. User selects amount to top up or eSIM plan
3. User clicks "Pay" button
4. User selects "TON" from payment methods

### 2. TON Payment Process

1. App loads current TON price from CoinGecko API
2. App calculates TON amount equivalent to USD
3. App initializes payment via `/api/init-payment`
4. User receives reference ID for transaction
5. User can either:
   -  Connect TON wallet and send transaction directly via TON Connect
   -  Send transaction manually and verify with wallet address

### 3. Transaction Verification

1. App polls blockchain via `/api/verify-ton` every 10 seconds
2. Verification checks:
   -  Transaction exists on blockchain
   -  Correct sender and recipient addresses
   -  Amount within 3% tolerance
   -  Reference ID matches in transaction message
   -  No duplicate transaction hash
3. Once confirmed:
   -  For TOPUP: User balance is updated
   -  For ORDER: eSIM is automatically provisioned
4. User is redirected back to appropriate screen

### 4. Payment Types

#### TOPUP Payments

-  Used for balance top-ups
-  Updates user balance upon verification
-  No additional parameters required

#### ORDER Payments (eSIM Purchases)

-  Used for eSIM purchases
-  Requires `sku` parameter for package identification
-  Automatically orders eSIM after verification
-  Calls external eSIM API to provision service

## Error Handling

### Common Error Cases

1. **Price Loading Failure**: Shows error message with retry option
2. **Wallet Connection Failure**: Shows connection error with retry
3. **Transaction Failure**: Shows transaction error with retry
4. **Verification Timeout**: Shows timeout message after 5 minutes (30 attempts × 10 seconds)
5. **Amount Mismatch**: Transaction amount outside 3% tolerance
6. **Duplicate Transaction**: Same transaction hash already processed
7. **Payment History Not Found**: Reference ID not found in database
8. **eSIM Ordering Failure**: External eSIM API call fails

### Error Recovery

-  All error states include retry buttons
-  Users can go back to payment method selection
-  Manual transaction verification as fallback
-  Automatic retry for network-related errors
-  Clear error messages with actionable steps

### Polling Configuration

-  **Max Attempts**: 30 (5 minutes total)
-  **Poll Interval**: 10 seconds
-  **Initial Delay**: 5 seconds before first poll
-  **Timeout Handling**: Graceful failure with user notification

## Security Considerations

1. **Transaction Validation**: All transactions are verified on-chain via TON Center API
2. **Amount Validation**: TON amount must be within 3% tolerance of expected USD amount
3. **Address Validation**: Transactions must be sent to fixed recipient address
4. **Reference ID Validation**: Transaction message must contain correct reference ID
5. **Duplicate Prevention**: Transaction hash is checked against existing records
6. **Timeout Protection**: Verification stops after 5 minutes to prevent infinite polling
7. **Telegram Data Validation**: All API calls require valid Telegram WebApp data
8. **HMAC Verification**: Telegram data is verified using HMAC signature

## Testing

### Manual Testing Steps

1. Test price loading with different amounts
2. Test wallet connection with different TON wallets
3. Test manual transaction verification
4. Test error scenarios (network issues, invalid hashes)
5. Test payment confirmation flow
6. Test both TOPUP and ORDER payment types
7. Test amount tolerance (within and outside 3% range)
8. Test duplicate transaction prevention
9. Test eSIM auto-provisioning for ORDER payments

### Test Scenarios

-  [ ] Price loading works correctly
-  [ ] Wallet connection works with Tonkeeper
-  [ ] Wallet connection works with TON Wallet
-  [ ] Manual transaction verification works
-  [ ] Error handling works for all scenarios
-  [ ] Payment confirmation updates balance
-  [ ] eSIM auto-provisioning works for ORDER payments
-  [ ] Amount tolerance validation works (3% range)
-  [ ] Duplicate transaction prevention works
-  [ ] Polling timeout handling works
-  [ ] UI is consistent with existing design
-  [ ] Reference ID generation and validation works

## Future Enhancements

1. **TON Connect UI Integration**: Add TON Connect UI components for better UX
2. **Transaction History**: Show TON transaction history in user interface
3. **Multiple Recipients**: Support for different recipient addresses per region
4. **Custom Amounts**: Allow custom TON amounts beyond predefined options
5. **Push Notifications**: Notify users of payment status via Telegram
6. **Analytics**: Track TON payment usage and success rates
7. **Mainnet Support**: Switch from testnet to mainnet for production
8. **Multi-Currency**: Support for other cryptocurrencies beyond TON
9. **Transaction Batching**: Batch multiple transactions for efficiency
10.   **Advanced Error Recovery**: More sophisticated retry mechanisms

## Troubleshooting

### Common Issues

1. **TON Connect Not Working**

   -  Check if wallet is installed and updated
   -  Verify manifest URL is accessible
   -  Check browser console for errors
   -  Ensure HTTPS is enabled for TON Connect

2. **Price Loading Issues**

   -  Check CoinGecko API status
   -  Verify network connectivity
   -  Check API rate limits
   -  Verify API endpoint is accessible

3. **Transaction Verification Failing**

   -  Check TON Center API endpoints
   -  Verify transaction hash format
   -  Check blockchain network status (testnet vs mainnet)
   -  Verify recipient address is correct
   -  Check if transaction is confirmed on blockchain

4. **Amount Mismatch Errors**

   -  Verify TON price is current
   -  Check if amount is within 3% tolerance
   -  Ensure correct nanoTON conversion (1 TON = 10^9 nanoTON)

5. **Payment History Not Found**
   -  Verify reference ID is correct
   -  Check if payment was properly initialized
   -  Ensure transaction message contains reference ID

### Debug Information

Enable debug logging by adding to browser console:

```javascript
localStorage.setItem("ton-connect-debug", "true");
```

### Database Schema

The TON integration uses the following database tables:

#### `paymentHistory`

-  Stores payment initialization records
-  Links to user and contains reference ID
-  Tracks payment status (PENDING, COMPLETED, FAILED)

#### `tonHistory`

-  Stores verified TON transactions
-  Prevents duplicate processing
-  Contains transaction hash and sender address

### API Rate Limits

-  **CoinGecko**: 10-50 calls/minute (free tier)
-  **TON Center**: No official limits, but reasonable usage expected
-  **Internal APIs**: No rate limits, but polling is limited to 30 attempts
