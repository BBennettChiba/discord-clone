"use client";
import { type inferRouterOutputs } from "@trpc/server";
import React, { Fragment, useState } from "react";
import { type AppRouter } from "@/lib/server/routers/_app";
import { Checkbox, Hash } from "../Icons";
import { ChannelSearchBar } from "./ChannelSearchBar";

type Props = {
  groups: inferRouterOutputs<AppRouter>["groups"]["getGroupByServerId"];
};

export const Browser = ({ groups }: Props) => {
  const [search, setSearch] = useState("");
  const searchResults = groups
    .map((g) => ({
      ...g,
      channels: g.channels.filter(
        (c) => c.name.includes(search) || c.description.includes(search),
      ),
    }))
    .filter((g) => g.channels.length !== 0);

  return (
    <div className="pl-4 pt-4">
      <ChannelSearchBar search={search} setSearch={setSearch} />
      <div className="h-[calc(100vh-48px-48px-16px)] overflow-y-scroll  px-4 scrollbar-thin scrollbar-thumb-zinc-900">
        {searchResults.map((g) => (
          <div key={g.id} className="">
            <div className="flex w-full justify-between pb-2 pt-6 text-xs">
              <div>{g.name.toUpperCase()}</div>
              <div className="mr-2 flex">
                <div
                  role="checkbox"
                  className="mr-[6px] h-[14px] w-[14px] rounded-sm bg-indigo-500"
                >
                  <Checkbox className="h-[14px] w-[14px]" />
                </div>
                Follow Category
              </div>
            </div>
            <ul className="rounded-lg bg-zinc-700 bg-opacity-30">
              {g.channels.map((c, i) => (
                <Fragment key={c.id}>
                  {!!i ? (
                    <div className="px-4">
                      <div className="h-[1px] w-full bg-gray-700" />
                    </div>
                  ) : null}
                  <div className="group px-4 py-3">
                    <li className="flex h-10 items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <Hash className="h-5 w-5" />
                          <div>&nbsp;{c.name}</div>
                        </div>
                        <div className="text-xs">{c.description}</div>
                      </div>
                      <div className="flex">
                        <div className="pr-8">
                          <button className="invisible border border-gray-500 rounded-sm text-sm px-4 py-1 group-hover:visible hover:bg-gray-500">
                            View
                          </button>
                        </div>
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500">
                          <Checkbox className="h-[18px] w-[18px]" />
                        </div>
                      </div>
                    </li>
                  </div>
                </Fragment>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
