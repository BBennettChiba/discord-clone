import { and, desc, eq, lte } from "drizzle-orm";
import { messages } from "@/lib/db/schema/messages";
import { type AuthedContext } from "@/lib/trpc/context";

type GetMessageByIdInput = {
  input: { id: number };
  ctx: AuthedContext;
};

export const getMessageById = async ({
  input: { id },
  ctx: { db },
}: GetMessageByIdInput) => {
  const message = await db.query.messages.findFirst({
    where: eq(messages.id, id),
    with: {
      author: true,
      reactions: { with: { reactors: { with: { reactor: true } } } },
    },
  });
  return message;
};

const LIMIT = 20;

type GetMessagesByChannelIdInput = {
  input: { cursor?: Date; channelId: number };
  ctx: AuthedContext;
};

export const getMessagesByChannelId = async ({
  input: { channelId },
  input,
  ctx: { db },
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
    with: {
      author: true,
      reactions: { with: { reactors: { with: { reactor: true } } } },
    },
    orderBy: desc(messages.createdAt),
    limit: LIMIT,
  });

  let nextCursor: typeof cursor | undefined = undefined;

  if (m.length >= LIMIT) {
    const lastItem = m[m.length - 1];
    nextCursor = lastItem?.createdAt;
  }

  return {
    messages: m,
    nextCursor,
  };
};

/**@TODO adding and deleting messages in dom seems to cause one to disappear */
