import { z } from "zod";
import { db } from "@/lib/db";
import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
  getUsersByChannel: publicProcedure
    .input(z.object({ channelId: z.number() }))
    .query(async () => await db.query.users.findMany()),
});
