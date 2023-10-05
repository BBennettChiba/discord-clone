import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { type ServerId, serverIdSchema } from "@/lib/db/schema/servers";
import { usersToServers } from "@/lib/db/schema/usersToServers";

export const joinServer = async (id: ServerId) => {
  const { id: serverId } = serverIdSchema.parse(id);
  const { session } = await getUserAuth();
  if (!session) throw new Error("no session in join server");
  const [insert] = await db
    .insert(usersToServers)
    .values({ serverId, userId: session.user.id })
    .onConflictDoNothing()
    .returning();
  return insert;
};
