import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import { usersToChannels } from "@/lib/db/schema/usersToChannels";
import { publicProcedure, router } from "../trpc";

const isNotNull = <T>(item: T | null): item is T => item !== null;

export const usersRouter = router({
  getUsersByChannel: publicProcedure
    .input(z.object({ channelId: z.number() }))
    .query(async ({ input: { channelId } }) => {
      const members = (
        await db
          .select({ user: users })
          .from(usersToChannels)
          .leftJoin(users, eq(users.id, usersToChannels.userId))
          .where(eq(usersToChannels.channelId, channelId))
      )
        .map((m) => m.user)
        .filter(isNotNull);
      return members;
    }),
});

/**@TODO  */
