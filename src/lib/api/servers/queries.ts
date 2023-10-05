import { eq, and } from "drizzle-orm";
import { type Session } from "next-auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import { servers } from "@/lib/db/schema/servers";
import { usersToServers } from "@/lib/db/schema/usersToServers";

type GetServersInput = {
  ctx: { session: Session };
};

export const getServers = async ({ ctx: { session } }: GetServersInput) => {
  const s = await db
    .select({ servers })
    .from(servers)
    .leftJoin(usersToServers, eq(usersToServers.serverId, servers.id))
    .leftJoin(users, eq(usersToServers.userId, users.id))
    .where(eq(users.id, session.user.id));

  return s.map((ser) => ser.servers);
};

type GetServerByIdInput = {
  input: { id: number };
};

export const getServerById = async ({
  input: { id: serverId },
}: GetServerByIdInput) => {
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

/**@TODO something, I forgot */
