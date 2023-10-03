import { and, eq, inArray } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { channels } from "@/lib/db/schema/channels";
import {
  type GroupId,
  type NewGroupParams,
  type UpdateGroupParams,
  updateGroupSchema,
  insertGroupSchema,
  groupIdSchema,
  groups,
} from "@/lib/db/schema/groups";
import { usersToChannels } from "@/lib/db/schema/usersToChannels";

export const createGroup = async (group: NewGroupParams) => {
  const newGroup = insertGroupSchema.parse(group);
  try {
    const [g] = await db.insert(groups).values(newGroup).returning();
    return { group: g };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";

    console.error(message);
    return { error: message };
  }
};

export const updateGroup = async (id: GroupId, group: UpdateGroupParams) => {
  const { id: groupId } = groupIdSchema.parse({ id });
  const newGroup = updateGroupSchema.parse(group);
  try {
    const [g] = await db
      .update(groups)
      .set(newGroup)
      .where(eq(groups.id, groupId))
      .returning();
    return { group: g };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteGroup = async (id: GroupId) => {
  const { id: groupId } = groupIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(groups)
      .where(eq(groups.id, groupId))
      .returning();
    return { group: g };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

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

/*
  DELETE FROM user_channel
  WHERE user_id = <UserID>
    AND channel_id IN (
     SELECT c.channel_id
     FROM channels c
     JOIN groups g ON c.group_id = g.group_id
     WHERE g.group_id = <GroupID>
  );
 */
