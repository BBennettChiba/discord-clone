import { createMessage, deleteMessage } from "@/lib/api/messages/mutations";
import { getMessagesByChannelId } from "@/lib/api/messages/queries";
import {
  MessageByChannelIdSchema,
  insertMessageParams,
  messageIdSchema,
} from "@/lib/db/schema/messages";
import { protectedProcedure, router } from "../trpc";

export const messagesRouter = router({
  getMessagesByChannelId: protectedProcedure
    .input(MessageByChannelIdSchema)
    .query(getMessagesByChannelId),
  createMessage: protectedProcedure
    .input(insertMessageParams)
    .mutation(createMessage),
  deleteMessage: protectedProcedure
    .input(messageIdSchema)
    .mutation(deleteMessage),
});
