import Link from "next/link";
import React, { Fragment } from "react";
import { type CompleteGroup } from "@/lib/db/schema/groups";
import { cn } from "@/lib/utils";
import { Hash } from "../Icons";

type Props = {
  channels: CompleteGroup["channels"];
  currentChannelId: number;
};

export const ChannelList = ({ channels, currentChannelId }: Props) =>
  channels.map((ch) => (
    <Fragment key={ch.id}>
      {ch.isUserSubscribed ? (
        <Link href={`${ch.id}`}>
          <div className="px-2">
            <li
              className={cn(
                "flex h-[34px] w-full cursor-pointer rounded-md pl-2 text-gray-400 hover:bg-zinc-700 hover:text-gray-300",
                { "bg-zinc-600 text-white": currentChannelId === ch.id },
              )}
            >
              <div className="flex items-center">
                <Hash className="h-5 w-5" />
              </div>
              <div className="flex items-center pl-2">{ch.name}</div>
            </li>
          </div>
        </Link>
      ) : null}
    </Fragment>
  ));
