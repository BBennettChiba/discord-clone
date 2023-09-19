import { and, eq } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  type ServerId,
  type NewServerParams,
  type UpdateServerParams,
  updateServerSchema,
  insertServerSchema,
  servers,
  serverIdSchema,
} from "@/lib/db/schema/servers";

export const createServer = async (server: NewServerParams) => {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Session not found in createServer");
  const newServer = insertServerSchema.parse({
    ...server,
    userId: session.user.id,
  });
  try {
    const [s] = await db.insert(servers).values(newServer).returning();
    return { server: s };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateServer = async (
  id: ServerId,
  server: UpdateServerParams,
) => {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Session not found in updateServer");
  const { id: serverId } = serverIdSchema.parse({ id });
  const newServer = updateServerSchema.parse({
    ...server,
    userId: session.user.id,
  });
  try {
    const [s] = await db
      .update(servers)
      .set(newServer)
      .where(
        and(eq(servers.id, serverId), eq(servers.ownerId, session.user.id)),
      )
      .returning();
    return { server: s };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteServer = async (id: ServerId) => {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Session not found in deleteServer");
  const { id: serverId } = serverIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(servers)
      .where(
        and(eq(servers.id, serverId), eq(servers.ownerId, session.user.id)),
      )
      .returning();
    return { server: s };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
