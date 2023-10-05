import { and, eq } from "drizzle-orm";
import { type Session } from "next-auth";
import { db } from "@/lib/db";
import { usersToChannels } from "@/lib/db/schema/usersToChannels";

type ToggleChannelSubscriptionInput = {
  input: { id: number };
  ctx: { session: Session };
};

export const toggleChannelSubscription = async ({
  input: { id: channelId },
  ctx: { session },
}: ToggleChannelSubscriptionInput) => {
  const userToChannelConnection = await db.query.usersToChannels.findFirst({
    where: and(
      eq(usersToChannels.userId, session.user.id),
      eq(usersToChannels.channelId, channelId),
    ),
  });
  if (!userToChannelConnection)
    return subscribeToChannel(channelId, session.user.id);
  else return unsubscribeToChannel(channelId, session.user.id);
};

const unsubscribeToChannel = async (channelId: number, userId: string) =>
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

const subscribeToChannel = async (channelId: number, userId: string) =>
  (
    await db.insert(usersToChannels).values({ userId, channelId }).returning()
  )[0];
