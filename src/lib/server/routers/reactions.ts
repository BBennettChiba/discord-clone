import z from "zod";
import { createReaction, toggleReaction } from "@/lib/api/reactions/mutations";
import { protectedProcedure, router } from "../trpc";

const reactionSchema = z.object({
  reactionId: z.string(),
  messageId: z.number(),
});

export const reactionsRouter = router({
  createReaction: protectedProcedure
    .input(reactionSchema)
    .mutation(createReaction),
  toggleReaction: protectedProcedure
    .input(reactionSchema)
    .mutation(toggleReaction),
});
