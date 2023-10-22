import { usersToServers } from "@/lib/db/schema/usersToServers";
import { type AuthedContext } from "@/lib/trpc/context";

type Input = {
  input: { id: number };
  ctx: AuthedContext;
};

export const joinServer = async ({
  input: { id: serverId },
  ctx: { session, db },
}: Input) => {
  const [insert] = await db
    .insert(usersToServers)
    .values({ serverId, userId: session.user.id })
    .onConflictDoNothing()
    .returning();
  if (!insert) throw new Error("Could not insert into usersToServers");
  return insert;
};
