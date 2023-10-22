import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema/auth";
import { groups } from "@/lib/db/schema/groups";
import { type AuthedContext } from "@/lib/trpc/context";

type Input = {
  input: { serverId: number };
  ctx: AuthedContext;
};

export const getGroupsByServerId = async ({
  input: { serverId },
  ctx: { session, db },
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
