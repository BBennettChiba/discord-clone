import { and, eq } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  type ChannelId,
  type NewChannelParams,
  type UpdateChannelParams,
  updateChannelSchema,
  insertChannelSchema,
  channels,
  channelIdSchema,
} from "@/lib/db/schema/channels";
import { usersToChannels } from "@/lib/db/schema/usersToChannels";

export const createChannel = async (channel: NewChannelParams) => {
  const newChannel = insertChannelSchema.parse(channel);
  try {
    const [c] = await db.insert(channels).values(newChannel).returning();
    return { channel: c };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateChannel = async (
  id: ChannelId,
  channel: UpdateChannelParams,
) => {
  const { id: channelId } = channelIdSchema.parse({ id });
  const newChannel = updateChannelSchema.parse(channel);
  try {
    const [c] = await db
      .update(channels)
      .set(newChannel)
      .where(eq(channels.id, channelId))
      .returning();
    return { channel: c };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteChannel = async (id: ChannelId) => {
  const { id: channelId } = channelIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(channels)
      .where(eq(channels.id, channelId))
      .returning();
    return { channel: c };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const toggleChannelSubscription = async (id: ChannelId) => {
  const { id: channelId } = channelIdSchema.parse({ id });
  const { session } = await getUserAuth();
  if (!session?.user) throw new Error(" no user in unsubscribeToChannel");
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
  (await db.insert(usersToChannels).values({ userId, channelId }).returning())[0]

