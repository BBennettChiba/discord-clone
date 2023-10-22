import { and, eq } from "drizzle-orm";
import { reactions } from "@/lib/db/schema/reactions";
import { reactionsToMessages } from "@/lib/db/schema/reactionsToMessages";
import { reactionsToMessagesToUsers } from "@/lib/db/schema/reactionsToMessagesToUsers";
import { type AuthedContext } from "@/lib/trpc/context";

type Input = {
  input: { messageId: number; reactionId: string };
};

type CTX = {
  ctx: AuthedContext;
};

export const createReaction = async ({
  input: { messageId, reactionId },
  ctx: { session, db },
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

  return { action: "inserted", messageId, reactionId } as const;
};

export const toggleReaction = async ({
  input: { reactionId, messageId },
  ctx: { session, db },
  ctx,
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
    res = await deleteReaction({ reactionId, messageId, userId, db });
  } else {
    res = await createReaction({
      ctx,
      input: { reactionId, messageId },
    });
  }
  return res;
};

const deleteReaction = async ({
  reactionId,
  messageId,
  userId,
  db,
}: {
  reactionId: string;
  messageId: number;
  userId: string;
  db: AuthedContext["db"];
}) => {
  await db
    .delete(reactionsToMessagesToUsers)
    .where(
      and(
        eq(reactionsToMessagesToUsers.reactionToMessagesReactionId, reactionId),
        eq(reactionsToMessagesToUsers.reactionToMessagesMessageId, messageId),
        eq(reactionsToMessagesToUsers.userId, userId),
      ),
    );
  return { action: "deleted", reactionId, messageId } as const;
};
