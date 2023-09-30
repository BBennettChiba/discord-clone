"use client";
import { type inferRouterOutputs } from "@trpc/server";
import React, { useState } from "react";
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
    <div className="flex-1 pl-4 pt-4">
      <ChannelSearchBar search={search} setSearch={setSearch} />
      {searchResults.map((g) => (
        <div key={g.id}>
          <div className="text-green-500">group!!!! {g.name}</div>
          <ul>
            {g.channels.map((c) => (
              <li key={c.id}>
                <div> name : {c.name}</div>
                <div>desc: {c.description}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
