import { getInviteById } from "@/lib/api/invites/queries";
import { inviteIdSchema } from "@/lib/db/schema/invites";
import { publicProcedure, router } from "../trpc";

export const invitesRouter = router({
  getInviteById: publicProcedure
    .input(inviteIdSchema)
    .query(async ({ input }) => getInviteById(input.id)),
});
