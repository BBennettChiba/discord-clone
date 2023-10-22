import { and, eq, inArray } from "drizzle-orm";
import { channels } from "@/lib/db/schema/channels";
import { groups } from "@/lib/db/schema/groups";
import { usersToChannels } from "@/lib/db/schema/usersToChannels";
import { type AuthedContext } from "@/lib/trpc/context";

type SubscribeInput = {
  input: { id: number };
  ctx: AuthedContext;
};

export const unsubscribeFromGroup = async ({
  input: { id: groupId },
  ctx: { session, db },
}: SubscribeInput) => {
  const channelIds = await db
    .select({
      id: channels.id,
    })
    .from(channels)
    .leftJoin(groups, eq(channels.groupId, groups.id))
    .where(eq(groups.id, groupId));
  const d = await db
    .delete(usersToChannels)
    .where(
      and(
        eq(usersToChannels.userId, session.user.id),
        inArray(
          usersToChannels.channelId,
          channelIds.map((c) => c.id),
        ),
      ),
    )
    .returning();
  return d;
};

export const subscribeToGroup = async ({
  input: { id: groupId },
  ctx: { session, db },
}: SubscribeInput) => {
  const channelIds = await db
    .select({
      id: channels.id,
    })
    .from(channels)
    .leftJoin(groups, eq(channels.groupId, groups.id))
    .where(eq(groups.id, groupId));
  const d = await db
    .insert(usersToChannels)
    .values(
      channelIds.map((c) => ({ channelId: c.id, userId: session.user.id })),
    )
    .onConflictDoNothing()
    .returning();
  return d;
};
