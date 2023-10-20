import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { paramsSchema } from "@/lib/utils";
import { Checkbox } from "../Icons";

type Props = {
  groupId: number;
  checked: boolean;
};

export const FollowCategoryButton = ({ groupId, checked }: Props) => {
  const { server: serverId } = paramsSchema.parse(useParams());

  const callbacks = {
    onSettled: () => void client.invalidateQueries(queryKey),
  };

  const client = useQueryClient();
  const { mutate: unsubscribe } =
    trpc.groups.unsubscribeFromGroup.useMutation(callbacks);
  const { mutate: subscribe } =
    trpc.groups.subscribeToGroup.useMutation(callbacks);

  const queryKey = [
    ["groups", "getGroupsByServerId"],
    { input: { serverId }, type: "query" },
  ];

  const handleClick = () => {
    if (checked) return unsubscribe({ id: groupId });
    return subscribe({ id: groupId });
  };

  return (
    <div onClick={handleClick} className="flex cursor-pointer">
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
