import { useQueryClient } from "@tanstack/react-query";
import { type inferRouterOutputs } from "@trpc/server";
import { useParams } from "next/navigation";
import { type AppRouter } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { Checkbox } from "../Icons";
type Props = {
  groupId: number;
  checked: boolean;
};

type Groups = inferRouterOutputs<AppRouter>["groups"]["getGroupsByServerId"];

export const FollowCategoryButton = ({ groupId, checked }: Props) => {
  const { server: serverId } = useParams();

  const callbacks = {
    onSuccess: (data: { channelId: number; userId: string }[]) => {
      //@ts-expect-error idk what to do and I"m annoyed so ignore please
      client.setQueryData(queryKey, (old: Groups) =>
        old.map((group) => ({
          ...group,
          channels: group.channels.map((c) =>
            data.map((datum) => datum.channelId).includes(c.id)
              ? { ...c, isUserSubscribed: !c.isUserSubscribed }
              : c,
          ),
        })),
      );
    },
    onSettled: () => void client.invalidateQueries(queryKey),
  };

  const client = useQueryClient();
  const { mutate: unsubscribe } =
    trpc.groups.unsubscribeFromGroup.useMutation(callbacks);
  const { mutate: subscribe } =
    trpc.groups.subscribeToGroup.useMutation(callbacks);

  const queryKey = [
    ["groups", "getGroupsByServerId"],
    { input: { serverId: +serverId }, type: "query" },
  ];

  const handleClick = () => {
    if (checked) return unsubscribe({ id: groupId });
    return subscribe({ id: groupId });
  };

  return (
    <div onClick={handleClick} className="flex">
      <div
        // role="checkbox"
        className={`mr-[6px] h-[14px] w-[14px] rounded-sm ${
          checked ? "bg-indigo-500" : "border border-gray-500"
        }`}
      >
        {checked ? <Checkbox className="h-[14px] w-[14px]" /> : null}
      </div>
      Follow Category
    </div>
  );
};
