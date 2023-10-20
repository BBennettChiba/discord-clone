import { and, eq } from "drizzle-orm";
import { type Session } from "next-auth";
import { db } from "@/lib/db";
import { reactions } from "@/lib/db/schema/reactions";
import { reactionsToMessages } from "@/lib/db/schema/reactionsToMessages";
import { reactionsToMessagesToUsers } from "@/lib/db/schema/reactionsToMessagesToUsers";

type Input = {
  input: { messageId: number; reactionId: string };
};

type CTX = {
  ctx: { session: Session };
};

export const createReaction = async ({
  input: { messageId, reactionId },
  ctx: { session },
}: Input & CTX) => {
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

export const toggleReaction = async ({
  input: { reactionId, messageId },
  ctx: { session },
}: Input & CTX) => {
  const {
    user: { id: userId },
  } = session;
  const userReactions = await db.query.reactionsToMessagesToUsers.findMany({
    where: and(
      eq(reactionsToMessagesToUsers.reactionToMessagesReactionId, reactionId),
      eq(reactionsToMessagesToUsers.reactionToMessagesMessageId, messageId),
    ),
  });

  if (userReactions.length === 1) {
    await db
      .delete(reactionsToMessages)
      .where(
        and(
          eq(reactionsToMessages.reactionId, reactionId),
          eq(reactionsToMessages.messageId, messageId),
        ),
      );
  }
  let res;
  if (userReactions.find((reac) => reac.userId === userId)) {
    res = await deleteReaction({ reactionId, messageId, userId });
  } else {
    res = await createReaction({
      ctx: { session },
      input: { reactionId, messageId },
    });
  }
  return res;
};

const deleteReaction = async ({
  reactionId,
  messageId,
  userId,
}: {
  reactionId: string;
  messageId: number;
  userId: string;
}) => {
  const del = await db
    .delete(reactionsToMessagesToUsers)
    .where(
      and(
        eq(reactionsToMessagesToUsers.reactionToMessagesReactionId, reactionId),
        eq(reactionsToMessagesToUsers.reactionToMessagesMessageId, messageId),
        eq(reactionsToMessagesToUsers.userId, userId),
      ),
    )
    .returning();
  return del;
};
