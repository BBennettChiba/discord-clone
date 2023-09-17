import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { 
  ServerId, 
  NewServerParams,
  UpdateServerParams, 
  updateServerSchema,
  insertServerSchema, 
  servers,
  serverIdSchema 
} from "@/lib/db/schema/servers";
import { getUserAuth } from "@/lib/auth/utils";

export const createServer = async (server: NewServerParams) => {
  const { session } = await getUserAuth();
  const newServer = insertServerSchema.parse({ ...server, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(servers).values(newServer).returning();
    return { server: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateServer = async (id: ServerId, server: UpdateServerParams) => {
  const { session } = await getUserAuth();
  const { id: serverId } = serverIdSchema.parse({ id });
  const newServer = updateServerSchema.parse({ ...server, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(servers)
     .set(newServer)
     .where(and(eq(servers.id, serverId!), eq(servers.userId, session?.user.id!)))
     .returning();
    return { server: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteServer = async (id: ServerId) => {
  const { session } = await getUserAuth();
  const { id: serverId } = serverIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(servers).where(and(eq(servers.id, serverId!), eq(servers.userId, session?.user.id!)))
    .returning();
    return { server: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

