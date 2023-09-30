"use client";

import { type Dispatch, type SetStateAction } from "react";
import { LookingGlass, X } from "../Icons";

type Props = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export const ChannelSearchBar = ({ search, setSearch }: Props) => (
  <div className="pb-4 pl-4 pr-8">
    <div className="flex rounded-md bg-neutral-900">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-8 flex-grow  cursor-text rounded-md bg-neutral-900 px-2 text-zinc-200"
        defaultValue=""
        placeholder="Search Channels"
      />
      <div role="button" className="flex h-8 w-8 items-center justify-center">
        {search === "" ? (
          <LookingGlass className="h-5 w-5" />
        ) : (
          <X className="h-5 w-5" />
        )}
      </div>
    </div>
  </div>
);
