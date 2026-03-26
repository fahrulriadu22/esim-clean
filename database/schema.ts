import {
   pgTable,
   text,
   integer,
   real,
   bigint,
   timestamp,
   uuid,
   pgEnum,
   unique,
   index,
   boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const orderStatusEnum = pgEnum("OrderStatus", [
   "PENDING",
   "COMPLETED",
   "FAILED",
]);
export const paymentTypeEnum = pgEnum("PaymentType", ["TOPUP", "ORDER"]);
export const paymentStatusEnum = pgEnum("PaymentStatus", [
   "PENDING",
   "COMPLETED",
   "FAILED",
]);

// Tables
export const balance = pgTable("Balance", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   amount: real("amount").notNull(),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
});

export const user = pgTable("User", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   telegramId: text("telegramId").notNull().unique(),
   username: text("username").notNull(),
   fullName: text("fullName").notNull(),
   photoUrl: text("photoUrl"),
   languageCode: text("languageCode"),
   balanceId: text("balanceId").notNull().unique(),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
});

export const region = pgTable("Region", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   name: text("name").notNull(),
   code: text("code").notNull().unique(),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
});

export const subRegion = pgTable("SubRegion", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   name: text("name").notNull(),
   code: text("code").notNull(),
   regionId: text("regionId").notNull(),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
});

export const packageTable = pgTable("Package", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   name: text("name").notNull(),
   code: text("code").notNull().unique(),
   duration: integer("duration").notNull(),
   durationUnit: text("durationUnit").notNull(),
   price: real("price").notNull(),
   data: text("data").notNull(),
   dataUnit: text("dataUnit").notNull(),
   pricePerData: real("pricePerData").notNull(),
   regionId: text("regionId").notNull(),
   // TAMBAHIN INI:
   polarLink: text("polarLink"),
   isActive: boolean("isActive").default(true),
   isBestSeller: boolean("isBestSeller").default(false),
   fakePrice: real("fakePrice"),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
});

export const order = pgTable("Order", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   telegramId: text("telegramId").notNull(),
   orderNo: text("orderNo").notNull(),
   txId: text("txId").notNull().unique(),
   amount: real("amount").notNull(),
   status: orderStatusEnum("status").notNull(),
   paymentMethod: text("paymentMethod"),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
});

export const esim = pgTable("Esim", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   telegramId: text("telegramId").notNull(),
   imsi: text("imsi").notNull(),
   iccid: text("iccid").notNull().unique(),
   ac: text("ac").notNull(),
   shortUrl: text("shortUrl").notNull().default(""),
   totalDuration: integer("totalDuration").notNull(),
   durationUnit: text("durationUnit").notNull(),
   status: text("status").notNull(),
   packageName: text("packageName").notNull(),
   packageCode: text("packageCode").notNull(),
   remainingData: bigint("remainingData", { mode: "bigint" }).notNull(),
   orderNo: text("orderNo").notNull(),
   expiredAt: timestamp("expiredAt").notNull(),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
});

export const paymentHistory = pgTable("PaymentHistory", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   referenceId: text("referenceId").notNull().unique().default(""),
   telegramId: text("telegramId").notNull(),
   userId: text("userId"),
   payerEmail: text("payerEmail").default(""),
   amount: real("amount").notNull(),
   paymentMethod: text("paymentMethod"),
   status: paymentStatusEnum("status").notNull(),
   paymentType: paymentTypeEnum("paymentType").notNull(),
   orderNo: text("orderNo").unique().default(""),
   packageCode: text("packageCode").default("-"),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
});

export const tonHistory = pgTable("TonHistory", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   hash: text("hash").notNull().unique(),
   nanoTon: bigint("nanoTon", { mode: "bigint" }).notNull(),
   senderAddress: text("senderAddress").notNull(),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================
// NOWPAYMENTS TABLES - TAMBAHAN
// ============================================

export const nowPaymentsHistory = pgTable("NowPaymentsHistory", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   paymentId: text("paymentId").notNull().unique(),
   orderId: text("orderId").notNull(),
   referenceId: text("referenceId").notNull().unique(),
   telegramId: text("telegramId").notNull(),
   userId: text("userId"),
   amount: real("amount").notNull(),
   currency: text("currency").notNull().default("USD"),
   payAmount: real("payAmount"),
   payCurrency: text("payCurrency"),
   paymentStatus: text("paymentStatus").notNull().default("waiting"),
   paymentUrl: text("paymentUrl"),
   payAddress: text("payAddress"),
   actuallyPaid: real("actuallyPaid"),
   actuallyPaidAtFiat: real("actuallyPaidAtFiat"),
   outcomeAmount: real("outcomeAmount"),
   outcomeCurrency: text("outcomeCurrency"),
   purchaseId: text("purchaseId"),
   invoiceId: text("invoiceId"),
   orderDescription: text("orderDescription"),
   packageCode: text("packageCode"),
   ipnData: text("ipnData"),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
}, (table) => {
   return {
      paymentIdIdx: index("NowPayments_paymentId_idx").on(table.paymentId),
   };
});

// Relations
export const balanceRelations = relations(balance, ({ one }) => ({
   user: one(user, {
      fields: [balance.id],
      references: [user.balanceId],
   }),
}));

export const userRelations = relations(user, ({ one, many }) => ({
   balance: one(balance, {
      fields: [user.balanceId],
      references: [balance.id],
   }),
   paymentHistory: many(paymentHistory),
}));

export const regionRelations = relations(region, ({ many }) => ({
   subRegions: many(subRegion),
   packages: many(packageTable),
}));

export const subRegionRelations = relations(subRegion, ({ one }) => ({
   region: one(region, {
      fields: [subRegion.regionId],
      references: [region.id],
   }),
}));

export const packageRelations = relations(packageTable, ({ one }) => ({
   region: one(region, {
      fields: [packageTable.regionId],
      references: [region.id],
   }),
}));

export const orderRelations = relations(order, ({ many }) => ({
   esims: many(esim),
}));

export const esimRelations = relations(esim, ({ one }) => ({
   order: one(order, {
      fields: [esim.orderNo],
      references: [order.orderNo],
   }),
}));

export const paymentHistoryRelations = relations(paymentHistory, ({ one }) => ({
   user: one(user, {
      fields: [paymentHistory.userId],
      references: [user.id],
   }),
}));

// Relations untuk NowPayments
export const nowPaymentsRelations = relations(nowPaymentsHistory, ({ one }) => ({
   user: one(user, {
      fields: [nowPaymentsHistory.userId],
      references: [user.id],
   }),
}));

// ============================================
// PROMO CODES TABLE
// ============================================
export const promoCodes = pgTable("PromoCodes", {
   id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
   code: text("code").notNull().unique(),
   discount: real("discount").notNull(),
   validUntil: timestamp("validUntil"),
   maxUses: integer("maxUses"),
   usedCount: integer("usedCount").default(0),
   minPurchase: real("minPurchase"),
   packageSpecific: text("packageSpecific").array(),
   isActive: boolean("isActive").default(true),
   createdAt: timestamp("createdAt").defaultNow().notNull(),
   updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
});
