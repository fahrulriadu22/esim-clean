import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { paymentHistory } from "@/database/schema";
import { eq, and, lt } from "drizzle-orm";

export async function GET() {
   try {
      // Calculate the timestamp for 12 hours ago
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

      // Delete pending paymentHistory records older than 12 hours
      const deletedRecords = await db
         .delete(paymentHistory)
         .where(
            and(
               eq(paymentHistory.status, "PENDING"),
               lt(paymentHistory.createdAt, twelveHoursAgo)
            )
         )
         .returning();

      return NextResponse.json({
         success: true,
         message: "Pending payment history cleared",
         deletedCount: deletedRecords.length,
         deletedRecords: deletedRecords.map((record) => ({
            id: record.id,
            referenceId: record.referenceId,
            createdAt: record.createdAt,
         })),
      });
   } catch (error) {
      console.error("Error clearing pending payments:", error);
      return NextResponse.json(
         {
            success: false,
            message: "Failed to clear pending payments",
            error: error instanceof Error ? error.message : String(error),
         },
         { status: 500 }
      );
   }
}
