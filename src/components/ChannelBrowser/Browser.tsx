"use client";
import { type inferRouterOutputs } from "@trpc/server";
import React, { Fragment, useState } from "react";
import { type AppRouter } from "@/lib/server/routers/_app";
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
          <div key={g.id}>
            <div className="pb-2 pt-6 text-green-500">
              <div>group!!!! {g.name}</div>
              <div>
                <input type="checkbox" /> Follow Category
              </div>
            </div>
            <ul>
              {
                g.channels.map((c, i) => (
                  <Fragment key={c.id}>
                    {!!i ? <div className="h-[1px] w-full px-4" /> : null}
                    <div className="px-4 py-3">
                      <li className="h-10">
                        <div>name : {c.name}</div>
                        <div>desc: {c.description}</div>
                      </li>
                    </div>
                  </Fragment>
                ))
                // .join(<div className="h-[1px] w-full px-4" />)
              }
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
