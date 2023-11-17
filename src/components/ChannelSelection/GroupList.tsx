"use client";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { Group } from "./Group";

type Props = {
  serverId: number;
  groups: RouterOutputs["servers"]["getServerById"]["groups"];
};

export const GroupList = ({ serverId, groups }: Props) => {
  const { data, isError } = trpc.groups.getGroupsByServerId.useQuery(
    {
      serverId,
    },
    { initialData: groups },
  );

  if (isError) return "error";

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-900">
      <ul>
        {data
          .filter((g) => !g.channels.every((c) => !c.isUserSubscribed))
          .map((group) => (
            <Group key={group.id} group={group} />
          ))}
      </ul>
    </div>
  );
};
