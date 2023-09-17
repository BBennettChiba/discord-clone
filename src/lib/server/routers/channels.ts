import { getChannelById, getChannels } from "@/lib/api/channels/queries";
import { publicProcedure, router } from "../trpc";
import {
  channelIdSchema,
  insertChannelParams,
  updateChannelParams,
} from "@/lib/db/schema/channels";
import { createChannel, deleteChannel, updateChannel } from "@/lib/api/channels/mutations";

export const channelsRouter = router({
  getChannels: publicProcedure.query(async () => {
    return getChannels();
  }),
  getChannelById: publicProcedure.input(channelIdSchema).query(async ({ input }) => {
    return getChannelById(input.id);
  }),
  createChannel: publicProcedure
    .input(insertChannelParams)
    .mutation(async ({ input }) => {
      return createChannel(input);
    }),
  updateChannel: publicProcedure
    .input(updateChannelParams)
    .mutation(async ({ input }) => {
      return updateChannel(input.id, input);
    }),
  deleteChannel: publicProcedure
    .input(channelIdSchema)
    .mutation(async ({ input }) => {
      return deleteChannel(input.id);
    }),
});
