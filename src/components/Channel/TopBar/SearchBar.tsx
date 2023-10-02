"use client";
import { type ReactNode, useState } from "react";
type Props = { children: ReactNode };
export const SearchBar = ({ children }: Props) => {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-neutral-800 pl-2">
      <div className="relative flex h-6 cursor-text overflow-hidden rounded bg-neutral-800 text-zinc-200">
        <input
          className="w-36 appearance-none bg-neutral-800 transition-all focus:w-56 focus:outline-none"
          type="text"
          onChange={(e): void => setSearch(e.target.value)}
          value={search}
          placeholder="search"
        />
        {children}
      </div>
    </div>
  );
};
