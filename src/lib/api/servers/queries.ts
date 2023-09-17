import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ServerId, serverIdSchema, servers } from "@/lib/db/schema/servers";

export const getServers = async () => {
  const { session } = await getUserAuth();
  const s = await db.select().from(servers).where(eq(servers.userId, session?.user.id!));
  return { servers: s };
};

export const getServerById = async (id: ServerId) => {
  const { session } = await getUserAuth();
  const { id: serverId } = serverIdSchema.parse({ id });
  const [s] = await db.select().from(servers).where(and(eq(servers.id, serverId), eq(servers.userId, session?.user.id!)));
  return { server: s };
};

