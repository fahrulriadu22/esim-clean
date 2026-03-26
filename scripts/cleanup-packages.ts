#!/usr/bin/env tsx

/**
 * Package Cleanup Script
 *
 * This script removes all packages from the database that don't match
 * the allowed plan combinations defined in app/api/package/route.ts
 *
 * Usage:
 *   npm run cleanup-packages
 *   or
 *   tsx scripts/cleanup-packages.ts
 */

import { db } from "@/database/drizzle";
import { packageTable, region } from "@/database/schema";
import { eq, and, notInArray } from "drizzle-orm";

// Define the allowed plan combinations (copied from route.ts)
const ALLOWED_PLANS = [
   { data: "1", duration: 7, durationUnit: "DAY", margin: 300 },
   { data: "3", duration: 15, durationUnit: "DAY", margin: 223 },
   { data: "5", duration: 30, durationUnit: "DAY", margin: 141 },
   { data: "10", duration: 30, durationUnit: "DAY", margin: 130 },
   { data: "20", duration: 30, durationUnit: "DAY", margin: 130 },
];

async function cleanupPackages() {
   console.log("🧹 Starting package cleanup...");
   console.log("📋 Allowed plan combinations:");
   ALLOWED_PLANS.forEach((plan) => {
      console.log(
         `   - ${plan.data}GB for ${plan.duration} ${plan.durationUnit} (${plan.margin}% margin)`
      );
   });
   console.log();

   try {
      // First, get all packages with their region information
      const allPackages = await db
         .select({
            id: packageTable.id,
            name: packageTable.name,
            code: packageTable.code,
            duration: packageTable.duration,
            durationUnit: packageTable.durationUnit,
            data: packageTable.data,
            dataUnit: packageTable.dataUnit,
            price: packageTable.price,
            regionId: packageTable.regionId,
            region: {
               id: region.id,
               name: region.name,
               code: region.code,
            },
         })
         .from(packageTable)
         .leftJoin(region, eq(packageTable.regionId, region.id));

      console.log(`📊 Total packages found: ${allPackages.length}`);

      // Identify packages to keep (matching allowed plans)
      const packagesToKeep = allPackages.filter((pkg) => {
         // Exclude packages with "nonhkip" in the name
         if (pkg.name.toLowerCase().includes("nonhkip")) {
            return false;
         }

         // Only include packages matching the allowed plan combinations
         return ALLOWED_PLANS.some((allowedPlan) => {
            return (
               pkg.data === allowedPlan.data &&
               pkg.duration === allowedPlan.duration &&
               pkg.durationUnit === allowedPlan.durationUnit
            );
         });
      });

      // Identify packages to remove
      const packagesToRemove = allPackages.filter((pkg) => {
         // Include packages with "nonhkip" in the name
         if (pkg.name.toLowerCase().includes("nonhkip")) {
            return true;
         }

         // Include packages that don't match any allowed plan combination
         return !ALLOWED_PLANS.some((allowedPlan) => {
            return (
               pkg.data === allowedPlan.data &&
               pkg.duration === allowedPlan.duration &&
               pkg.durationUnit === allowedPlan.durationUnit
            );
         });
      });

      console.log(`✅ Packages to keep: ${packagesToKeep.length}`);
      console.log(`❌ Packages to remove: ${packagesToRemove.length}`);

      if (packagesToRemove.length === 0) {
         console.log(
            "🎉 No packages need to be removed. Database is already clean!"
         );
         return;
      }

      // Show packages that will be removed
      console.log("\n📋 Packages to be removed:");
      packagesToRemove.forEach((pkg, index) => {
         console.log(
            `   ${index + 1}. ${pkg.name} (${pkg.data}${pkg.dataUnit} / ${
               pkg.duration
            } ${pkg.durationUnit}) - ${pkg.region?.name || "Unknown Region"}`
         );
      });

      // Get package IDs to keep
      const packageIdsToKeep = packagesToKeep.map((pkg) => pkg.id);

      // Remove packages (delete all packages NOT in the keep list)
      console.log("\n🗑️  Removing packages...");
      const deleteResult = await db
         .delete(packageTable)
         .where(notInArray(packageTable.id, packageIdsToKeep));

      console.log(
         `✅ Successfully removed ${packagesToRemove.length} packages`
      );
      console.log(`📊 Remaining packages: ${packagesToKeep.length}`);

      // Show summary by region
      console.log("\n📊 Summary by region:");
      const regionSummary = packagesToKeep.reduce((acc, pkg) => {
         const regionName = pkg.region?.name || "Unknown";
         acc[regionName] = (acc[regionName] || 0) + 1;
         return acc;
      }, {} as Record<string, number>);

      Object.entries(regionSummary).forEach(([region, count]) => {
         console.log(`   ${region}: ${count} packages`);
      });
   } catch (error) {
      console.error("❌ Error during package cleanup:", error);
      throw error;
   }
}

// Run the cleanup
if (require.main === module) {
   cleanupPackages()
      .then(() => {
         console.log("\n🎉 Package cleanup completed successfully!");
         process.exit(0);
      })
      .catch((error) => {
         console.error("\n💥 Package cleanup failed:", error);
         process.exit(1);
      });
}

export { cleanupPackages };
