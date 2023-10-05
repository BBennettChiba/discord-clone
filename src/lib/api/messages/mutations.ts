import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  type NewMessageParams,
  insertMessageSchema,
  messages,
} from "@/lib/db/schema/messages";
import { getMessageById as getMessageById } from "./queries";

export const createMessage = async (msgInput: NewMessageParams) => {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Session not found in createMessage");
  const newMessage = insertMessageSchema.parse({
    ...msgInput,
    authorId: session.user.id,
  });
  try {
    const [m] = await db.insert(messages).values(newMessage).returning();
    const message = await getMessageById(m.id);
    return { message };
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(errMessage);
    return { error: errMessage };
  }
};
