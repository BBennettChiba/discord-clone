"use client";
import { type inferRouterOutputs } from "@trpc/server";
import React, { useState } from "react";
import { type AppRouter } from "@/lib/server/routers/_app";
import { ChannelSearchBar } from "./ChannelSearchBar";
import { Group } from "./Group";

type Props = {
  groups: inferRouterOutputs<AppRouter>["groups"]["getGroupsByServerId"];
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
          <Group key={g.id} group={g} />
        ))}
      </div>
    </div>
  );
};
