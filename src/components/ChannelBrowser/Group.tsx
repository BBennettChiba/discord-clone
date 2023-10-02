import { type inferRouterOutputs } from "@trpc/server";
import React, { Fragment } from "react";
import { type AppRouter } from "@/lib/server/routers/_app";
import { Checkbox } from "../Icons";
import { ChannelListItem } from "./ChannelListItem";

type Props = {
  group: inferRouterOutputs<AppRouter>["groups"]["getGroupsByServerId"][number];
};

export const Group = ({ group }: Props) => (
  <div key={group.id}>
    <div className="flex w-full justify-between pb-2 pt-6 text-xs">
      <div>{group.name.toUpperCase()}</div>
      <div className="mr-2 flex">
        <div
          // role="checkbox"
          className="mr-[6px] h-[14px] w-[14px] rounded-sm bg-indigo-500"
        >
          <Checkbox className="h-[14px] w-[14px]" />
        </div>
        Follow Category
      </div>
    </div>
    <ul className="rounded-lg bg-zinc-700 bg-opacity-30">
      {group.channels.map((c, i) => (
        <Fragment key={c.id}>
          {!!i ? (
            <div className="px-4">
              <div className="h-[1px] w-full bg-gray-700" />
            </div>
          ) : null}
          <ChannelListItem channel={c} />
        </Fragment>
      ))}
    </ul>
  </div>
);
