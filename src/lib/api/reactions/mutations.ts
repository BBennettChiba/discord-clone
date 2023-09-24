import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { 
  ReactionId, 
  NewReactionParams,
  UpdateReactionParams, 
  updateReactionSchema,
  insertReactionSchema, 
  reactions,
  reactionIdSchema 
} from "@/lib/db/schema/reactions";

export const createReaction = async (reaction: NewReactionParams) => {
  const newReaction = insertReactionSchema.parse(reaction);
  try {
    const [r] =  await db.insert(reactions).values(newReaction).returning();
    return { reaction: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateReaction = async (id: ReactionId, reaction: UpdateReactionParams) => {
  const { id: reactionId } = reactionIdSchema.parse({ id });
  const newReaction = updateReactionSchema.parse(reaction);
  try {
    const [r] =  await db
     .update(reactions)
     .set(newReaction)
     .where(eq(reactions.id, reactionId!))
     .returning();
    return { reaction: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteReaction = async (id: ReactionId) => {
  const { id: reactionId } = reactionIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(reactions).where(eq(reactions.id, reactionId!))
    .returning();
    return { reaction: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

