"use client";

import { useState } from "react";
import { ChannelList } from "./ChannelList";

type Channel = {
  id: string;
  name: string;
};
type Props = {
  group: { id: number; name: string; channels: Channel[] };
};

export const Group = ({ group }: Props): JSX.Element => {
  const [checked, setChecked] = useState(false);
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
        <ChannelList channels={group.channels} />
      </ul>
    </>
  );
};
