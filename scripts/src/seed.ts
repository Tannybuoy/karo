import { db, pool } from "@workspace/db";
import { profilesTable, matchesTable, chatMessagesTable } from "@workspace/db/schema";

async function seed() {
  console.log("Seeding demo data...");

  await db
    .insert(profilesTable)
    .values([
      {
        id: "profile-demo-1",
        userId: "user-demo-1",
        name: "You",
        workingStyle: "quiet",
        preferredNeighborhoods: ["Lower East Side", "Williamsburg"],
        maxTravelMinutes: 20,
        workIntents: ["Deep work", "Writing"],
        reliabilityScore: 4.8,
        checkInCount: 7,
      },
      {
        id: "profile-match-demo",
        userId: "user-demo-match",
        name: "Alex Chen",
        workingStyle: "light_chat",
        preferredNeighborhoods: ["Brooklyn", "Lower East Side"],
        maxTravelMinutes: 25,
        workIntents: ["Design work", "Planning"],
        reliabilityScore: 4.5,
        checkInCount: 3,
      },
    ])
    .onConflictDoNothing();

  // This Saturday at 10am ET
  const saturday = new Date("2026-05-16T14:00:00.000Z");

  // Last Saturday at 6pm ET — when match was "revealed"
  const revealedAt = new Date("2026-05-09T22:00:00.000Z");

  await db
    .insert(matchesTable)
    .values({
      id: "match-demo-1",
      userId: "user-demo-1",
      matchedUserId: "user-demo-match",
      sessionTimeSlot: "10:00 AM – 4:00 PM",
      sessionDate: saturday,
      status: "confirmed",
      weekRevealedAt: revealedAt,
      chatEnabled: true,
    })
    .onConflictDoNothing();

  // Pre-seeded chat messages so demo looks real
  const base = new Date("2026-05-10T14:00:00.000Z");
  const msg = (mins: number, senderId: string, senderName: string, content: string) => ({
    id: `msg-demo-${mins}`,
    matchId: "match-demo-1",
    senderId,
    senderName,
    content,
    sentAt: new Date(base.getTime() + mins * 60 * 1000),
  });

  await db
    .insert(chatMessagesTable)
    .values([
      msg(0,  "user-demo-match", "Alex Chen", "Hey! Saw we got matched this week 👋"),
      msg(3,  "user-demo-1",     "You",       "Hi! Saturday 10am works great for me."),
      msg(5,  "user-demo-match", "Alex Chen", "Same. Should we pick a café? Open to SoHo or Nolita."),
      msg(8,  "user-demo-1",     "You",       "Verve on Spring St looks perfect — quiet enough for deep work."),
      msg(10, "user-demo-match", "Alex Chen", "Love it. See you there!"),
    ])
    .onConflictDoNothing();

  console.log("Done.");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
