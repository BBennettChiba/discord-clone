import { serverTrpc } from "@/lib/trpc/caller";
import { Group } from "./Group";

export const GroupList = async ({ serverId }: { serverId: number }) => {
  const groups = (
    await serverTrpc.groups.getGroupsByServerId({ serverId })
  ).filter((g) => !g.channels.every((c) => !c.isUserSubscribed));

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
