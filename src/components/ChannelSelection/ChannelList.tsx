import Link from "next/link";
import React, { Fragment, type MouseEvent } from "react";
import { useInvite } from "@/contexts/InviteContext";
import { type CompleteGroup } from "@/lib/db/schema/groups";
import { cn } from "@/lib/utils";
import { Hash, PeoplePlusIcon } from "../Icons";

type Props = {
  channels: CompleteGroup["channels"];
  currentChannelId: number;
};

export const ChannelList = ({ channels, currentChannelId }: Props) => {
  const { toggleModal } = useInvite();
  const handleClick = (e: MouseEvent, id: number) => {
    e.preventDefault();
    toggleModal({ id });
  };
  return channels.map((ch) => (
    <Fragment key={ch.id}>
      {ch.isUserSubscribed ? (
        <Link href={`${ch.id}`}>
          <div className="px-2">
            <li
              className={cn(
                "group flex h-[34px] w-full cursor-pointer items-center rounded-md pl-2 text-gray-400 hover:bg-zinc-700 hover:text-gray-300",
                { "bg-zinc-600 text-white": currentChannelId === ch.id },
              )}
            >
              <div className="flex items-center">
                <Hash className="h-5 w-5" />
              </div>
              <div className="flex items-center pl-2">{ch.name}</div>
              <div
                className="ml-auto hidden pr-2 group-hover:block"
                onClick={(e) => handleClick(e, ch.id)}
              >
                <PeoplePlusIcon className="h-4 w-4" />
              </div>
            </li>
          </div>
        </Link>
      ) : null}
    </Fragment>
  ));
};
