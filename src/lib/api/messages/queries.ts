import { and, desc, eq, lt } from "drizzle-orm";
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

const limit = 10;

export const getMessagesByChannelId = async (input: MessageByChannelId) => {
  // const { session } = await getUserAuth();

  let { cursor } = MessageByChannelIdSchema.parse(input);
  const { channelId } = MessageByChannelIdSchema.parse(input);

  if (!cursor) cursor = new Date();

  const m = await db.query.messages.findMany({
    where: and(
      eq(messages.channelId, channelId),
      lt(messages.createdAt, cursor),
    ),
    with: { author: true },
    orderBy: desc(messages.createdAt),
    limit: limit + 1,
  });

  let nextCursor: typeof cursor | undefined = undefined;
  if (m.length > limit) {
    const nextItem = m.pop();
    nextCursor = nextItem?.createdAt;
  }

  return {
    messages: m,
    nextCursor,
  };
};
