"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { ChannelSearchBar } from "./ChannelSearchBar";
import { Group } from "./Group";

export const Browser = () => {
  const { server: serverId } = useParams();
  const {
    data: groups,
    isLoading,
    isError,
  } = trpc.groups.getGroupsByServerId.useQuery({ serverId: +serverId });
  const [search, setSearch] = useState("");
  if (isLoading) return "loading";
  if (isError) return "error";
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
