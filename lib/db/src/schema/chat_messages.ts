import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const chatMessagesTable = pgTable("chat_messages", {
  id: text("id").primaryKey(),
  matchId: text("match_id").notNull(),
  senderId: text("sender_id").notNull(),
  senderName: text("sender_name").notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessagesTable).omit({
  sentAt: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessagesTable.$inferSelect;
