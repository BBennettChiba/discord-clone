import { and, desc, eq, lte } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  messages,
} from "@/lib/db/schema/messages";

type GetMessageByIdInput = {
  input: { id: number };
};

export const getMessageById = async ({
  input: { id },
}: GetMessageByIdInput) => {
  const message = await db.query.messages.findFirst({
    where: eq(messages.id, id),
    with: { author: true },
  });
  return message;
};

const LIMIT = 10;

type GetMessagesByChannelIdInput = {
  input: { cursor?: Date; channelId: number };
};

export const getMessagesByChannelId = async ({
  input: { channelId },
  input,
}: GetMessagesByChannelIdInput) => {
  let cursor = input.cursor;

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
    limit: LIMIT + 1,
  });

  let nextCursor: typeof cursor | undefined = undefined;

  if (m.length > LIMIT) {
    const nextItem = m.pop();
    nextCursor = nextItem?.createdAt;
  }

  return {
    messages: m,
    nextCursor,
  };
};
