import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema/auth";
import { servers } from "@/lib/db/schema/servers";
import { usersToServers } from "@/lib/db/schema/usersToServers";
import { type AuthedContext } from "@/lib/trpc/context";

type GetServersInput = {
  ctx: AuthedContext;
};

export const getServers = async ({ ctx: { session, db } }: GetServersInput) => {
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
  ctx: AuthedContext;
};

export const getServerById = async ({
  input: { id: serverId },
  ctx: { db, session },
}: GetServerByIdInput) => {
  const server = await db.query.servers.findFirst({
    where: eq(servers.id, serverId),
    with: { groups: { with: { channels: true } } },
  });

  if (!server) throw new Error("could not find server");

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
    with: { channels: true },
  });
  return {
    ...server,
    groups: server.groups.map((g) => ({
      ...g,
      channels: g.channels.map((c) => ({ ...c, isUserSubscribed: !!user?.channels.find(chan => chan.channelId === c.id)})),
    })),
  };
};
