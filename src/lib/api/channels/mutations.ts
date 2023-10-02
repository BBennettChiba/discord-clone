import { and, eq } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
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

export const unSubscribeToChannel = async (id: ChannelId) => {
  const { id: channelId } = channelIdSchema.parse({ id });
  const { session } = await getUserAuth();
  if (!session?.user) throw new Error(" no user in subscribeToChannel");
  return await db
    .delete(usersToChannels)
    .where(
      and(
        eq(usersToChannels.userId, session.user.id),
        eq(usersToChannels.channelId, channelId),
      ),
    )
    .returning();
};

export const subscribeToChannel = async (id: ChannelId) => {
  const { id: channelId } = channelIdSchema.parse({ id });
  const { session } = await getUserAuth();
  if (!session?.user) throw new Error(" no user in subscribeToChannel");
  return await db
    .insert(usersToChannels)
    .values({ userId: session.user.id, channelId });
};
