# Scripts

This directory contains utility scripts for the eSIM application.

## Admin Account Creation

### Prerequisites

Before running the admin creation script, make sure you have:

1. **bcrypt installed**: Run `npm install bcrypt @types/bcrypt` (or `yarn add bcrypt @types/bcrypt`)
2. **Database connection**: Ensure your `DATABASE_URL` environment variable is set
3. **Database schema synced**: Run `npx drizzle-kit push` if you haven't already

### Usage

#### Interactive Mode (Recommended)

Run the script without arguments to enter interactive mode:

```bash
npm run create-admin
```

This will prompt you for:

-  Admin full name
-  Username (must be unique)
-  Password (will be hashed with bcrypt)
-  Password confirmation
-  Role selection (SUPER_ADMIN or ADMIN)

#### Command Line Mode

You can also create an admin account directly from the command line:

```bash
npm run create-admin "John Doe" "admin" "password123" "ADMIN"
```

Parameters:

1. Full name (required)
2. Username (required, must be unique)
3. Password (required, will be hashed)
4. Role (optional, defaults to "ADMIN" if not specified)

Available roles:

-  `SUPER_ADMIN`: Full administrative access
-  `ADMIN`: Standard administrative access

### Security Features

-  **Password Hashing**: All passwords are hashed using bcrypt with 12 salt rounds
-  **Username Uniqueness**: The script checks for existing usernames before creation
-  **Input Validation**: All required fields are validated
-  **Secure Output**: Passwords are never displayed in the output

### Example Output

```
🔐 Admin Account Creation Script
================================

Enter admin full name: John Doe
Enter username: admin
Enter password: [hidden]
Confirm password: [hidden]
Select role (1: SUPER_ADMIN, 2: ADMIN): 1

🔒 Hashing password...
💾 Creating admin account...

✅ Admin account created successfully!
=====================================
ID: 123e4567-e89b-12d3-a456-426614174000
Name: John Doe
Username: admin
Role: SUPER_ADMIN
Created: 2024-01-15T10:30:00.000Z

⚠️  Please keep the credentials secure!
```

### Troubleshooting

-  **"Admin with username already exists"**: Choose a different username
-  **"Name is required"**: Provide a non-empty name
-  **"Passwords do not match"**: Ensure both password entries are identical
-  **Database connection errors**: Check your `DATABASE_URL` environment variable

## update-all-packages.js

This script iterates through all regions in the database and calls the `/api/cron` endpoint to update packages for each region.

### Usage

1. Make sure your Next.js development server is running:

   ```bash
   npm run dev
   ```

2. Run the script:

   ```bash
   npm run update-packages
   ```

   Or run it directly:

   ```bash
   node scripts/update-all-packages.js
   ```

### What it does

1. Connects to the database using Drizzle ORM
2. Fetches all regions from the `Region` table
3. For each region, makes a POST request to `http://localhost:3000/api/cron` with:
   ```json
   {
      "type": "update-package",
      "regionCode": "REGION_CODE"
   }
   ```
4. Displays progress and results for each region
5. Provides a summary of successful and failed updates
6. Includes a 1-second delay between requests to avoid overwhelming the API

### Output

The script provides detailed console output showing:

-  Progress for each region being processed
-  Success/failure status for each region
-  Number of packages updated for each region
-  Final summary with total counts

### Error Handling

-  Individual region failures don't stop the entire process
-  All errors are logged with details
-  The script continues processing remaining regions even if some fail
-  Final summary includes details of any failed regions
