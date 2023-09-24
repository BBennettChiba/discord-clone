import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { type ReactionId, reactionIdSchema, reactions } from "@/lib/db/schema/reactions";

export const getReactions = async () => {
  const r = await db.select().from(reactions);
  return { reactions: r };
};

export const getReactionById = async (id: ReactionId) => {
  const { id: reactionId } = reactionIdSchema.parse({ id });
  const [r] = await db.select().from(reactions).where(eq(reactions.id, reactionId));
  return { reaction: r };
};

