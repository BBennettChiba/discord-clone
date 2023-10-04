import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  type InviteId,
  inviteIdSchema,
  invites,
} from "@/lib/db/schema/invites";

export const getInviteById = async (id: InviteId) => {
  const { id: inviteId } = inviteIdSchema.parse({ id });
  const invite = db.query.invites.findFirst({
    where: eq(invites.id, inviteId),
    with: { creator: true, server: true },
  });
  return invite;
};
