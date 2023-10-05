import {
  subscribeToGroup,
  unsubscribeFromGroup,
} from "@/lib/api/groups/mutations";
import { getGroupsByServerId } from "@/lib/api/groups/queries";
import {
  getGroupsByServerIdSchema,
  groupIdSchema,
} from "@/lib/db/schema/groups";
import { protectedProcedure,  router } from "../trpc";

export const groupsRouter = router({
  getGroupsByServerId:protectedProcedure 
    .input(getGroupsByServerIdSchema)
    .query(getGroupsByServerId),
  unsubscribeFromGroup: protectedProcedure
    .input(groupIdSchema)
    .mutation(unsubscribeFromGroup),
  subscribeToGroup: protectedProcedure
    .input(groupIdSchema)
    .mutation(subscribeToGroup),
});
