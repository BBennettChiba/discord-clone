import { and, eq, inArray } from "drizzle-orm";
import { type Session } from "next-auth";
import { db } from "@/lib/db";
import { channels } from "@/lib/db/schema/channels";
import { groups } from "@/lib/db/schema/groups";
import { usersToChannels } from "@/lib/db/schema/usersToChannels";

type SubscribeInput = {
  input: { id: number };
  ctx: { session: Session };
};

export const unsubscribeFromGroup = async ({
  input: { id: groupId },
  ctx: { session },
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
  ctx: { session },
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
