"use client";
import { trpc } from "@/lib/trpc/client";
import { Group } from "./Group";

export const GroupList = ({ serverId }: { serverId: number }) => {
  const { data: groups, isError } = trpc.groups.getGroupsByServerId.useQuery({
    serverId,
  });

  if (isError) return "error";

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-900">
      <ul>
        {groups
          ?.filter((g) => !g.channels.every((c) => !c.isUserSubscribed))
          .map((group) => <Group key={group.id} group={group} />)}
      </ul>
    </div>
  );
};
