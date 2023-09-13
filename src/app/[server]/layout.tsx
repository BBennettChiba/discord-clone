"use client";
import { useState, type ReactNode } from "react";
import { ChannelBrowser } from "@/components/ChannelSelection/ChannelBrowser";
import { DropdownMenu } from "@/components/ChannelSelection/DropdownMenu";
import { GroupList } from "@/components/ChannelSelection/GroupList";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  params: { server: string };
};

const Server = ({ children, params: { server } }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex flex-1">
      <div className="relative flex h-full w-60 flex-col bg-zinc-800">
        <div className="mb-[-1px] flex h-12 w-full items-center border-b border-black pl-4">
          <div>{server}</div>
          <div className="ml-auto pr-2">
            <div
              className="group relative flex h-8 w-8 cursor-pointer items-center justify-center"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <div className="absolute h-4 w-[1px] origin-center -translate-x-1/2 -rotate-45 bg-white transition-all" />
              <div className="absolute h-4 w-[1px] origin-center translate-x-1/2 rotate-45 bg-white transition-all" />
              <div
                className={cn(
                  "absolute bottom-0 h-[calc(50%-1px)] w-full bg-zinc-800 transition-all duration-500",
                  {
                    "h-0": isMenuOpen,
                  },
                )}
              />
            </div>
          </div>
        </div>
        <ChannelBrowser />
        {isMenuOpen ? <DropdownMenu /> : null}
        <GroupList />
        <div className="">here</div>
      </div>
      {children}
    </div>
  );
};

export default Server;
