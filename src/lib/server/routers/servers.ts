import { joinServer } from "@/lib/api/servers/mutations";
import { getServerById, getServers } from "@/lib/api/servers/queries";
import { serverIdSchema } from "@/lib/db/schema/servers";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const serversRouter = router({
  joinServer: protectedProcedure
    .input(serverIdSchema)
    .mutation(async ({ input }) => joinServer({ id: input.id })),
  getServers: protectedProcedure.query(async () => getServers()),
  getServerById: publicProcedure
    .input(serverIdSchema)
    .query(async ({ input }) => getServerById({ id: input.id })),
});

/**@TODO rewrite to most routes are protected and send the session */
