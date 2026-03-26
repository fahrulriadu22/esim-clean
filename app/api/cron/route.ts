import { NextRequest, NextResponse } from "next/server";

// PENTING: Force dynamic route dan nodejs runtime
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Deteksi build time
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

export async function POST(request: NextRequest) {
   // Skip semua proses saat build time
   if (isBuildTime) {
      return NextResponse.json({ 
         success: true, 
         message: "Build time placeholder" 
      });
   }

   try {
      // Import semua dependencies secara dynamic ONLY saat runtime
      const { makeAuthenticatedRequest } = await import('@/utils/esim-api');
      const { db } = await import('@/database/drizzle');
      const { region, subRegion, packageTable } = await import('@/database/schema');
      const { eq, inArray, and, not } = await import('drizzle-orm');
      const { sql } = await import('drizzle-orm');

      const body = await request.json();
      console.log('📦 Cron received type:', body?.type);

      // ============================================
      // CASE 1: SYNC DARI ADMIN DASHBOARD (PAKET CUSTOM)
      // ============================================
      if (body?.type === "update-package" && body?.packages) {
         console.log(`📦 Received ${body.packages.length} packages from admin dashboard`);
         
         // ============================================
         // STEP 1: HAPUS PACKAGES YANG TIDAK ADA DI LIST BARU
         // ============================================
         const regionCodes = [...new Set(body.packages.map((p: any) => p.regionCode))];
         console.log(`📋 Regions in sync: ${regionCodes.join(', ')}`);
         
         for (const regionCode of regionCodes) {
            const regionRecord = await db
               .select()
               .from(region)
               .where(eq(region.code, regionCode))
               .limit(1);
            
            if (regionRecord.length > 0) {
               const regionId = regionRecord[0].id;
               const newPackageCodes = body.packages
                  .filter((p: any) => p.regionCode === regionCode)
                  .map((p: any) => p.packageCode);
               
               if (newPackageCodes.length > 0) {
                  await db
                     .delete(packageTable)
                     .where(
                        and(
                           eq(packageTable.regionId, regionId),
                           not(inArray(packageTable.code, newPackageCodes))
                        )
                     );
                  console.log(`🗑 Deleted old packages for ${regionCode}`);
               } else {
                  await db
                     .delete(packageTable)
                     .where(eq(packageTable.regionId, regionId));
                  console.log(`🗑 Deleted ALL packages for ${regionCode} (region removed)`);
               }
            }
         }

         // ============================================
         // STEP 1.5: HAPUS REGIONS YANG TIDAK ADA DI LIST BARU
         // ============================================
         const allRegionsInDb = await db.select().from(region);
         const allRegionCodesInDb = allRegionsInDb.map(r => r.code);
         const regionsToDelete = allRegionCodesInDb.filter(code => !regionCodes.includes(code));

         if (regionsToDelete.length > 0) {
            console.log(`🗑 Regions to delete (no packages from admin): ${regionsToDelete.join(', ')}`);

            for (const regionCode of regionsToDelete) {
               const regionRecord = await db
                  .select()
                  .from(region)
                  .where(eq(region.code, regionCode))
                  .limit(1);

               if (regionRecord.length > 0) {
                  const regionId = regionRecord[0].id;
                  await db.delete(packageTable).where(eq(packageTable.regionId, regionId));
                  console.log(`   🗑 Deleted all packages for ${regionCode}`);
               }
            }
         }
         
         // ============================================
         // STEP 2: INSERT/UPDATE PACKAGES BARU
         // ============================================
         const packagesToInsert = [];
         const packagesToUpdate = [];
         const newPackageCodes = [];

         const existingRegions = await db
            .select()
            .from(region)
            .where(inArray(region.code, regionCodes));

         const regionMap = new Map(existingRegions.map(r => [r.code, r]));

         for (const pkg of body.packages) {
            let regionId = regionMap.get(pkg.regionCode)?.id;
            
            if (!regionId) {
               const newRegion = await db
                  .insert(region)
                  .values({
                     name: pkg.regionName,
                     code: pkg.regionCode,
                  })
                  .returning();
               regionId = newRegion[0].id;
               regionMap.set(pkg.regionCode, newRegion[0]);
            }

            const existingPackage = await db
               .select()
               .from(packageTable)
               .where(eq(packageTable.code, pkg.packageCode))
               .limit(1);

            const packageData = {
               name: pkg.name,
               duration: pkg.duration,
               durationUnit: pkg.durationUnit,
               price: pkg.price,
               data: pkg.data.toString(),
               dataUnit: pkg.dataUnit,
               pricePerData: pkg.data > 0 ? pkg.price / pkg.data : 0,
               isActive: pkg.isActive ?? true,
               isBestSeller: pkg.isBestSeller ?? false,
               fakePrice: pkg.fakePrice || null,
               regionId: regionId,
            };

            if (existingPackage.length > 0) {
               packagesToUpdate.push({
                  ...packageData,
                  id: existingPackage[0].id,
                  code: pkg.packageCode,
               });
            } else {
               packagesToInsert.push({
                  ...packageData,
                  code: pkg.packageCode,
               });
               newPackageCodes.push(pkg.packageCode);
            }
         }

         // ============================================
         // EXECUTE UPDATES
         // ============================================
         console.log(`📦 Processing ${packagesToUpdate.length} updates...`);

         for (const pkg of packagesToUpdate) {
            await db.execute(
               sql`
                  UPDATE "Package" 
                  SET 
                     name = ${pkg.name},
                     duration = ${pkg.duration},
                     "durationUnit" = ${pkg.durationUnit},
                     price = ${pkg.price},
                     data = ${pkg.data},
                     "dataUnit" = ${pkg.dataUnit},
                     "pricePerData" = ${pkg.pricePerData},
                     "isActive" = ${pkg.isActive},
                     "isBestSeller" = ${pkg.isBestSeller},
                     "fakePrice" = ${pkg.fakePrice}
                  WHERE id = ${pkg.id}
               `
            );
            
            console.log(`✅ Updated ${pkg.code}`);
         }

         if (packagesToInsert.length > 0) {
            console.log(`📦 Inserting ${packagesToInsert.length} new packages...`);
            
            for (const pkg of packagesToInsert) {
               await db.execute(
                  sql`
                     INSERT INTO "Package" (
                        id, code, name, duration, "durationUnit", price, 
                        data, "dataUnit", "pricePerData", "isActive", 
                        "isBestSeller", "fakePrice", "regionId"
                     ) VALUES (
                        gen_random_uuid(), ${pkg.code}, ${pkg.name}, ${pkg.duration}, 
                        ${pkg.durationUnit}, ${pkg.price}, ${pkg.data}, 
                        ${pkg.dataUnit}, ${pkg.pricePerData}, ${pkg.isActive}, 
                        ${pkg.isBestSeller}, ${pkg.fakePrice}, ${pkg.regionId}
                     )
                  `
               );
            }
         }

         return NextResponse.json({ 
            success: true, 
            message: `Synced ${packagesToInsert.length} new, updated ${packagesToUpdate.length} packages`,
            data: {
               inserted: packagesToInsert.length,
               updated: packagesToUpdate.length,
               total: packagesToInsert.length + packagesToUpdate.length,
               regions: regionCodes.length
            }
         });
      }

      // ============================================
      // CASE 2: UPDATE LOCATION DARI ESIM API
      // ============================================
      if (body?.type === "update-location") {
         await updateLocation(db, region, subRegion, makeAuthenticatedRequest);
         return NextResponse.json({ 
            success: true, 
            message: "Locations updated" 
         });
      }

      // ============================================
      // CASE 3: UPDATE PACKAGE DARI ESIM API (via regionCode)
      // ============================================
      if (body?.type === "update-package" && body?.regionCode) {
         const packages = await updatePackage(body.regionCode, db, region, packageTable, makeAuthenticatedRequest);
         return NextResponse.json({
            success: true,
            message: "Packages updated",
            data: packages,
         });
      }

      return NextResponse.json({ 
         success: false, 
         error: "Unknown type or missing data" 
      }, { status: 400 });

   } catch (error: any) {
      console.error('❌ Cron error:', error);
      return NextResponse.json({ 
         success: false, 
         error: error.message 
      }, { status: 500 });
   }
}

// ============================================
// FUNGSI UPDATE LOCATION (dipisah biar gak ke-load di build time)
// ============================================
async function updateLocation(db: any, region: any, subRegion: any, makeAuthenticatedRequest: any) {
   const response = await makeAuthenticatedRequest(
      "https://api.esimaccess.com/api/v1/open/location/list",
      {}
   );

   for (const location of response.obj?.locationList || []) {
      const existingRegion = await db
         .select()
         .from(region)
         .where(eq(region.code, location.code))
         .limit(1);

      if (existingRegion.length > 0) {
         continue;
      }

      const createdRegion = await db
         .insert(region)
         .values({
            name: location.name,
            code: location.code,
         })
         .returning();

      if (location.subLocationList && location.subLocationList.length > 0) {
         await db.insert(subRegion).values(
            location.subLocationList.map((subRegionData: any) => ({
               name: subRegionData.name,
               code: subRegionData.code,
               regionId: createdRegion[0].id,
            }))
         );
      }
   }
}

// ============================================
// FUNGSI UPDATE PACKAGE (dipisah biar gak ke-load di build time)
// ============================================
async function updatePackage(regionCode: string, db: any, region: any, packageTable: any, makeAuthenticatedRequest: any) {
   console.log(`🔄 Fetching packages for region: ${regionCode}`);
   
   const response = await makeAuthenticatedRequest(
      "https://api.esimaccess.com/api/v1/open/package/list",
      {
         locationCode: regionCode,
      }
   );

   const regionRecord = await db
      .select()
      .from(region)
      .where(eq(region.code, regionCode))
      .limit(1);

   if (regionRecord.length === 0) {
      console.log(`❌ Region ${regionCode} not found in database`);
      return;
   }

   const regionData = regionRecord[0];
   const packageList = response.obj?.packageList || [];

   if (packageList.length === 0) {
      console.log(`📦 No packages found for ${regionCode}`);
      return [];
   }

   console.log(`📦 Found ${packageList.length} packages for ${regionCode} from eSIM API`);

   const usdRate = await getUSDRate();
   const packageCodes = packageList.map((pkg: any) => pkg.packageCode);
   const existingPackages = await db
      .select()
      .from(packageTable)
      .where(inArray(packageTable.code, packageCodes));

   const existingPackageMap = new Map(
      existingPackages.map((pkg: any) => [pkg.code, pkg])
   );

   const packagesToUpdate: any[] = [];
   const packagesToInsert: any[] = [];
   const newPackageCodes: string[] = [];

   for (const result of packageList) {
      const price = result.retailPrice / usdRate;
      const basePrice = (Math.ceil(price * 10) / 10).toFixed(2);

      const match = result.name.match(/(\d+(?:\.\d+)?)\s*(GB|MB)/i);
      const data = match ? match[1] : "";
      const duration = result.duration;
      const durationUnit = result.durationUnit;
      
      if (result.name.toLowerCase().includes("nonhkip")) {
         continue;
      }

      const pricePerData = (
         parseFloat(basePrice) / (match ? parseFloat(match[1]) : 1)
      ).toFixed(2);

      const packageData = {
         name: result.name,
         duration: result.duration,
         durationUnit: result.durationUnit,
         price: parseFloat(basePrice),
         data: data,
         dataUnit: match ? match[2].toUpperCase() : "",
         pricePerData: parseFloat(pricePerData),
         isActive: true,
         isBestSeller: false,
         fakePrice: null,
      };

      const existingPackage = existingPackageMap.get(result.packageCode);

      if (existingPackage) {
         packagesToUpdate.push({
            ...packageData,
            id: existingPackage.id,
         });
      } else {
         packagesToInsert.push({
            ...packageData,
            code: result.packageCode,
            regionId: regionData.id,
         });
         newPackageCodes.push(result.packageCode);
      }
   }

   console.log(`📦 Processing: ${packagesToInsert.length} new, ${packagesToUpdate.length} updates for ${regionCode}`);

   for (const pkg of packagesToUpdate) {
      await db
         .update(packageTable)
         .set({
            name: pkg.name,
            duration: pkg.duration,
            durationUnit: pkg.durationUnit,
            price: pkg.price,
            data: pkg.data,
            dataUnit: pkg.dataUnit,
            pricePerData: pkg.pricePerData,
            isActive: pkg.isActive,
            isBestSeller: pkg.isBestSeller,
            fakePrice: pkg.fakePrice,
         })
         .where(eq(packageTable.id, pkg.id));
   }

   if (packagesToInsert.length > 0) {
      await db.insert(packageTable).values(packagesToInsert);
   }

   console.log(`✅ Completed update for ${regionCode}`);
   return newPackageCodes;
}

// ============================================
// FUNGSI GET USD RATE
// ============================================
async function getUSDRate() {
   const response = await fetch(
      "https://v6.exchangerate-api.com/v6/ceb0b73fdbdbb7854a766621/pair/USD/IDR"
   );
   const data = await response.json();
   return data.conversion_rate;
}
