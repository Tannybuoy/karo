import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { matchesTable, profilesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/matches/current", async (req, res) => {
  const userId = req.headers["x-user-id"] as string || "user-demo-1";

  try {
    const matches = await db
      .select()
      .from(matchesTable)
      .where(eq(matchesTable.userId, userId))
      .limit(1);

    if (matches.length === 0) {
      res.status(404).json({ error: "No match this week" });
      return;
    }

    const match = matches[0];

    const matchedProfiles = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.userId, match.matchedUserId))
      .limit(1);

    const matchedUserProfile = matchedProfiles[0] || {
      id: "unknown",
      userId: match.matchedUserId,
      name: "Your Match",
      photoUrl: null,
      workingStyle: "quiet" as const,
      preferredNeighborhoods: [],
      maxTravelMinutes: 20,
      workIntents: [],
      linkedinUrl: null,
      instagramUrl: null,
      hidesSocialLinks: false,
      showsOnlyToMatches: false,
      reliabilityScore: 4.5,
      checkInCount: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res.json({
      ...match,
      matchedUserProfile,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get current match");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
