import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { chatMessagesTable, matchesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { SendChatMessageBody } from "@workspace/api-zod";

const router: IRouter = Router();

const SUGGESTED_CAFES = [
  {
    id: "cafe-1",
    name: "Verve Coffee Roasters",
    neighborhood: "SoHo",
    address: "72 Spring St",
    distance: "0.3 mi",
    vibe: "Quiet, good wifi",
  },
  {
    id: "cafe-2",
    name: "Blue Bottle Coffee",
    neighborhood: "Nolita",
    address: "160 Berry St",
    distance: "0.6 mi",
    vibe: "Minimal, focused",
  },
  {
    id: "cafe-3",
    name: "Cha Cha Matcha",
    neighborhood: "West Village",
    address: "373 Bleecker St",
    distance: "0.8 mi",
    vibe: "Cozy, matcha bar",
  },
];

async function getMatch(matchId: string) {
  const matches = await db
    .select()
    .from(matchesTable)
    .where(eq(matchesTable.id, matchId))
    .limit(1);
  return matches[0] || null;
}

router.get("/chat/:matchId/messages", async (req, res) => {
  const { matchId } = req.params;

  try {
    const match = await getMatch(matchId);

    if (!match) {
      res.status(404).json({ error: "Match not found" });
      return;
    }

    if (!match.chatEnabled) {
      res.status(403).json({ error: "Chat not available yet" });
      return;
    }

    const messages = await db
      .select()
      .from(chatMessagesTable)
      .where(eq(chatMessagesTable.matchId, matchId))
      .orderBy(chatMessagesTable.sentAt);

    res.json(messages);
  } catch (err) {
    req.log.error({ err }, "Failed to get chat messages");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/chat/:matchId/messages", async (req, res) => {
  const { matchId } = req.params;

  const parsed = SendChatMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error });
    return;
  }

  try {
    const match = await getMatch(matchId);

    if (!match) {
      res.status(404).json({ error: "Match not found" });
      return;
    }

    if (!match.chatEnabled) {
      res.status(403).json({ error: "Chat not available yet" });
      return;
    }

    const message = await db
      .insert(chatMessagesTable)
      .values({
        id: randomUUID(),
        matchId,
        senderId: parsed.data.senderId,
        senderName: parsed.data.senderName,
        content: parsed.data.content,
      })
      .returning();

    res.status(201).json(message[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to send message");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/chat/:matchId/cafes", async (req, res) => {
  const { matchId } = req.params;

  try {
    const match = await getMatch(matchId);

    if (!match) {
      res.status(404).json({ error: "Match not found" });
      return;
    }

    res.json(SUGGESTED_CAFES);
  } catch (err) {
    req.log.error({ err }, "Failed to get café suggestions");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
