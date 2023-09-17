import { getServerById, getServers } from "@/lib/api/servers/queries";
import { publicProcedure, router } from "../trpc";
import {
  serverIdSchema,
  insertServerParams,
  updateServerParams,
} from "@/lib/db/schema/servers";
import { createServer, deleteServer, updateServer } from "@/lib/api/servers/mutations";

export const serversRouter = router({
  getServers: publicProcedure.query(async () => {
    return getServers();
  }),
  getServerById: publicProcedure.input(serverIdSchema).query(async ({ input }) => {
    return getServerById(input.id);
  }),
  createServer: publicProcedure
    .input(insertServerParams)
    .mutation(async ({ input }) => {
      return createServer(input);
    }),
  updateServer: publicProcedure
    .input(updateServerParams)
    .mutation(async ({ input }) => {
      return updateServer(input.id, input);
    }),
  deleteServer: publicProcedure
    .input(serverIdSchema)
    .mutation(async ({ input }) => {
      return deleteServer(input.id);
    }),
});
