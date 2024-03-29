import { useParams, useRouter } from "next/navigation";
import React from "react";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { getRelativeTime, paramsSchema } from "@/lib/utils";
import { Checkbox, Hash } from "../Icons";

type Groups = RouterOutputs["groups"]["getGroupsByServerId"];

type Channel = Groups[number]["channels"][number];

type Props = {
  channel: Channel;
};

export const ChannelListItem = ({ channel }: Props) => {
  const router = useRouter();
  const { server: serverId } = paramsSchema.parse(useParams());

  const utils = trpc.useUtils().groups.getGroupsByServerId;

  const { mutate: toggleSubscriptionMutation } =
    trpc.channels.toggleChannelSubscription.useMutation({
      onSettled: () => void utils.invalidate({ serverId }),
    });

  const { data } = trpc.messages.getMessagesByChannelId.useInfiniteQuery({
    channelId: channel.id,
  });

  const handler = () => {
    toggleSubscriptionMutation({ id: channel.id });
  };

  const dateOfNewestMessage = getRelativeTime(
    data?.pages[0]?.messages[0]?.createdAt,
  );

  const goToChannel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    router.push(`${channel.id}`);
  };

  return (
    <div
      className="group cursor-pointer px-4 py-3 hover:bg-zinc-800"
      onClick={handler}
    >
      <li className="flex h-10 items-center justify-between text-gray-400">
        <div>
          <div className="flex items-center">
            <Hash className="h-5 w-5" />
            <div>&nbsp;{channel.name}</div>
          </div>
          <div className="flex text-xs">
            <div>Active {dateOfNewestMessage}</div>

            <div className="px-2">
              <div className="h-1 w-1 self-center rounded bg-zinc-600/[0.48] text-xs text-zinc-600/[0.48]">
                ·
              </div>
            </div>
            <div>{channel.description}</div>
          </div>
        </div>
        <div className="flex">
          <div className="pr-8">
            <button
              onClick={goToChannel}
              className="invisible rounded-sm border border-gray-500 px-4 py-1 text-sm group-hover:visible hover:bg-gray-500"
            >
              View
            </button>
          </div>
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-md border border-gray-500 ${
              channel.isUserSubscribed ? "bg-indigo-500" : ""
            }`}
          >
            {channel.isUserSubscribed ? (
              <Checkbox className="h-[18px] w-[18px]" />
            ) : null}
          </div>
        </div>
      </li>
    </div>
  );
};
