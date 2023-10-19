import { type Session } from "next-auth";
import { db } from "@/lib/db";
import { reactions } from "@/lib/db/schema/reactions";
import { reactionsToMessages } from "@/lib/db/schema/reactionsToMessages";
import { reactionsToMessagesToUsers } from "@/lib/db/schema/reactionsToMessagesToUsers";

type Input = {
  input: { messageId: number; reactionId: string };
  ctx: { session: Session };
};

export const createReaction = async ({
  input: { messageId, reactionId },
  ctx: { session },
}: Input) => {
  const {
    user: { id: userId },
  } = session;

  await db
    .insert(reactions)
    .values({ id: reactionId })
    .onConflictDoNothing()
    .returning();

  const [reactionToMessageInsert] = await db
    .insert(reactionsToMessages)
    .values({ messageId, reactionId })
    .onConflictDoNothing()
    .returning();
  if (!reactionToMessageInsert)
    throw new Error("Could not insert into reactionToMessages");
  const [reactionToMessagesToUserInsert] = await db
    .insert(reactionsToMessagesToUsers)
    .values({
      reactionToMessagesMessageId: messageId,
      reactionToMessagesReactionId: reactionId,
      userId,
    })
    .onConflictDoNothing()
    .returning();
  if (!reactionToMessagesToUserInsert)
    throw new Error("Could not insert into reactionToMessagesToUser");

  return reactionToMessagesToUserInsert;
};
