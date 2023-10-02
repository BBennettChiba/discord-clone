import { eq } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import { groups } from "@/lib/db/schema/groups";

export const getGroupsByServerId = async ({
  serverId,
}: {
  serverId: number;
}) => {
  const { session } = await getUserAuth();
  if (!session?.user) throw new Error("no user found in getGroupByServerId");
  const gs = await db.query.groups.findMany({
    with: { channels: true },
    where: eq(groups.serverId, serverId),
  });
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
    with: { channels: { with: { channel: true } } },
  });
  return gs.map((g) => ({
    ...g,
    channels: g.channels.map((c) => ({
      ...c,
      isUserSubscribed: !!user?.channels.find(
        (chan) => chan.channel.id === c.id,
      ),
    })),
  }));
};
