// import {
//   createGroup,
//   deleteGroup,
//   updateGroup,
// } from "@/lib/api/groups/mutations";
import {
  subscribeToGroup,
  unsubscribeFromGroup,
} from "@/lib/api/groups/mutations";
import { getGroupsByServerId } from "@/lib/api/groups/queries";
import {
  getGroupsByServerIdSchema,
  groupIdSchema,
  // insertGroupParams,
  // updateGroupParams,
} from "@/lib/db/schema/groups";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const groupsRouter = router({
  // getGroups: publicProcedure.query(() => getGroups()),
  getGroupsByServerId: publicProcedure
    .input(getGroupsByServerIdSchema)
    .query(async ({ input }) => getGroupsByServerId(input)),
  // createGroup: publicProcedure
  //   .input(insertGroupParams)
  //   .mutation(async ({ input }) => createGroup(input)),
  // updateGroup: publicProcedure
  //   .input(updateGroupParams)
  //   .mutation(async ({ input }) => updateGroup(input.id, input)),
  // deleteGroup: publicProcedure
  //   .input(groupIdSchema)
  //   .mutation(async ({ input }) => deleteGroup(input.id)),
  unsubscribeFromGroup: protectedProcedure
    .input(groupIdSchema)
    .mutation(({ input }) => unsubscribeFromGroup(input.id)),
  subscribeToGroup: protectedProcedure
    .input(groupIdSchema)
    .mutation(({ input }) => subscribeToGroup(input.id)),
});
