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

  if (!invite) throw new Error("No invite found");

  const [{ numberOfMembers }] = await db
    .select({
      numberOfMembers: sql<number>`count(*)`.mapWith(Number).as("count"),
    })
    .from(usersToServers)
    // .leftJoin(invites, eq(invite.server.id, usersToServers.serverId));
    .where(eq(usersToServers.serverId, invite.server.id));

  const inviteWithCount = {
    ...invite,
    server: { ...invite.server, numberOfMembers },
  };

  return inviteWithCount;
};
