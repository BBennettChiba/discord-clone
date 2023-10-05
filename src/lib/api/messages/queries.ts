import { and, desc, eq, lte } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  type MessageByChannelId,
  MessageByChannelIdSchema,
  messages,
} from "@/lib/db/schema/messages";

export const getMessageById = async (id: number) => {
  const message = await db.query.messages.findFirst({
    where: eq(messages.id, id),
    with: { author: true },
  });
  return message;
};

const limit = 10;

export const getMessagesByChannelId = async (input: MessageByChannelId) => {
  let { cursor } = MessageByChannelIdSchema.parse(input);
  const { channelId } = MessageByChannelIdSchema.parse(input);

  if (!cursor) {
    cursor = new Date();
    cursor.setDate(cursor.getDate() + 1);
  }

  const m = await db.query.messages.findMany({
    where: and(
      eq(messages.channelId, channelId),
      lte(messages.createdAt, cursor),
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
