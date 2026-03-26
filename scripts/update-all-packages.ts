import { db } from "@/database/drizzle";
import { region } from "@/database/schema";

async function updateAllPackages() {
   try {
      console.log("🚀 Starting package update process for all regions...");
      const startTime = Date.now();

      // Fetch all regions from the database
      console.log("📋 Fetching regions from database...");
      const regions = await db
         .select({
            id: region.id,
            name: region.name,
            code: region.code,
         })
         .from(region);

      console.log(
         `✅ Found ${regions.length} regions to process:`,
         regions.map((r) => `${r.name} (${r.code})`).join(", ")
      );

      const results = [];
      let successCount = 0;
      let errorCount = 0;

      // Iterate through each region
      for (let i = 0; i < regions.length; i++) {
         const region = regions[i];
         console.log(
            `\n🔄 Processing region ${i + 1}/${regions.length}: ${
               region.name
            } (${region.code})`
         );

         try {
            console.log(
               `📡 Making API request to update packages for region ${region.code}...`
            );
            // Make HTTP request to the API endpoint
            const response = await fetch("http://localhost:3000/api/cron", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  type: "update-package",
                  regionCode: region.code,
               }),
            });

            if (!response.ok) {
               console.log(
                  `❌ API request failed for ${region.code}: HTTP ${response.status}`
               );
               throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(`✅ API request successful for ${region.code}`);

            if (result.data && result.data.length > 0) {
               console.log(
                  `📦 Updated ${result.data.length} packages for ${region.code}:`,
                  result.data
                     .map((pkg: any) => `${pkg.name || pkg.id || "Unknown"}`)
                     .join(", ")
               );
            } else {
               console.log(`ℹ️  No packages updated for ${region.code}`);
            }

            results.push({
               region: region.name,
               code: region.code,
               status: "success",
               packages: result.data || [],
            });

            successCount++;
            console.log(
               `✅ Successfully processed ${region.name} (${region.code})`
            );

            // Add a small delay to avoid overwhelming the API
            console.log(`⏳ Waiting 1 second before next request...`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
         } catch (error) {
            console.log(
               `❌ Error processing region ${region.name} (${region.code}):`,
               error instanceof Error ? error.message : String(error)
            );

            if (error instanceof Error && error.stack) {
               console.log(`🔍 Error stack trace:`, error.stack);
            }

            results.push({
               region: region.name,
               code: region.code,
               status: "error",
               error: error instanceof Error ? error.message : String(error),
            });

            errorCount++;
            console.log(
               `⚠️  Failed to process ${region.name} (${region.code})`
            );
         }
      }

      // Print comprehensive summary
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      console.log(`\n📊 ===== PACKAGE UPDATE SUMMARY =====`);
      console.log(`⏱️  Total execution time: ${duration} seconds`);
      console.log(`📈 Total regions processed: ${regions.length}`);
      console.log(`✅ Successful updates: ${successCount}`);
      console.log(`❌ Failed updates: ${errorCount}`);
      console.log(
         `📊 Success rate: ${((successCount / regions.length) * 100).toFixed(
            1
         )}%`
      );

      if (errorCount > 0) {
         console.log(`\n🚨 Failed regions:`);
         results
            .filter((r) => r.status === "error")
            .forEach((r) => {
               console.log(`   • ${r.region} (${r.code}): ${r.error}`);
            });
      }

      if (successCount > 0) {
         console.log(`\n🎉 Successfully processed regions:`);
         results
            .filter((r) => r.status === "success")
            .forEach((r) => {
               const packageCount = r.packages ? r.packages.length : 0;
               console.log(
                  `   • ${r.region} (${r.code}): ${packageCount} packages updated`
               );
            });
      }

      console.log(`\n🏁 Package update process completed!`);
      return results;
   } catch (error) {
      console.log(
         `\n💥 FATAL ERROR in package update process:`,
         error instanceof Error ? error.message : String(error)
      );
      if (error instanceof Error && error.stack) {
         console.log(`🔍 Fatal error stack trace:`, error.stack);
      }
      throw error;
   }
}

// Run the script if called directly
if (require.main === module) {
   console.log("🎬 Starting package update script...");
   updateAllPackages()
      .then((results) => {
         console.log("🎉 Script completed successfully!");
         console.log(`📊 Final results: ${results.length} regions processed`);
         process.exit(0);
      })
      .catch((error) => {
         console.log(
            "💥 Script failed with error:",
            error instanceof Error ? error.message : String(error)
         );
         process.exit(1);
      });
}

export { updateAllPackages };
