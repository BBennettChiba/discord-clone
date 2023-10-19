import z from "zod";
import { createReaction } from "@/lib/api/reactions/mutations";
import { protectedProcedure, router } from "../trpc";

const createReactionSchema = z.object({
  reactionId: z.string(),
  messageId: z.number(),
});

export const reactionsRouter = router({
  createReaction: protectedProcedure
    .input(createReactionSchema)
    .mutation(createReaction),
});
