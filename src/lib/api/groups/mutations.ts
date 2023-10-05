import { and, eq, inArray } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { channels } from "@/lib/db/schema/channels";
import { type GroupId, groupIdSchema, groups } from "@/lib/db/schema/groups";
import { usersToChannels } from "@/lib/db/schema/usersToChannels";

export const unsubscribeFromGroup = async (id: GroupId) => {
  const { session } = await getUserAuth();
  if (!session?.user) throw new Error("no user in unsubscribeFromGroup");
  const { id: groupId } = groupIdSchema.parse({ id });
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

export const subscribeToGroup = async (id: GroupId) => {
  const { session } = await getUserAuth();
  if (!session?.user) throw new Error("no user in subscribeToGroup");
  const { id: groupId } = groupIdSchema.parse({ id });
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

