import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type MessageId, messageIdSchema, messages } from "@/lib/db/schema/messages";
import { channels } from "@/lib/db/schema/channels";

export const getMessages = async () => {
  const { session } = await getUserAuth();
  const m = await db.select({ message: messages, channel: channels }).from(messages).leftJoin(channels, eq(messages.channelId, channels.id)).where(eq(messages.userId, session?.user.id!));
  return { messages: m };
};

export const getMessageById = async (id: MessageId) => {
  const { session } = await getUserAuth();
  const { id: messageId } = messageIdSchema.parse({ id });
  const [m] = await db.select().from(messages).where(and(eq(messages.id, messageId), eq(messages.userId, session?.user.id!))).leftJoin(channels, eq(messages.channelId, channels.id));
  return { message: m };
};

