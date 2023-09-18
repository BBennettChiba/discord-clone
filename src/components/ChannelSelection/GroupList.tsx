"use client";

import { trpc } from "@/lib/trpc/client";
import { Group } from "./Group";

export const GroupList = ({ serverId }: { serverId: number }) => {
  const { data: groups, isLoading } = trpc.groups.getGroupByServerId.useQuery({
    serverId,
  });

  if (isLoading) return <>loading</>;

  if (!groups) throw new Error("No groups");

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-900">
      <ul>
        {groups.map((group) => (
          <Group key={group.id} group={group} />
        ))}
      </ul>
    </div>
  );
};
