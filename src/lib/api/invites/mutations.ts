import { type Session } from "next-auth";
import { db } from "@/lib/db";
import { type NewInviteParams, invites } from "@/lib/db/schema/invites";

type Input = {
  input: NewInviteParams;
  ctx: { session: Session };
};

export const createInvite = async ({ input, ctx: { session } }: Input) => {
  const newInvite = { ...input, creatorId: session.user.id };
  const [i] = await db.insert(invites).values(newInvite).returning();
  return i;
};
