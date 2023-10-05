import { joinServer } from "@/lib/api/servers/mutations";
import { getServerById, getServers } from "@/lib/api/servers/queries";
import { serverIdSchema } from "@/lib/db/schema/servers";
import { protectedProcedure, router } from "../trpc";

export const serversRouter = router({
  joinServer: protectedProcedure.input(serverIdSchema).mutation(joinServer),
  getServers: protectedProcedure.query(getServers),
  getServerById: protectedProcedure.input(serverIdSchema).query(getServerById),
});

/**@TODO rewrite to most routes are protected and send the session */
