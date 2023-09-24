import { varchar, serial, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { type getReactions } from "@/lib/api/reactions/queries";

export const reactions = pgTable("reactions", {
  id: serial("id").primaryKey(),
  emoji: varchar("emoji", { length: 10 }).notNull(),
});

// Schema for reactions - used to validate API requests
export const insertReactionSchema = createInsertSchema(reactions);

export const insertReactionParams = createSelectSchema(reactions, {}).omit({
  id: true,
});

export const updateReactionSchema = createSelectSchema(reactions);

export const updateReactionParams = createSelectSchema(reactions, {});

export const reactionIdSchema = updateReactionSchema.pick({ id: true });

// Types for reactions - used to type API request params and within Components
export type Reaction = z.infer<typeof updateReactionSchema>;
export type NewReaction = z.infer<typeof insertReactionSchema>;
export type NewReactionParams = z.infer<typeof insertReactionParams>;
export type UpdateReactionParams = z.infer<typeof updateReactionParams>;
export type ReactionId = z.infer<typeof reactionIdSchema>["id"];

// this type infers the return from getReactions() - meaning it will include any joins
export type CompleteReaction = Awaited<
  ReturnType<typeof getReactions>
>["reactions"][number];
