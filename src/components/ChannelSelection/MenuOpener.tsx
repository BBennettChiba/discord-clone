"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DropdownMenu } from "./DropdownMenu";

export const MenuOpener = ({ name }: { name: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="mb-[-1px] flex h-12 w-full flex-none items-center border-b border-black pl-4">
        <div className="w-52 overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </div>
        <div className="ml-auto pr-2">
          <div
            className="group relative flex h-8 w-8 cursor-pointer items-center justify-center"
            onClick={(): void => setIsMenuOpen((v) => !v)}
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
      {isMenuOpen ? <DropdownMenu /> : null}
    </>
  );
};
