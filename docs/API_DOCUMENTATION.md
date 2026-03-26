# 🚀 eSIM App API Documentation

> **Version**: 1.0.0  
> **Base URL**: `/api`  
> **Authentication**: Telegram Web App Data

---

## 📋 Quick Reference

| Endpoint              | Method | Purpose                              | Auth Required |
| --------------------- | ------ | ------------------------------------ | ------------- |
| `/init-payment`       | `POST` | Initialize payment                   | ✅ Telegram   |
| `/verify-ton`         | `GET`  | Verify TON transaction (topup/order) | ❌            |
| `/balance`            | `GET`  | Get user balance                     | ✅ Telegram   |
| `/orders`             | `GET`  | Get user orders (including pending)   | ✅ Telegram   |
| `/package`            | `GET`  | Get available packages               | ✅ Telegram   |
| `/transaction-detail` | `GET`  | Get detailed transaction information | ✅ Telegram   |
| `/init-user`          | `POST` | Initialize user                      | ✅ Telegram   |
| `/payment-history/clear` | `GET` | Clear old pending payments          | ❌            |
| `/payment-history/remind` | `GET` | Send payment reminders            | ❌            |
| `/data/dashboard`     | `GET`  | Analytics dashboard                  | ✅ API Key    |
| `/data/orders`        | `GET`  | Admin orders list                    | ✅ API Key    |
| `/data/users`         | `GET`  | Admin users list                     | ✅ API Key    |
| `/data/topups`        | `GET`  | Admin topups list                    | ✅ API Key    |

---

## 🔐 Authentication

### Telegram Web App Authentication

All user-facing endpoints require Telegram Web App authentication via the `X-Telegram-Data` header.

```http
X-Telegram-Data: user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123
```

### API Key Authentication

All `/api/data` endpoints require API key authentication via the `X-API-Key` header.

```http
X-API-Key: your-secret-api-key
```

---

## 💳 Payment Initialization

### `POST /api/init-payment`

Creates a new payment transaction and calculates TON equivalent.

#### 📥 Request

**Headers:**

```http
Content-Type: application/json
X-Telegram-Data: <telegram_webapp_data>
```

**Body:**

```typescript
{
   amount: number; // USD amount
   paymentMethod: string; // "TON" | "PAYPAL" | "STARS"
   type: string; // "TOPUP" | "ORDER"
   sku?: string; // Package code for eSIM orders (required for ORDER type, saved as packageCode in PaymentHistory)
}
```

**Note:** The `sku` parameter is required for `ORDER` type payments and will be saved as `packageCode` in the PaymentHistory table. This allows the system to retrieve package information for pending transactions.

**Examples:**

```json
// For topup payments
{
   "amount": 25.0,
   "paymentMethod": "TON",
   "type": "TOPUP"
}

// For eSIM purchases with TON
{
   "amount": 15.0,
   "paymentMethod": "TON",
   "type": "ORDER",
   "sku": "TURKEY_5GB_30D"
}

// For eSIM purchases with Telegram Stars
{
   "amount": 15.0,
   "paymentMethod": "STARS",
   "type": "ORDER",
   "sku": "TURKEY_5GB_30D"
}

// For balance top-up with Telegram Stars
{
   "amount": 25.0,
   "paymentMethod": "STARS",
   "type": "TOPUP"
}
```

#### 📤 Response

**✅ Success (200):**

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

**✅ Success for Telegram Stars (200):**

```json
{
   "message": "Payment initialized",
   "data": {
      "referenceId": "STARS-a1b2c3d4e5f6",
      "amount": 15.0,
      "invoiceLink": "https://t.me/invoice/abc123",
      "starsAmount": 833
   }
}
```

**❌ Error Responses:**

| Status | Error                                     | Description                            |
| ------ | ----------------------------------------- | -------------------------------------- |
| `400`  | `Telegram data not found`                 | Missing X-Telegram-Data header         |
| `400`  | `Telegram data is invalid`                | Invalid HMAC signature                 |
| `400`  | `User data is invalid`                    | Malformed user data                    |
| `400`  | `Invalid payment method`                  | Unsupported payment method             |
| `404`  | `User not found`                          | User not in database                   |
| `500`  | `Failed to create Telegram Stars invoice` | Telegram Stars invoice creation failed |

---

## 🔍 TON Transaction Verification

### `GET /api/verify-ton`

Verifies TON blockchain transactions and processes payments for both topup and eSIM purchases.

#### 📥 Request

**Query Parameters:**

```
senderAddress: string (required) - TON wallet address
sku: string (optional) - Package code for eSIM orders (required for ORDER type payments, will update packageCode in PaymentHistory if missing)
```

**Note:** If `sku` is provided and the payment record doesn't have a `packageCode` set, it will be updated during verification.

**Examples:**

```http
# For topup payments
GET /api/verify-ton?senderAddress=EQD0vdSA_NedR9uvnh89L0SfS8O5YV4cF1Tzn8k3BYOj8k5v

# For eSIM purchases
GET /api/verify-ton?senderAddress=EQD0vdSA_NedR9uvnh89L0SfS8O5YV4cF1Tzn8k3BYOj8k5v&sku=TURKEY_5GB_30D
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "message": "Ton transaction verified successfully"
}
```

**❌ Error Responses:**

| Status | Error                                 | Description                |
| ------ | ------------------------------------- | -------------------------- |
| `400`  | `Sender address is required`          | Missing query parameter    |
| `404`  | `Payment history not found`           | No matching payment record |
| `400`  | `Ton history already exists`          | Duplicate transaction      |
| `500`  | `Ton transaction verification failed` | Amount mismatch (>3%)      |
| `500`  | `Failed to order eSIM`                | eSIM ordering failed       |

#### 🔄 Payment Processing Flow

The API handles multiple payment methods:

**1. TON Payments:**

-  **TOPUP**: Verifies transaction with reference ID in message field, updates user balance
-  **ORDER**: Requires `sku` parameter, verifies transaction and automatically orders eSIM

**2. Telegram Stars Payments:**

-  **TOPUP**: Creates invoice link, processes payment via Telegram WebApp API
-  **ORDER**: Creates invoice link with package details, processes payment and orders eSIM
-  Uses Telegram Bot API to create invoice links
-  Handles payment verification via webhook

**3. PayPal Payments:**

-  **TOPUP**: Creates PayPal order, processes payment via PayPal API
-  **ORDER**: Creates PayPal order with package details, processes payment and orders eSIM

#### 🔍 Transaction Verification Process

1. **Blockchain Verification**: Fetches recent transactions from sender address
2. **Reference Matching**: Matches transaction message with payment reference ID
3. **Amount Validation**: Verifies amount within 3% tolerance
4. **Duplicate Prevention**: Checks for existing transaction hash
5. **Payment Processing**: Updates balance (TOPUP) or orders eSIM (ORDER)
6. **Status Update**: Marks payment as COMPLETED or FAILED

---

## 💰 User Balance

### `GET /api/balance`

Retrieves the current balance for an authenticated user.

#### 📥 Request

**Headers:**

```http
X-Telegram-Data: <telegram_webapp_data>
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "data": {
      "balance": 25.5,
      "currency": "USD",
      "user": {
         "id": "user-id",
         "telegramId": "123456789",
         "username": "johndoe",
         "fullName": "John Doe"
      }
   }
}
```

**❌ Error Responses:**

| Status | Error                      | Description                    |
| ------ | -------------------------- | ------------------------------ |
| `400`  | `Telegram data not found`  | Missing X-Telegram-Data header |
| `400`  | `Telegram data is invalid` | Invalid HMAC signature         |
| `400`  | `User data is invalid`     | Malformed user data            |
| `404`  | `User not found`           | User not in database           |

---

## 📦 User Orders

### `GET /api/orders`

Retrieves all orders for an authenticated user with eSIM details. This endpoint now includes both completed orders and pending payment transactions.

**Features:**
- ✅ Returns completed orders with full eSIM details
- ✅ Includes pending payment transactions with package information
- ✅ Automatically fetches package details from eSIM API for pending transactions
- ✅ Merges and sorts all transactions by date (newest first)
- ✅ Supports pagination for large order lists

#### 📥 Request

**Headers:**

```http
X-Telegram-Data: <telegram_webapp_data>
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "data": [
      {
         "id": "order-123",
         "country": "Turkey",
         "flag": "https://flagsapi.com/TR/flat/64.png",
         "plan": "5 GB / 30 days",
         "price": 15.0,
         "status": "completed",
         "orderDate": "2024-01-15",
         "activationDate": "2024-01-16",
         "paymentMethod": "TON",
         "color": "bg-red-500",
         "txId": "tx-abc123",
         "esims": [
            {
               "id": "esim-123",
               "iccid": "8944501234567890123",
               "imsi": "460001234567890",
               "ac": "activation-code",
               "status": "active",
               "remainingData": 4.2,
               "remainingDataFormatted": {
                  "value": 4.2,
                  "unit": "GB"
               },
               "expiredAt": "2024-02-15T00:00:00.000Z"
            }
         ]
      },
      {
         "id": "STARS-a1b2c3d4e5f6",
         "country": "Turkey",
         "flag": "https://flagsapi.com/TR/flat/64.png",
         "plan": "5 GB / 30 days",
         "price": 15.0,
         "status": "pending",
         "orderDate": "2024-01-20",
         "activationDate": "-",
         "paymentMethod": "STARS",
         "color": "bg-red-500",
         "txId": "STARS-a1b2c3d4e5f6",
         "esims": []
      }
   ],
   "pagination": {
      "page": 1,
      "limit": 5,
      "totalCount": 25,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
   }
}
```

**Note:** Pending transactions are fetched from PaymentHistory where `status = "PENDING"` and `paymentType = "ORDER"`. Package information is automatically retrieved from the eSIM API if not available in the local database.

**❌ Error Responses:**

| Status | Error                      | Description                    |
| ------ | -------------------------- | ------------------------------ |
| `400`  | `Telegram data not found`  | Missing X-Telegram-Data header |
| `400`  | `Telegram data is invalid` | Invalid HMAC signature         |
| `400`  | `User data is invalid`     | Malformed user data            |

---

## 🔍 Transaction Details

### `GET /api/transaction-detail`

Retrieves detailed information for a specific transaction by ID.

#### 📥 Request

**Headers:**

```http
X-Telegram-Data: <telegram_webapp_data>
```

**Query Parameters:**

```
id: string (required) - Transaction ID
```

**Example:**

```http
GET /api/transaction-detail?id=tx-abc123
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "data": {
      "id": "tx-abc123",
      "referenceId": "TON-a1b2c3d4e5f6",
      "amount": 25.0,
      "paymentMethod": "TON",
      "status": "COMPLETED",
      "payerEmail": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z",
      "transactionType": "TOPUP",
      "currency": "USD"
   }
}
```

**❌ Error Responses:**

| Status | Error                        | Description                                |
| ------ | ---------------------------- | ------------------------------------------ |
| `400`  | `Telegram data not found`    | Missing X-Telegram-Data header             |
| `400`  | `Telegram data is invalid`   | Invalid HMAC signature                     |
| `400`  | `User data is invalid`       | Malformed user data                        |
| `400`  | `Transaction ID is required` | Missing id parameter                       |
| `404`  | `Transaction not found`      | Transaction not found or not owned by user |

---

## 📋 Available Packages

### `GET /api/package`

Retrieves available eSIM packages for a specific location.

#### 📥 Request

**Headers:**

```http
X-Telegram-Data: <telegram_webapp_data>
```

**Query Parameters:**

```
locationCode: string (optional) - Country code (default: "ID")
```

**Example:**

```http
GET /api/package?locationCode=TR
X-Telegram-Data: user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "data": [
      {
         "id": "pkg-123",
         "code": "TURKEY_5GB_30D",
         "name": "Turkey 5GB 30 Days",
         "price": 15.0,
         "duration": 30,
         "durationUnit": "days",
         "dataAmount": 5,
         "dataUnit": "GB",
         "region": {
            "id": "region-123",
            "name": "Turkey",
            "code": "TR"
         }
      }
   ]
}
```

**❌ Error Responses:**

| Status | Error                      | Description                    |
| ------ | -------------------------- | ------------------------------ |
| `400`  | `Telegram data not found`  | Missing X-Telegram-Data header |
| `400`  | `Telegram data is invalid` | Invalid HMAC signature         |
| `400`  | `User data is invalid`     | Malformed user data            |
| `500`  | `Failed to fetch packages` | Database error                 |

---

## 👤 User Initialization

### `POST /api/init-user`

Creates or updates a user account from Telegram data.

#### 📥 Request

**Headers:**

```http
Content-Type: application/json
X-Telegram-Data: <telegram_webapp_data>
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "message": "User initialized"
}
```

**❌ Error Responses:**

| Status | Error                      | Description                    |
| ------ | -------------------------- | ------------------------------ |
| `400`  | `Telegram data not found`  | Missing X-Telegram-Data header |
| `400`  | `Telegram data is invalid` | Invalid HMAC signature         |
| `400`  | `User data is invalid`     | Malformed user data            |

---

## 📊 Analytics Dashboard

### `GET /api/data/dashboard`

Retrieves comprehensive analytics data for the admin dashboard.

#### 📥 Request

**Headers:**

```http
X-API-Key: your-secret-api-key
```

**Query Parameters:**

```
startDate: string (optional) - Start date (ISO format)
endDate: string (optional) - End date (ISO format)
days: number (optional) - Number of days (default: 7)
```

**Example:**

```http
GET /api/data/dashboard?days=30&startDate=2024-01-01&endDate=2024-01-31
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "data": {
      "dateRange": {
         "startDate": "2024-01-01T00:00:00.000Z",
         "endDate": "2024-01-31T23:59:59.999Z",
         "days": 31
      },
      "summary": {
         "totalOrders": 150,
         "totalRevenue": 2250.0,
         "averageOrderValue": 15.0,
         "packagesSold": 150,
         "totalTopups": 75,
         "topupRevenue": 1875.0,
         "averageTopupValue": 25.0,
         "orderSuccessRate": 95.33,
         "topupSuccessRate": 98.67
      },
      "dailyTopupData": [
         {
            "date": "2024-01-01",
            "amount": 125.0,
            "count": 5
         }
      ]
   }
}
```

**❌ Error Responses:**

| Status | Error                        | Description     |
| ------ | ---------------------------- | --------------- |
| `401`  | `Invalid or missing API key` | Invalid API key |
| `500`  | `Internal server error`      | Database error  |

---

## 📦 Admin Orders Management

### `GET /api/data/orders`

Retrieves paginated orders list with search and filtering capabilities.

#### 📥 Request

**Headers:**

```http
X-API-Key: your-secret-api-key
```

**Query Parameters:**

```
page: number (optional) - Page number (default: 1)
limit: number (optional) - Items per page (default: 10, max: 100)
search: string (optional) - Search term
status: string (optional) - Filter by status
```

**Example:**

```http
GET /api/data/orders?page=1&limit=20&search=Turkey&status=COMPLETED
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "data": [
      {
         "id": "order-123",
         "orderNo": "ORD-2024-001",
         "txId": "tx-abc123",
         "amount": 15.0,
         "status": "COMPLETED",
         "paymentMethod": "TON",
         "createdAt": "2024-01-15T10:30:00.000Z",
         "updatedAt": "2024-01-15T10:35:00.000Z",
         "user": {
            "name": "John Doe",
            "username": "johndoe"
         },
         "package": {
            "code": "TURKEY_5GB_30D",
            "name": "Turkey 5GB 30 Days",
            "countryCode": "TR"
         }
      }
   ],
   "pagination": {
      "page": 1,
      "limit": 20,
      "totalCount": 150,
      "totalPages": 8,
      "hasNextPage": true,
      "hasPrevPage": false
   },
   "summary": {
      "totalOrders": 150,
      "totalUsers": 120,
      "totalPackages": 25,
      "statusBreakdown": {
         "completed": 140,
         "pending": 8,
         "failed": 2
      }
   }
}
```

**❌ Error Responses:**

| Status | Error                             | Description         |
| ------ | --------------------------------- | ------------------- |
| `400`  | `Page must be greater than 0`     | Invalid page number |
| `400`  | `Limit must be between 1 and 100` | Invalid limit       |
| `401`  | `Invalid or missing API key`      | Invalid API key     |
| `500`  | `Internal server error`           | Database error      |

---

## 👥 Admin Users Management

### `GET /api/data/users`

Retrieves paginated users list with search capabilities.

#### 📥 Request

**Headers:**

```http
X-API-Key: your-secret-api-key
```

**Query Parameters:**

```
page: number (optional) - Page number (default: 1)
limit: number (optional) - Items per page (default: 10, max: 100)
search: string (optional) - Search term (username, fullName, telegramId)
```

**Example:**

```http
GET /api/data/users?page=1&limit=20&search=john
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "data": [
      {
         "id": "user-123",
         "telegramId": "123456789",
         "username": "johndoe",
         "fullName": "John Doe",
         "photoUrl": "https://example.com/photo.jpg",
         "languageCode": "en",
         "createdAt": "2024-01-01T00:00:00.000Z",
         "updatedAt": "2024-01-15T10:30:00.000Z",
         "balance": {
            "amount": 25.5
         }
      }
   ],
   "pagination": {
      "page": 1,
      "limit": 20,
      "totalCount": 120,
      "totalPages": 6,
      "hasNextPage": true,
      "hasPrevPage": false
   }
}
```

**❌ Error Responses:**

| Status | Error                             | Description         |
| ------ | --------------------------------- | ------------------- |
| `400`  | `Page must be greater than 0`     | Invalid page number |
| `400`  | `Limit must be between 1 and 100` | Invalid limit       |
| `401`  | `Invalid or missing API key`      | Invalid API key     |
| `500`  | `Internal server error`           | Database error      |

---

## 💰 Admin Topups Management

### `GET /api/data/topups`

Retrieves paginated topup transactions with comprehensive filtering.

#### 📥 Request

**Headers:**

```http
X-API-Key: your-secret-api-key
```

**Query Parameters:**

```
page: number (optional) - Page number (default: 1)
limit: number (optional) - Items per page (default: 10, max: 100)
status: string (optional) - Filter by status
paymentMethod: string (optional) - Filter by payment method
startDate: string (optional) - Start date filter
endDate: string (optional) - End date filter
telegramId: string (optional) - Filter by user
search: string (optional) - Search term
```

**Example:**

```http
GET /api/data/topups?page=1&limit=20&status=COMPLETED&paymentMethod=TON&startDate=2024-01-01
```

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "data": {
      "topups": [
         {
            "id": "topup-123",
            "referenceId": "TON-a1b2c3d4e5f6",
            "telegramId": "123456789",
            "user": {
               "id": "user-123",
               "telegramId": "123456789",
               "username": "johndoe",
               "fullName": "John Doe",
               "photoUrl": "https://example.com/photo.jpg",
               "languageCode": "en"
            },
            "payerEmail": "john@example.com",
            "amount": 25.0,
            "paymentMethod": "TON",
            "status": "COMPLETED",
            "paymentType": "TOPUP",
            "orderNo": "tx-abc123",
            "createdAt": "2024-01-15T10:30:00.000Z",
            "updatedAt": "2024-01-15T10:35:00.000Z"
         }
      ],
      "pagination": {
         "page": 1,
         "limit": 20,
         "totalCount": 75,
         "totalPages": 4,
         "hasNext": true,
         "hasPrev": false
      },
      "summary": {
         "totalTopups": 75,
         "totalRevenue": 1875.0,
         "successRate": 98.67,
         "averageTopupAmount": 25.0,
         "completedTopups": 74,
         "failedTopups": 1
      }
   }
}
```

**❌ Error Responses:**

| Status | Error                        | Description     |
| ------ | ---------------------------- | --------------- |
| `401`  | `Invalid or missing API key` | Invalid API key |
| `500`  | `Failed to fetch topup data` | Database error  |

---

## 🧹 Payment History Management

### `GET /api/payment-history/clear`

Clears all pending payment history records older than 12 hours. Useful for cleanup operations.

#### 📥 Request

No authentication required. Typically called by cron jobs or scheduled tasks.

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "message": "Pending payment history cleared",
   "deletedCount": 5,
   "deletedRecords": [
      {
         "id": "payment-123",
         "referenceId": "TON-a1b2c3d4e5f6",
         "createdAt": "2024-01-15T10:30:00.000Z"
      }
   ]
}
```

**❌ Error Responses:**

| Status | Error                              | Description           |
| ------ | ---------------------------------- | --------------------- |
| `500`  | `Failed to clear pending payments` | Database error         |

---

### `GET /api/payment-history/remind`

Sends Telegram reminders to users with pending payments older than 1 hour. Useful for automated payment reminders.

#### 📥 Request

No authentication required. Typically called by cron jobs or scheduled tasks.

#### 📤 Response

**✅ Success (200):**

```json
{
   "success": true,
   "message": "Payment reminders sent",
   "totalPending": 10,
   "remindersSent": 8,
   "remindersFailed": 2,
   "results": [
      {
         "success": true,
         "paymentId": "payment-123",
         "referenceId": "STARS-a1b2c3d4e5f6",
         "telegramId": "123456789"
      },
      {
         "success": false,
         "paymentId": "payment-124",
         "referenceId": "TON-b2c3d4e5f6g7",
         "telegramId": "987654321",
         "error": "Invalid telegramId"
      }
   ]
}
```

**❌ Error Responses:**

| Status | Error                              | Description           |
| ------ | ---------------------------------- | --------------------- |
| `500`  | `Failed to send payment reminders` | Telegram API error    |

**Note:** Reminders are sent for pending payments where:
- `status = "PENDING"`
- `createdAt` is older than 1 hour
- Payment type is `ORDER` or `TOPUP`

---

## 🏗️ Data Models

### UserData Interface

```typescript
interface UserData {
   id: number;
   first_name: string;
   last_name?: string;
   username?: string;
   is_premium?: boolean;
   photo_url?: string;
}
```

### Payment History

```typescript
interface PaymentHistory {
   id: string;
   telegramId: string;
   amount: number; // USD amount
   paymentMethod: string; // "TON" | "PAYPAL" | "STARS"
   status: "PENDING" | "COMPLETED" | "FAILED";
   paymentType: "TOPUP" | "ORDER"; // ORDER for eSIM purchases
   referenceId: string; // Unique transaction ID
   orderNo?: string; // Blockchain transaction hash or payment ID
   packageCode: string; // Package code for ORDER type payments (default: "-" for TOPUP)
   userId: string;
   createdAt: Date;
   updatedAt: Date;
}
```

**Note:** The `packageCode` field is automatically set when initializing ORDER type payments. This allows the system to retrieve package information for pending transactions and display them in the orders list.

### TON History

```typescript
interface TonHistory {
   id: string;
   hash: string; // Transaction hash
   nanoTon: number; // Amount in nanoTON
   senderAddress: string; // Sender wallet address
   createdAt: Date;
}
```

### Order Interface

```typescript
interface Order {
   id: string;
   orderNo: string;
   country: string;
   flag: string;
   plan: string;
   price: number;
   status: string;
   orderDate: string;
   activationDate: string;
   paymentMethod: string;
   color: string;
   txId?: string;
   esims: ESIM[];
}
```

### ESIM Interface

```typescript
interface ESIM {
   id: string;
   iccid: string;
   imsi: string;
   ac: string;
   status: string;
   remainingData: number;
   remainingDataFormatted: {
      value: number;
      unit: string;
   };
   expiredAt: Date;
}
```

### Package Interface

```typescript
interface Package {
   id: string;
   code: string;
   name: string;
   price: number;
   duration: number;
   durationUnit: string;
   dataAmount: number;
   dataUnit: string;
   region: {
      id: string;
      name: string;
      code: string;
   };
}
```

### User Interface

```typescript
interface User {
   id: string;
   telegramId: string;
   username: string;
   fullName: string;
   photoUrl: string;
   languageCode: string;
   balance: {
      amount: number;
   };
   createdAt: Date;
   updatedAt: Date;
}
```

---

## 🔧 Configuration

### Environment Variables

```bash
# Required
BOT_KEY=your_telegram_bot_token
NEXT_PUBLIC_TON_RECIPIENT_ADDRESS=your_ton_wallet_address
DATABASE_URL=your_database_connection_string

# Telegram Stars configuration
STARS_RATE=0.018  # 1 Star = $0.018 USD

# Upstash Redis (for TON price caching)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Optional
DATA_API_KEY=your_data_api_key
```

### External APIs

-  **CoinGecko**: `https://api.coingecko.com/api/v3/simple/price` (TON price conversion)
-  **TonCenter**: `https://testnet.toncenter.com/api/v2/getTransactions` (TON transaction verification)
-  **Telegram Bot API**: `https://api.telegram.org/bot{token}/createInvoiceLink` (Telegram Stars payments)

### Caching System

The application uses **Upstash Redis** for caching TON prices to improve performance and reduce API calls:

-  **Cache Duration**: 5 minutes (300 seconds)
-  **Cache Key**: `ton_price_usd`
-  **Fallback Strategy**: If Redis fails, falls back to direct API calls
-  **Stale Data Handling**: Uses cached data even if expired when Redis is unavailable

**Benefits:**

-  ✅ Reduced CoinGecko API calls
-  ✅ Faster response times
-  ✅ Better reliability with fallback mechanisms
-  ✅ Automatic cache invalidation

---

## 🛡️ Security Features

### Authentication

-  ✅ **HMAC-SHA256** validation for Telegram data
-  ✅ **Time-based** authentication (20-second window)
-  ✅ **Address validation** using @ton/core

### Transaction Security

-  ✅ **Duplicate prevention** via transaction hash checking
-  ✅ **Amount tolerance** verification (max 3% variance)
-  ✅ **Address verification** for sender/recipient
-  ✅ **Reference matching** between blockchain and database
-  ✅ **eSIM ordering validation** with automatic rollback on failure

---

## 📊 Error Handling

### HTTP Status Codes

| Code  | Meaning      | When Used                  |
| ----- | ------------ | -------------------------- |
| `200` | Success      | Transaction completed      |
| `400` | Bad Request  | Invalid parameters/data    |
| `401` | Unauthorized | Invalid Telegram auth      |
| `404` | Not Found    | User/payment not found     |
| `500` | Server Error | Internal/blockchain errors |

### Common Error Scenarios

#### 🔐 Authentication Errors

```json
// Missing Telegram data
{
  "message": "Telegram data not found"
}

// Invalid signature
{
  "message": "Telegram data is invalid"
}

// Expired data
{
  "message": "User data is invalid"
}
```

#### 💰 Payment Errors

```json
// User not found
{
  "message": "User not found"
}

// Amount mismatch
{
  "success": false,
  "message": "Ton transaction verification failed, amount is not correct"
}

// Duplicate transaction
{
  "error": "Ton history already exists"
}

// eSIM ordering failure
{
  "success": false,
  "error": "Failed to order eSIM",
  "message": "Package not available"
}
```

---

## 🧪 Testing Examples

### 1. Initialize Payment

```bash
# TON topup payment
curl -X POST /api/init-payment \
  -H "Content-Type: application/json" \
  -H "X-Telegram-Data: user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123" \
  -d '{
    "amount": 25.00,
    "paymentMethod": "TON",
    "type": "TOPUP"
  }'

# Telegram Stars eSIM purchase
curl -X POST /api/init-payment \
  -H "Content-Type: application/json" \
  -H "X-Telegram-Data: user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123" \
  -d '{
    "amount": 15.00,
    "paymentMethod": "STARS",
    "type": "ORDER",
    "sku": "TURKEY_5GB_30D"
  }'
```

### 2. Verify TON Transaction (Topup)

```bash
curl "https://yourapp.com/api/verify-ton?senderAddress=EQD0vdSA_NedR9uvnh89L0SfS8O5YV4cF1Tzn8k3BYOj8k5v"
```

### 3. Verify TON Transaction (eSIM Purchase)

```bash
curl "https://yourapp.com/api/verify-ton?senderAddress=EQD0vdSA_NedR9uvnh89L0SfS8O5YV4cF1Tzn8k3BYOj8k5v&sku=TURKEY_5GB_30D"
```

### 4. Get User Balance

```bash
curl -X GET /api/balance \
  -H "X-Telegram-Data: user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123"
```

### 5. Get User Orders (with pagination)

```bash
# Get first page
curl -X GET "/api/orders?page=1&limit=5" \
  -H "X-Telegram-Data: user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123"

# Get second page
curl -X GET "/api/orders?page=2&limit=5" \
  -H "X-Telegram-Data: user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123"
```

### 6. Get Transaction Details

```bash
curl -X GET /api/transaction-detail?id=tx-abc123 \
  -H "X-Telegram-Data: user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123"
```

### 7. Get Available Packages

```bash
curl "https://yourapp.com/api/package?locationCode=TR"
```

### 8. Initialize User

```bash
curl -X POST /api/init-user \
  -H "Content-Type: application/json" \
  -H "X-Telegram-Data: user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123"
```

### 9. Get Analytics Dashboard

```bash
curl -X GET /api/data/dashboard \
  -H "X-API-Key: your-secret-api-key" \
  -G -d "days=30" -d "startDate=2024-01-01" -d "endDate=2024-01-31"
```

### 10. Get Admin Orders

```bash
curl -X GET /api/data/orders \
  -H "X-API-Key: your-secret-api-key" \
  -G -d "page=1" -d "limit=20" -d "search=Turkey" -d "status=COMPLETED"
```

### 11. Get Admin Users

```bash
curl -X GET /api/data/users \
  -H "X-API-Key: your-secret-api-key" \
  -G -d "page=1" -d "limit=20" -d "search=john"
```

### 12. Get Admin Topups

```bash
curl -X GET /api/data/topups \
  -H "X-API-Key: your-secret-api-key" \
  -G -d "page=1" -d "limit=20" -d "status=COMPLETED" -d "paymentMethod=TON"
```

### 13. Clear Old Pending Payments

```bash
curl -X GET /api/payment-history/clear
```

### 14. Send Payment Reminders

```bash
curl -X GET /api/payment-history/remind
```

### 15. Mock Telegram Data

```javascript
const mockTelegramData = {
   user: JSON.stringify({
      id: 123456789,
      first_name: "John",
      last_name: "Doe",
      username: "johndoe",
   }),
   auth_date: Math.floor(Date.now() / 1000),
   hash: "calculated_hmac_hash",
};
```

---

## 📈 Performance Notes

### Rate Limits

-  **CoinGecko API**: No official limits (be respectful)
-  **TonCenter API**: No official limits
-  **Database**: Managed by Drizzle ORM with connection pooling

### Optimization Tips

-  ✅ Use connection pooling for database
-  ✅ Cache TON prices for short periods
-  ✅ Implement retry logic for blockchain calls
-  ✅ Log all API calls for monitoring

---

## 🔍 Monitoring & Debugging

### Key Metrics to Monitor

-  Payment initialization success rate
-  TON verification success rate
-  Average response times
-  Blockchain API availability
-  Database connection health

### Debug Headers

```http
X-Request-ID: unique-request-id
X-User-ID: telegram-user-id
X-Payment-Ref: reference-id
```

---

## 📚 Additional Resources

-  [Telegram Web Apps Documentation](https://core.telegram.org/bots/webapps)
-  [TON Blockchain Documentation](https://ton.org/docs/)
-  [CoinGecko API Documentation](https://www.coingecko.com/en/api)
-  [Drizzle ORM Documentation](https://orm.drizzle.team/)

---

## 🤝 Support

For API support or questions:

-  📧 Email: support@yourapp.com
-  📱 Telegram: @yourapp_support
-  🐛 Issues: GitHub Issues

---

_Last updated: $(date)_
_API Version: 1.0.0_
