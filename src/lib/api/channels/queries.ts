import { eq } from "drizzle-orm";
import { channels } from "@/lib/db/schema/channels";
import { type Context as AuthedContext } from "@/lib/trpc/context";

type GetChannelByIdInput = { input: { id: number }; ctx: AuthedContext };

export const getChannelById = async ({
  input: { id: channelId },
  ctx: { db },
}: GetChannelByIdInput) => {
  const [c] = await db
    .select()
    .from(channels)
    .where(eq(channels.id, channelId));
  if (!c) throw new Error(`Channel ${channelId} not found in getChannelById`);
  return c;
};
