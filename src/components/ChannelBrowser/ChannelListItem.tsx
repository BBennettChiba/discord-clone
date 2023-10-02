import { type inferRouterOutputs } from "@trpc/server";
import React from "react";
import { type AppRouter } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { Checkbox, Hash } from "../Icons";

type Props = {
  channel: inferRouterOutputs<AppRouter>["groups"]["getGroupsByServerId"][number]["channels"][number];
};

export const ChannelListItem = ({ channel }: Props) => {
  const { mutate } = trpc.channels.subscribeToChannel.useMutation();
  const handler = () => {
    mutate({ id: channel.id });
  };
  return (
    <div className="group px-4 py-3 hover:bg-zinc-800" onClick={handler}>
      <li className="flex h-10 items-center justify-between">
        <div>
          <div className="flex items-center">
            <Hash className="h-5 w-5" />
            <div>&nbsp;{channel.name}</div>
          </div>
          <div className="text-xs">{channel.description}</div>
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

/**@TODO when following channel is selected the pointer goes to pointy instead of clickable */
