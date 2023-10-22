import { and, eq } from "drizzle-orm";
import {
  type NewMessageParams,
  messages,
  type MessageId,
} from "@/lib/db/schema/messages";
import { type AuthedContext } from "@/lib/trpc/context";
import { getMessageById as getMessageById } from "./queries";

type CreateMessageInput = {
  input: NewMessageParams;
} & CTX;

type CTX = {
  ctx: AuthedContext;
};

export const createMessage = async ({
  input: msgInput,
  ctx: { db, session },
  ctx
}: CreateMessageInput) => {
  const newMessage = {
    ...msgInput,
    authorId: session.user.id,
  };
  try {
    const [m] = await db.insert(messages).values(newMessage).returning();
    if (!m) throw new Error("messages not found in createMessage");
    const message = await getMessageById({ input: { id: m.id }, ctx });
    return { message };
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(errMessage);
    return { error: errMessage };
  }
};

type DeleteMessageInput = {
  input: MessageId;
} & CTX;

export const deleteMessage = async ({
  input: { id },
  ctx: { session, db },
}: DeleteMessageInput) => {
  const [d] = await db
    .delete(messages)
    .where(and(eq(messages.id, id), eq(messages.authorId, session.user.id)))
    .returning();
  if (!d) throw new Error("Error deleting messages");
  return d;
};
