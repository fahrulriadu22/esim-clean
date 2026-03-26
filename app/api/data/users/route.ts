import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { user, balance } from "@/database/schema";
import { eq, or, ilike, desc, count } from "drizzle-orm";
import { validateDataApiKey } from "@/lib/data-api-auth";

export async function GET(req: NextRequest) {
   // Security check - validate API key from environment variable
   const authError = validateDataApiKey(req);
   if (authError) {
      return authError;
   }

   const { searchParams } = new URL(req.url);
   const page = parseInt(searchParams.get("page") || "1");
   const limit = parseInt(searchParams.get("limit") || "10");
   const search = searchParams.get("search") || "";

   // Validate pagination parameters
   if (page < 1) {
      return NextResponse.json(
         { error: "Page must be greater than 0" },
         { status: 400 }
      );
   }

   if (limit < 1 || limit > 100) {
      return NextResponse.json(
         { error: "Limit must be between 1 and 100" },
         { status: 400 }
      );
   }

   try {
      // Calculate offset for pagination
      const offset = (page - 1) * limit;

      // Build where clause for search
      const whereConditions = search
         ? or(
              ilike(user.username, `%${search}%`),
              ilike(user.fullName, `%${search}%`),
              ilike(user.telegramId, `%${search}%`)
           )
         : undefined;

      // Get total count for pagination metadata
      const totalCountResult = await db
         .select({ count: count() })
         .from(user)
         .where(whereConditions);

      const totalCount = totalCountResult[0]?.count || 0;

      // Fetch users with pagination
      const users = await db
         .select({
            id: user.id,
            telegramId: user.telegramId,
            username: user.username,
            fullName: user.fullName,
            photoUrl: user.photoUrl,
            languageCode: user.languageCode,
            balanceId: user.balanceId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            balance: {
               id: balance.id,
               amount: balance.amount,
               createdAt: balance.createdAt,
               updatedAt: balance.updatedAt,
            },
         })
         .from(user)
         .leftJoin(balance, eq(user.balanceId, balance.id))
         .where(whereConditions)
         .orderBy(desc(user.createdAt))
         .limit(limit)
         .offset(offset);

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return NextResponse.json({
         success: true,
         data: users,
         pagination: {
            page,
            limit,
            totalCount,
            totalPages,
            hasNextPage,
            hasPrevPage,
         },
      });
   } catch (error) {
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}
