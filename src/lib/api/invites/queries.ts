import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { invites } from "@/lib/db/schema/invites";
import { usersToServers } from "@/lib/db/schema/usersToServers";
import { throwError } from "@/lib/utils";

type Input = {
  input: { id: string };
};

export const getInviteById = async ({ input: { id: inviteId } }: Input) => {
  const invite = await db.query.invites.findFirst({
    where: eq(invites.id, inviteId),
    with: { creator: true, server: true },
  });

  if (!invite) throw new Error("No invite found");

  const [usersToServersQueryResult] = await db
    .select({
      numberOfMembers: sql<number>`count(*)`.mapWith(Number).as("count"),
    })
    .from(usersToServers)
    .where(eq(usersToServers.serverId, invite.server.id));

  if (!usersToServersQueryResult)
    return throwError("no usersToServersQueryResult found in getInviteById");
  const { numberOfMembers } = usersToServersQueryResult;

  const inviteWithCount = {
    ...invite,
    server: { ...invite.server, numberOfMembers },
  };

  return inviteWithCount;
};
