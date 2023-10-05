import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { invites } from "@/lib/db/schema/invites";
import { usersToServers } from "@/lib/db/schema/usersToServers";

type Input = {
  input: { id: string };
};

export const getInviteById = async ({ input: { id: inviteId } }: Input) => {
  const invite = await db.query.invites.findFirst({
    where: eq(invites.id, inviteId),
    with: { creator: true, server: true },
  });

  const [{ numberOfMembers }] = await db
    .select({
      numberOfMembers: sql<number>`count(${usersToServers.userId})`
        .mapWith(Number)
        .as("count"),
    })
    .from(usersToServers)
    .leftJoin(invites, eq(invites.serverId, usersToServers.serverId))
    .where(eq(invites.serverId, usersToServers.serverId));

  const inviteWithCount = invite
    ? {
        ...invite,
        server: { ...invite.server, numberOfMembers },
      }
    : null;

  return inviteWithCount;
};
