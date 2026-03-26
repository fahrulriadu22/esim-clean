import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { order, esim, packageTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { makeAuthenticatedRequest } from "@/utils/esim-api";

// Enhanced logging function
function logError(context: string, error: any, additionalData?: any) {
   console.error(`[WEBHOOK ERROR] ${context}:`, {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      additionalData,
      timestamp: new Date().toISOString(),
   });
}

function logInfo(message: string, data?: any) {
   console.log(`[WEBHOOK INFO] ${message}:`, {
      data,
      timestamp: new Date().toISOString(),
   });
}

// Allowed IP addresses for webhook requests
const ALLOWED_IPS = [
   "3.1.131.226",
   "54.254.74.88",
   "18.136.190.97",
   "18.136.60.197",
   "18.136.19.137",
];

function getClientIP(request: NextRequest): string {
   // Check various headers for the real IP address
   const forwardedFor = request.headers.get("x-forwarded-for");
   const realIP = request.headers.get("x-real-ip");
   const cfConnectingIP = request.headers.get("cf-connecting-ip");

   // x-forwarded-for can contain multiple IPs, take the first one
   if (forwardedFor) {
      return forwardedFor.split(",")[0].trim();
   }

   if (realIP) {
      return realIP;
   }

   if (cfConnectingIP) {
      return cfConnectingIP;
   }

   return "unknown";
}

function isIPAllowed(ip: string): boolean {
   return ALLOWED_IPS.includes(ip);
}

interface WebhookBody {
   notifyType: "ORDER_STATUS" | "ESIM_STATUS" | "DATA_USAGE" | "CHECK_HEALTH";
   notifyId: string;
   content: {
      orderNo: string;
      esimTranNo: string;
      transactionId?: string;
      iccid?: string;
      remain?: number;
      esimStatus?:
         | "GOT_RESOURCE"
         | "IN_USE"
         | "USED_UP"
         | "USED_EXPIRED"
         | "UNUSED_EXPIRED"
         | "CANCEL"
         | "REVOKED";
      smdStatus?:
         | "DOWNLOAD"
         | "INSTALLATION"
         | "ENABLED"
         | "DISABLED"
         | "DELETED";
   };
}

interface QueryData {
   success: boolean;
   errorCode: string;
   errorMsg: string | null;
   obj: {
      esimList: Array<{
         esimTranNo: string;
         orderNo: string;
         transactionId: string;
         imsi: string;
         iccid: string;
         ac: string;
         shortUrl: string;
         totalDuration: number;
         durationUnit: string;
         orderUsage: number;
         esimStatus: string;
         expiredTime: string;
         packageList: Array<{
            packageName: string;
            packageCode: string;
            slug: string;
            duration: number;
            volume: number;
            locationCode: string;
            createTime: string;
         }>;
      }>;
      pager: {
         pageSize: number;
         pageNum: number;
         total: number;
      };
   };
}

export async function POST(request: NextRequest) {
   try {
      logInfo("Webhook request received", {
         url: request.url,
         method: request.method,
         headers: Object.fromEntries(request.headers.entries()),
      });

      // Get client IP address
      const clientIP = getClientIP(request);
      logInfo("Client IP detected", { clientIP });

      // Check if IP is allowed
      if (!isIPAllowed(clientIP)) {
         logError(
            "Unauthorized IP access",
            new Error("IP not in allowed list"),
            { clientIP, allowedIPs: ALLOWED_IPS }
         );
         return NextResponse.json(
            {
               success: false,
               error: "Unauthorized",
               message: "Access denied from this IP address",
               ip: clientIP,
            },
            { status: 403 }
         );
      }

      // Get request body
      let body: WebhookBody;
      try {
         body = await request.json();
         logInfo("Webhook body parsed successfully", {
            notifyType: body.notifyType,
            notifyId: body.notifyId,
         });
      } catch (parseError) {
         logError("Failed to parse request body", parseError);
         return NextResponse.json(
            {
               success: false,
               error: "Invalid JSON body",
               message: "Failed to parse request body",
            },
            { status: 400 }
         );
      }

      const { notifyType, notifyId, content } = body;

      if (notifyType == "CHECK_HEALTH") {
         return NextResponse.json(
            {
               success: true,
               message: "Health check successful",
            },
            { status: 200 }
         );
      }

      // Validate required fields
      if (!notifyType || !notifyId || !content) {
         logError(
            "Missing required fields",
            new Error("Invalid webhook data"),
            { notifyType, notifyId, content }
         );
         return NextResponse.json(
            {
               success: false,
               error: "Missing required fields",
               message: "notifyType, notifyId, and content are required",
            },
            { status: 400 }
         );
      }

      // Order notify
      if (notifyType === "ORDER_STATUS") {
         logInfo("Processing ORDER_STATUS notification", { content });

         const { orderNo, transactionId, esimStatus } = content;

         if (!orderNo) {
            logError(
               "Missing orderNo in ORDER_STATUS",
               new Error("orderNo is required"),
               { content }
            );
            return NextResponse.json(
               {
                  success: false,
                  error: "Missing orderNo",
                  message: "orderNo is required for ORDER_STATUS notification",
               },
               { status: 400 }
            );
         }

         try {
            const orderRecord = await db
               .select()
               .from(order)
               .where(eq(order.orderNo, orderNo))
               .limit(1);

            if (orderRecord.length === 0) {
               logError(
                  "Order not found",
                  new Error("Order not found in database"),
                  { orderNo }
               );
               return NextResponse.json(
                  {
                     success: false,
                     error: "Order not found",
                     message: `Order ${orderNo} not found in database`,
                  },
                  { status: 404 }
               );
            }

            logInfo("Order found, updating status", {
               orderNo,
               currentStatus: orderRecord[0].status,
            });

            const updated = await db
               .update(order)
               .set({
                  status: "COMPLETED",
                  txId: transactionId || "",
               })
               .where(eq(order.orderNo, orderNo))
               .returning();

            logInfo("Order updated successfully", {
               orderNo,
               updatedStatus: updated[0].status,
            });

            // Query eSIM data from API
            let queryData: QueryData;
            try {
               queryData = await makeAuthenticatedRequest(
                  "https://api.esimaccess.com/api/v1/open/esim/query",
                  {
                     orderNo: updated[0].orderNo,
                     pager: {
                        pageNum: 1,
                        pageSize: 10,
                     },
                  }
               );
               logInfo("eSIM query successful", {
                  orderNo,
                  esimCount: queryData.obj.esimList.length,
               });
            } catch (apiError) {
               logError("Failed to query eSIM data", apiError, { orderNo });
               return NextResponse.json(
                  {
                     success: false,
                     error: "Failed to query eSIM data",
                     message: "Order updated but failed to fetch eSIM details",
                  },
                  { status: 500 }
               );
            }

            // Process each eSIM
            for (const esimData of queryData.obj.esimList) {
               try {
                  const packageCode = esimData.packageList[0]?.packageCode;
                  if (!packageCode) {
                     logError(
                        "Missing package code for eSIM",
                        new Error("Package code not found"),
                        { esimData }
                     );
                     continue;
                  }

                  const packages = await db
                     .select()
                     .from(packageTable)
                     .where(eq(packageTable.code, packageCode))
                     .limit(1);

                  if (packages.length === 0) {
                     logError(
                        "Package not found",
                        new Error("Package not found in database"),
                        { packageCode }
                     );
                     continue;
                  }

                  // Parse and fix the expiration time format
                  let expiredAt: Date;
                  try {
                     const fixedExpiredTime = esimData.expiredTime.replace(
                        /([+-]\d{2})(\d{2})$/,
                        "$1:$2"
                     );
                     expiredAt = new Date(fixedExpiredTime);
                  } catch (dateError) {
                     logError("Failed to parse expiration time", dateError, {
                        expiredTime: esimData.expiredTime,
                     });
                     // Fallback: create a date 30 days from now
                     expiredAt = new Date();
                     expiredAt.setDate(expiredAt.getDate() + 30);
                  }

                  const packageData = packages[0];
                  const remainingData =
                     packageData.dataUnit === "GB"
                        ? BigInt(
                             parseInt(packageData.data) * 1024 * 1024 * 1024
                          )
                        : BigInt(parseInt(packageData.data) * 1024 * 1024);

                  await db.insert(esim).values({
                     telegramId: updated[0].telegramId,
                     imsi: esimData.imsi,
                     iccid: esimData.iccid,
                     ac: esimData.ac,
                     shortUrl: esimData.shortUrl,
                     totalDuration: esimData.totalDuration,
                     durationUnit: esimData.durationUnit,
                     status: esimData.esimStatus,
                     packageName: esimData.packageList[0]?.packageName || "",
                     packageCode: esimData.packageList[0]?.packageCode || "",
                     remainingData,
                     orderNo: updated[0].orderNo,
                     expiredAt,
                  });

                  logInfo("eSIM inserted successfully", {
                     iccid: esimData.iccid,
                     imsi: esimData.imsi,
                     packageCode,
                  });
               } catch (esimError) {
                  logError("Failed to process eSIM", esimError, { esimData });
                  // Continue processing other eSIMs
               }
            }

            return NextResponse.json(
               {
                  success: true,
                  message: "Order updated successfully",
                  data: updated[0],
               },
               { status: 200 }
            );
         } catch (dbError) {
            logError("Database error in ORDER_STATUS", dbError, { orderNo });
            return NextResponse.json(
               {
                  success: false,
                  error: "Database error",
                  message: "Failed to update order",
               },
               { status: 500 }
            );
         }
      }

      // ESIM status notify
      if (notifyType === "ESIM_STATUS") {
         logInfo("Processing ESIM_STATUS notification", { content });

         const { orderNo, esimTranNo, esimStatus, smdStatus } = content;

         if (!orderNo) {
            logError(
               "Missing orderNo in ESIM_STATUS",
               new Error("orderNo is required"),
               { content }
            );
            return NextResponse.json(
               {
                  success: false,
                  error: "Missing orderNo",
                  message: "orderNo is required for ESIM_STATUS notification",
               },
               { status: 400 }
            );
         }

         try {
            // Find the eSIM by orderNo
            const esimRecord = await db
               .select()
               .from(esim)
               .where(eq(esim.orderNo, orderNo))
               .limit(1);

            if (esimRecord.length === 0) {
               logError(
                  "eSIM not found",
                  new Error("eSIM not found in database"),
                  { orderNo }
               );
               return NextResponse.json(
                  {
                     success: false,
                     error: "eSIM not found",
                     message: `eSIM for order ${orderNo} not found in database`,
                  },
                  { status: 404 }
               );
            }

            logInfo("eSIM found, updating status", {
               orderNo,
               currentStatus: esimRecord[0].status,
               newStatus: esimStatus,
            });

            await db
               .update(esim)
               .set({
                  status: esimStatus || esimRecord[0].status,
               })
               .where(eq(esim.id, esimRecord[0].id));

            logInfo("eSIM status updated successfully", {
               orderNo,
               esimTranNo,
               esimStatus,
               smdStatus,
            });

            return NextResponse.json(
               {
                  success: true,
                  message: "ESIM status updated successfully",
                  data: { orderNo, esimTranNo, esimStatus, smdStatus },
               },
               { status: 200 }
            );
         } catch (dbError) {
            logError("Database error in ESIM_STATUS", dbError, { orderNo });
            return NextResponse.json(
               {
                  success: false,
                  error: "Database error",
                  message: "Failed to update eSIM status",
               },
               { status: 500 }
            );
         }
      }

      // Data usage notify
      if (notifyType === "DATA_USAGE") {
         logInfo("Processing DATA_USAGE notification", { content });

         const { orderNo, esimTranNo, remain, iccid } = content;

         if (!iccid) {
            logError(
               "Missing iccid in DATA_USAGE",
               new Error("iccid is required"),
               { content }
            );
            return NextResponse.json(
               {
                  success: false,
                  error: "Missing iccid",
                  message: "iccid is required for DATA_USAGE notification",
               },
               { status: 400 }
            );
         }

         if (remain === undefined || remain === null) {
            logError(
               "Missing remain value in DATA_USAGE",
               new Error("remain is required"),
               { content }
            );
            return NextResponse.json(
               {
                  success: false,
                  error: "Missing remain value",
                  message:
                     "remain value is required for DATA_USAGE notification",
               },
               { status: 400 }
            );
         }

         try {
            // Find the eSIM and update remaining data
            const esimRecord = await db
               .select()
               .from(esim)
               .where(eq(esim.iccid, iccid))
               .limit(1);

            if (esimRecord.length === 0) {
               logError(
                  "eSIM not found by iccid",
                  new Error("eSIM not found in database"),
                  { iccid }
               );
               return NextResponse.json(
                  {
                     success: false,
                     error: "eSIM not found",
                     message: `eSIM with iccid ${iccid} not found in database`,
                  },
                  { status: 404 }
               );
            }

            logInfo("eSIM found, updating remaining data", {
               iccid,
               currentRemaining: esimRecord[0].remainingData.toString(),
               newRemaining: remain,
            });

            await db
               .update(esim)
               .set({
                  remainingData: BigInt(remain),
               })
               .where(eq(esim.id, esimRecord[0].id));

            logInfo("Data usage updated successfully", {
               orderNo,
               esimTranNo,
               iccid,
               remain,
            });

            return NextResponse.json(
               {
                  success: true,
                  message: "Data usage updated successfully",
                  data: { orderNo, esimTranNo, iccid, remain },
               },
               { status: 200 }
            );
         } catch (dbError) {
            logError("Database error in DATA_USAGE", dbError, { iccid });
            return NextResponse.json(
               {
                  success: false,
                  error: "Database error",
                  message: "Failed to update data usage",
               },
               { status: 500 }
            );
         }
      }

      // Return success response for unhandled notification types
      logInfo("Unhandled notification type", { notifyType, notifyId });
      return NextResponse.json(
         {
            success: true,
            message: "Webhook received and logged",
            data: { notifyType, notifyId },
         },
         { status: 200 }
      );
   } catch (error) {
      logError("Unexpected error in webhook handler", error, {
         url: request.url,
         method: request.method,
         headers: Object.fromEntries(request.headers.entries()),
      });

      return NextResponse.json(
         {
            success: false,
            error: "Internal server error",
            message:
               error instanceof Error
                  ? error.message
                  : "Unknown error occurred",
         },
         { status: 500 }
      );
   }
}
