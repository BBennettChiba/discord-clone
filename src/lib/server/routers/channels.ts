import {
  createChannel,
  deleteChannel,
  updateChannel,
} from "@/lib/api/channels/mutations";
import { getChannelById } from "@/lib/api/channels/queries";
import {
  channelIdSchema,
  insertChannelParams,
  updateChannelParams,
} from "@/lib/db/schema/channels";
import { publicProcedure, router } from "../trpc";

export const channelsRouter = router({
  // getChannels: publicProcedure.query(async () => getChannels()),
  getChannelById: publicProcedure
    .input(channelIdSchema)
    .query(async ({ input }) => getChannelById(input.id)),
  createChannel: publicProcedure
    .input(insertChannelParams)
    .mutation(async ({ input }) => createChannel(input)),
  updateChannel: publicProcedure
    .input(updateChannelParams)
    .mutation(async ({ input }) => updateChannel(input.id, input)),
  deleteChannel: publicProcedure
    .input(channelIdSchema)
    .mutation(async ({ input }) => deleteChannel(input.id)),
});
