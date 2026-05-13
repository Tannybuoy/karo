import { pgTable, text, integer, boolean, real, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const workingStyleEnum = pgEnum("working_style", ["quiet", "light_chat", "brief_social"]);

export const profilesTable = pgTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  name: text("name").notNull(),
  photoUrl: text("photo_url"),
  workingStyle: workingStyleEnum("working_style").notNull().default("quiet"),
  preferredNeighborhoods: text("preferred_neighborhoods").array().notNull().default([]),
  maxTravelMinutes: integer("max_travel_minutes").notNull().default(20),
  workIntents: text("work_intents").array().notNull().default([]),
  linkedinUrl: text("linkedin_url"),
  instagramUrl: text("instagram_url"),
  hidesSocialLinks: boolean("hides_social_links").notNull().default(false),
  showsOnlyToMatches: boolean("shows_only_to_matches").notNull().default(false),
  reliabilityScore: real("reliability_score").notNull().default(0),
  checkInCount: integer("check_in_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProfileSchema = createInsertSchema(profilesTable).omit({
  createdAt: true,
  updatedAt: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profilesTable.$inferSelect;
