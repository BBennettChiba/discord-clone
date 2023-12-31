import {
  createMessage,
  deleteMessage,
  editMessage,
} from "@/lib/api/messages/mutations";
import {
  getMessageById,
  getMessagesByChannelId,
} from "@/lib/api/messages/queries";
import {
  MessageByChannelIdSchema,
  insertMessageParams,
  messageIdSchema,
  updateMessageSchema,
} from "@/lib/db/schema/messages";
import { protectedProcedure, router } from "../trpc";

export const messagesRouter = router({
  getMessageById: protectedProcedure
    .input(messageIdSchema)
    .query(getMessageById),
  getMessagesByChannelId: protectedProcedure
    .input(MessageByChannelIdSchema)
    .query(getMessagesByChannelId),
  createMessage: protectedProcedure
    .input(insertMessageParams)
    .mutation(createMessage),
  deleteMessage: protectedProcedure
    .input(messageIdSchema)
    .mutation(deleteMessage),
  editMessage: protectedProcedure
    .input(updateMessageSchema)
    .mutation(editMessage),
});
