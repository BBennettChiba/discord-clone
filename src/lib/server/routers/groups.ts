import {
  subscribeToGroup,
  unsubscribeFromGroup,
} from "@/lib/api/groups/mutations";
import { getGroupsByServerId } from "@/lib/api/groups/queries";
import {
  getGroupsByServerIdSchema,
  groupIdSchema,
} from "@/lib/db/schema/groups";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const groupsRouter = router({
  getGroupsByServerId: publicProcedure
    .input(getGroupsByServerIdSchema)
    .query(async ({ input }) => getGroupsByServerId(input)),
  unsubscribeFromGroup: protectedProcedure
    .input(groupIdSchema)
    .mutation(({ input }) => unsubscribeFromGroup(input.id)),
  subscribeToGroup: protectedProcedure
    .input(groupIdSchema)
    .mutation(({ input }) => subscribeToGroup(input.id)),
});
