import { type Session } from "next-auth";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  type NewMessageParams,
  insertMessageSchema,
  messages,
} from "@/lib/db/schema/messages";
import { getMessageById as getMessageById } from "./queries";

type CreateMessageInput = {
  input: NewMessageParams;
  ctx: { session: Session };
};

export const createMessage = async ({
  input: msgInput,
}: CreateMessageInput) => {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Session not found in createMessage");
  const newMessage = insertMessageSchema.parse({
    ...msgInput,
    authorId: session.user.id,
  });
  try {
    const [m] = await db.insert(messages).values(newMessage).returning();
    if (!m) throw new Error("messages not found in createMessage");
    const message = await getMessageById({ input: { id: m.id } });
    return { message };
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(errMessage);
    return { error: errMessage };
  }
};
