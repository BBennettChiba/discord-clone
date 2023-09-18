import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  type MessageByChannelId,
  MessageByChannelIdSchema,
  messages,
} from "@/lib/db/schema/messages";

export const getMessages = async () => {
  const m = await db.query.messages.findMany();

  return m;
};

export const getMessagesByChannelId = async (input: MessageByChannelId) => {
  // const { session } = await getUserAuth();
  const { channelId } = MessageByChannelIdSchema.parse(input);
  const m = await db.query.messages.findMany({
    where: eq(messages.channelId, channelId),
    with: { author: true },
  });
  return m;
};
