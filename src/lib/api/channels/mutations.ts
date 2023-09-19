import { eq } from "drizzle-orm";
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
