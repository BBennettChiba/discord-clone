// import {
// createMessage,
// deleteMessage,
// updateMessage,
// } from "@/lib/api/messages/mutations";
import { createMessage } from "@/lib/api/messages/mutations";
import {
  getMessagesByChannelId,
  getMessages,
} from "@/lib/api/messages/queries";
import {
  MessageByChannelIdSchema,
  insertMessageParams,
  // insertMessageParams,
  // updateMessageParams,
} from "@/lib/db/schema/messages";
import { publicProcedure, router } from "../trpc";

export const messagesRouter = router({
  getMessages: publicProcedure.query(async () => getMessages()),
  getMessagesByChannelId: publicProcedure
    .input(MessageByChannelIdSchema)
    .query(async ({ input }) => getMessagesByChannelId(input)),
  createMessage: publicProcedure
    .input(insertMessageParams)
    .mutation(async ({ input }) => createMessage(input)),
  // updateMessage: publicProcedure
  //   .input(updateMessageParams)
  //   .mutation(async ({ input }) => updateMessage(input.id, input)),
  // deleteMessage: publicProcedure
  //   .input(messageIdSchema)
  //   .mutation(async ({ input }) => deleteMessage(input.id)),
});
