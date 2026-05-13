import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { profilesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { UpsertProfileBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/profiles/me", async (req, res) => {
  const userId = req.headers["x-user-id"] as string || "user-demo-1";

  try {
    const profiles = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.userId, userId))
      .limit(1);

    if (profiles.length === 0) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.json(profiles[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to get profile");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/profiles/me", async (req, res) => {
  const userId = req.headers["x-user-id"] as string || "user-demo-1";

  const parsed = UpsertProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error });
    return;
  }

  const input = parsed.data;

  try {
    const existing = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.userId, userId))
      .limit(1);

    const now = new Date();

    if (existing.length > 0) {
      const updated = await db
        .update(profilesTable)
        .set({
          ...input,
          updatedAt: now,
        })
        .where(eq(profilesTable.userId, userId))
        .returning();
      res.json(updated[0]);
    } else {
      const inserted = await db
        .insert(profilesTable)
        .values({
          id: randomUUID(),
          userId,
          ...input,
          reliabilityScore: 0,
          checkInCount: 0,
          updatedAt: now,
        })
        .returning();
      res.json(inserted[0]);
    }
  } catch (err) {
    req.log.error({ err }, "Failed to upsert profile");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
