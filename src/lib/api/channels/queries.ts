import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { channels } from "@/lib/db/schema/channels";

type Input = { input: { id: number } };

export const getChannelById = async ({ input: { id: channelId } }: Input) => {
  const [c] = await db
    .select()
    .from(channels)
    .where(eq(channels.id, channelId));
  return c;
};
