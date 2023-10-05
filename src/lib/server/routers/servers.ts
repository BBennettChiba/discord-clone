import {
  createServer,
  deleteServer,
  joinServer,
  updateServer,
} from "@/lib/api/servers/mutations";
import { getServerById, getServers } from "@/lib/api/servers/queries";
import {
  serverIdSchema,
  insertServerParams,
  updateServerParams,
} from "@/lib/db/schema/servers";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const serversRouter = router({
  joinServer: protectedProcedure
    .input(serverIdSchema)
    .mutation(async ({ input }) => joinServer({ id: input.id })),
  getServers: publicProcedure.query(async () => getServers()),
  getServerById: publicProcedure
    .input(serverIdSchema)
    .query(async ({ input }) => getServerById({ id: input.id })),
  createServer: publicProcedure
    .input(insertServerParams)
    .mutation(async ({ input }) => createServer(input)),
  updateServer: publicProcedure
    .input(updateServerParams)
    .mutation(async ({ input }) => updateServer({ id: input.id }, input)),
  deleteServer: publicProcedure
    .input(serverIdSchema)
    .mutation(async ({ input }) => deleteServer({ id: input.id })),
});

/**@TODO rewrite to most routes are protected and send the session */
