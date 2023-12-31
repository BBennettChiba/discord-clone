"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { type CompleteGroup } from "@/lib/db/schema/groups";
import { paramsSchema } from "@/lib/utils";
import { ChannelList } from "./ChannelList";

type Props = {
  group: CompleteGroup;
};

export const Group = ({ group }: Props): JSX.Element => {
  const { channel: channelId } = paramsSchema.parse(useParams());

  const [checked, setChecked] = useState(
    !channelId ? false : group.channels.some((c) => c.id === +channelId),
  );

  return (
    <>
      <div className="group pt-4">
        <li className="h-6">
          <div
            onClick={(): void => setChecked((c) => !c)}
            className="flex cursor-pointer"
          >
            <div className="relative left-1 p-2">
              <svg
                className="absolute bottom-1/4 left-[-2px] h-3 w-3 -rotate-90"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"
                />
              </svg>
            </div>
            <div className="flex items-center text-sm text-gray-400 group-hover:text-white">
              <div>{group.name.toUpperCase()}</div>
            </div>
          </div>
        </li>
      </div>
      <ul className={`${checked ? "block" : "hidden"}`}>
        <ChannelList channels={group.channels} currentChannelId={channelId} />
      </ul>
    </>
  );
};
