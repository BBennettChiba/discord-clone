import { toggleChannelSubscription } from "@/lib/api/channels/mutations";
import { getChannelById } from "@/lib/api/channels/queries";
import { channelIdSchema } from "@/lib/db/schema/channels";
import { protectedProcedure, router } from "../trpc";

export const channelsRouter = router({
  getChannelById: protectedProcedure
    .input(channelIdSchema)
    .query(getChannelById),
  toggleChannelSubscription: protectedProcedure
    .input(channelIdSchema)
    .mutation(toggleChannelSubscription),
});
