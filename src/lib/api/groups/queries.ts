import { eq } from "drizzle-orm";
import { type Session } from "next-auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import { groups } from "@/lib/db/schema/groups";

type Input = {
  input: { serverId: number };
  ctx: { session: Session };
};

export const getGroupsByServerId = async ({
  input: { serverId },
  ctx: { session },
}: Input) => {
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
