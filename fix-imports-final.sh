#!/bin/bash

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
    echo "Fixing $file"
    
    # Hapus baris yang hanya berisi koma
    sed -i '/^[[:space:]]*,[[:space:]]*$/d' "$file"
    
    # Hapus koma di akhir import
    sed -i 's/,[[:space:]]*}/}/g' "$file"
    
    # Hapus koma dobel
    sed -i 's/,,/,/g' "$file"
    
    # Pastikan tidak ada koma setelah kurung buka
    sed -i 's/{\s*,/{/g' "$file"
    
    echo "Fixed $file"
  fi
done

echo "Semua file sudah di-fix!"
