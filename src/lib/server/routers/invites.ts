import { createInvite } from "@/lib/api/invites/mutations";
import { getInviteById } from "@/lib/api/invites/queries";
import { insertInviteParams, inviteIdSchema } from "@/lib/db/schema/invites";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const invitesRouter = router({
  getInviteById: publicProcedure
    .input(inviteIdSchema)
    .query(getInviteById),
  createInvite: protectedProcedure.input(insertInviteParams).mutation(createInvite)
});
