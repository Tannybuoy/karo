import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const matchStatusEnum = pgEnum("match_status", ["pending", "confirmed", "completed", "cancelled"]);

export const matchesTable = pgTable("matches", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  matchedUserId: text("matched_user_id").notNull(),
  sessionTimeSlot: text("session_time_slot").notNull(),
  sessionDate: timestamp("session_date").notNull(),
  status: matchStatusEnum("status").notNull().default("pending"),
  weekRevealedAt: timestamp("week_revealed_at").notNull(),
  chatEnabled: boolean("chat_enabled").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMatchSchema = createInsertSchema(matchesTable).omit({
  createdAt: true,
});

export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Match = typeof matchesTable.$inferSelect;
