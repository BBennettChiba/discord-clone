import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { groups } from "@/lib/db/schema/groups";

export const getGroupsByServerId = async ({
  serverId,
}: {
  serverId: number;
}) => {
  const g = await db.query.groups.findMany({
    with: { channels: true },
    where: eq(groups.serverId, serverId),
  });
  return g;
};
