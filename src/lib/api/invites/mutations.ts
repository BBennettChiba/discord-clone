import { type NewInviteParams, invites } from "@/lib/db/schema/invites";
import { type AuthedContext } from "@/lib/trpc/context";

type Input = {
  input: NewInviteParams;
  ctx: AuthedContext;
};

export const createInvite = async ({ input, ctx: { session, db } }: Input) => {
  const insertData = { ...input, creatorId: session.user.id };
  const [newInvite] = await db.insert(invites).values(insertData).returning();
  return newInvite;
};
