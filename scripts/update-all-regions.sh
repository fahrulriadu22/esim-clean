#!/bin/bash

echo "🌍 Updating packages for all regions..."

# Asia
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "ID"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "SG"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "TH"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "MY"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "VN"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "JP"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "KR"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "CN"}'

# Americas
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "US"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "CA"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "BR"}'

# Europe
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "GB"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "FR"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "DE"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "IT"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "ES"}'
curl -X POST http://localhost:3000/api/cron -H "Content-Type: application/json" -d '{"type": "update-package", "regionCode": "EU-30"}'

echo "✅ All regions updated!"
