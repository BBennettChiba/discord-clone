import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { type ChannelId, channelIdSchema, channels } from "@/lib/db/schema/channels";
import { servers } from "@/lib/db/schema/servers";

export const getChannels = async () => {
  const c = await db.select({ channel: channels, server: servers }).from(channels).leftJoin(servers, eq(channels.serverId, servers.id));
  return { channels: c };
};

export const getChannelById = async (id: ChannelId) => {
  const { id: channelId } = channelIdSchema.parse({ id });
  const [c] = await db.select().from(channels).where(eq(channels.id, channelId)).leftJoin(servers, eq(channels.serverId, servers.id));
  return { channel: c };
};

