import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { Checkbox, Hash } from "../Icons";

type Groups = RouterOutputs["groups"]["getGroupsByServerId"];

type Channel = Groups[number]["channels"][number];

type Props = {
  channel: Channel;
};

const MINUTE_IN_MILLISECONDS = 1000 * 60;

const getRelativeTime = (timestamp: Date | undefined) => {
  if (!timestamp) return "";
  const rtf = new Intl.RelativeTimeFormat();

  const differenceInMilliseconds = timestamp.getTime() - new Date().getTime();

  const round = (num: number) => Math.round(num);

  let difference =
    differenceInMilliseconds / MINUTE_IN_MILLISECONDS +
    new Date().getTimezoneOffset();

  if (difference > -5) return "Just now";

  if (difference > -60) {
    return rtf.format(round(difference), "minutes");
  }
  difference /= 60;
  if (difference > -24) {
    return rtf.format(round(difference), "hours");
  }
  difference /= 24;
  if (difference > -28) {
    return rtf.format(round(difference), "days");
  }
  difference /= 28;
  if (difference > -12) {
    return rtf.format(round(difference), "months");
  }
  difference /= 12;

  return rtf.format(round(difference), "years");
};

export const ChannelListItem = ({ channel }: Props) => {
  const { server: serverId } = useParams();

  const client = useQueryClient();

  const queryKey = [
    ["groups", "getGroupsByServerId"],
    { input: { serverId: +serverId }, type: "query" },
  ];

  const { mutate: toggleSubscriptionMutation } =
    trpc.channels.toggleChannelSubscription.useMutation({
      onSuccess: (data) => {
        if (!data) throw new Error(" no data in optimistic update");
        client.setQueryData<Groups>(queryKey, (old) =>
          old
            ? old.map((d) => ({
                ...d,
                channels: d.channels.map((c) =>
                  c.id === data.channelId
                    ? { ...c, isUserSubscribed: !c.isUserSubscribed }
                    : c,
                ),
              }))
            : old,
        );
      },
      onSettled: () => void client.invalidateQueries(queryKey),
    });

  const { data } = trpc.messages.getMessagesByChannelId.useInfiniteQuery({
    channelId: channel.id,
  });

  const handler = () => {
    toggleSubscriptionMutation({ id: channel.id });
  };

  const dateOfNewestMessage = getRelativeTime(
    data?.pages[0].messages[0].createdAt,
  );

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
            <button className="invisible rounded-sm border border-gray-500 px-4 py-1 text-sm group-hover:visible hover:bg-gray-500">
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
