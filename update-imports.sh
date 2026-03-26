#!/bin/bash

# Daftar file yang perlu diupdate
FILES=(
  "app/api/esims/route.ts"
  "app/api/init-payment/route.ts"
  "app/api/init-user/route.ts"
  "app/api/order/route.ts"
  "app/api/orders/route.ts"
  "app/api/package/route.ts"
  "app/api/payment-history/complete/route.ts"
  "app/api/region-packages/route.ts"
  "app/api/topup-history/route.ts"
  "app/api/transaction-detail/route.ts"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file"
    # Ganti import dari utils ke crypto-utils
    sed -i 's/import { verifyTelegramWebAppData } from "@\/lib\/utils";/import { verifyTelegramWebAppData } from "@\/lib\/crypto-utils";/g' "$file"
    sed -i 's/import { verifyTelegramWebAppData, /import { /g' "$file" # Untuk case import multiple
    sed -i 's/, verifyTelegramWebAppData }/ }/g' "$file" # Untuk case import multiple
  else
    echo "File $file not found"
  fi
done

echo "Done!"
