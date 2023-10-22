import { and, eq } from "drizzle-orm";
import { usersToChannels } from "@/lib/db/schema/usersToChannels";
import { type AuthedContext } from "@/lib/trpc/context";

type ToggleChannelSubscriptionInput = {
  input: { id: number };
  ctx: AuthedContext;
};

export const toggleChannelSubscription = async ({
  input: { id: channelId },
  ctx: { session, db },
}: ToggleChannelSubscriptionInput) => {
  const userToChannelConnection = await db.query.usersToChannels.findFirst({
    where: and(
      eq(usersToChannels.userId, session.user.id),
      eq(usersToChannels.channelId, channelId),
    ),
  });
  if (!userToChannelConnection)
    return subscribeToChannel(channelId, session.user.id, db);
  else return unsubscribeToChannel(channelId, session.user.id, db);
};

const unsubscribeToChannel = async (
  channelId: number,
  userId: string,
  db: AuthedContext["db"],
) =>
  (
    await db
      .delete(usersToChannels)
      .where(
        and(
          eq(usersToChannels.userId, userId),
          eq(usersToChannels.channelId, channelId),
        ),
      )
      .returning()
  )[0];

const subscribeToChannel = async (
  channelId: number,
  userId: string,
  db: AuthedContext["db"],
) =>
  (
    await db.insert(usersToChannels).values({ userId, channelId }).returning()
  )[0];
