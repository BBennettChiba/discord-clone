import { and, eq } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  type MessageId,
  type NewMessageParams,
  type UpdateMessageParams,
  updateMessageSchema,
  insertMessageSchema,
  messages,
  messageIdSchema,
} from "@/lib/db/schema/messages";
import { getMesasgeById as getMessageById } from "./queries";

export const createMessage = async (msgInput: NewMessageParams) => {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Session not found in createMessage");
  const newMessage = insertMessageSchema.parse({
    ...msgInput,
    authorId: session.user.id,
  });
  try {
    const [m] = await db
      .insert(messages)
      .values(newMessage)
      .returning();
    const message = await getMessageById(m.id) 
    return { message  };
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(errMessage);
    return { error: errMessage };
  }
};

export const updateMessage = async (
  id: MessageId,
  message: UpdateMessageParams,
) => {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Session not found in updateMessage");
  const { id: messageId } = messageIdSchema.parse({ id });
  const newMessage = updateMessageSchema.parse({
    ...message,
    userId: session.user.id,
  });
  try {
    const [m] = await db
      .update(messages)
      .set(newMessage)
      .where(
        and(eq(messages.id, messageId), eq(messages.authorId, session.user.id)),
      )
      .returning();
    return { message: m };
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: errMessage };
  }
};

export const deleteMessage = async (id: MessageId) => {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Session not found in deleteMessage");
  const { id: messageId } = messageIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(messages)
      .where(
        and(eq(messages.id, messageId), eq(messages.authorId, session.user.id)),
      )
      .returning();
    return { message: m };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
