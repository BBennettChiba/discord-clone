import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { 
  InviteId, 
  NewInviteParams,
  UpdateInviteParams, 
  updateInviteSchema,
  insertInviteSchema, 
  invites,
  inviteIdSchema 
} from "@/lib/db/schema/invites";
import { getUserAuth } from "@/lib/auth/utils";

export const createInvite = async (invite: NewInviteParams) => {
  const { session } = await getUserAuth();
  const newInvite = insertInviteSchema.parse({ ...invite, userId: session?.user.id! });
  try {
    const [i] =  await db.insert(invites).values(newInvite).returning();
    return { invite: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateInvite = async (id: InviteId, invite: UpdateInviteParams) => {
  const { session } = await getUserAuth();
  const { id: inviteId } = inviteIdSchema.parse({ id });
  const newInvite = updateInviteSchema.parse({ ...invite, userId: session?.user.id! });
  try {
    const [i] =  await db
     .update(invites)
     .set(newInvite)
     .where(and(eq(invites.id, inviteId!), eq(invites.userId, session?.user.id!)))
     .returning();
    return { invite: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteInvite = async (id: InviteId) => {
  const { session } = await getUserAuth();
  const { id: inviteId } = inviteIdSchema.parse({ id });
  try {
    const [i] =  await db.delete(invites).where(and(eq(invites.id, inviteId!), eq(invites.userId, session?.user.id!)))
    .returning();
    return { invite: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

