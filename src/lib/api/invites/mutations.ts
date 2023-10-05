import { type Session } from "next-auth";
import { db } from "@/lib/db";
import {
  type NewInviteParams,
  insertInviteSchema,
  invites,
} from "@/lib/db/schema/invites";

type Input = {
  input: NewInviteParams;
  ctx: { session: Session };
};

export const createInvite = async ({ input, ctx: { session } }: Input) => {
  const newInvite = insertInviteSchema.parse({
    ...input,
    userId: session.user.id,
  });
  const [i] = await db.insert(invites).values(newInvite).returning();
  return i;
};
