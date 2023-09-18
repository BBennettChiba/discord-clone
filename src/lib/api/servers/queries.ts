import { eq, and } from "drizzle-orm";
// import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  type ServerId,
  serverIdSchema,
  servers,
  // type Server,
} from "@/lib/db/schema/servers";
// import { usersToServers } from "@/lib/db/schema/usersToServers";

/* get servers where the user is a member of */

export const getServers = async () => {
  // const { session } = await getUserAuth();
  const s = await db.query.servers.findMany();
  return s;
};

export const getServerById = async ({ id }: ServerId) => {
  // const { session } = await getUserAuth();
  const { id: serverId } = serverIdSchema.parse({ id });
  const [server] = await db
    .select()
    .from(servers)
    .where(
      and(
        eq(servers.id, serverId),
        // eq(
        //   usersToServers.userId,
        //   session?.user.id || throwError("no session in getMessageById"),
        // ),
      ),
    );
  return server;
};

// const throwError = (msg: string): never => {
//   throw new Error(msg);
// };
