import { type Session } from "next-auth";
import { db } from "@/lib/db";
import { usersToServers } from "@/lib/db/schema/usersToServers";

type Input = {
  input: { id: number };
  ctx: { session: Session };
};

export const joinServer = async ({
  input: { id: serverId },
  ctx: { session },
}: Input) => {
  const [insert] = await db
    .insert(usersToServers)
    .values({ serverId, userId: session.user.id })
    .onConflictDoNothing()
    .returning();
  return insert;
};
