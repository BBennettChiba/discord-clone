"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { type Props } from "./layout";

export const Server = ({ children, params: { server } }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex flex-1">
      <div className="relative h-full w-60 bg-zinc-800">
        <div className="mb-[-1px] flex h-12 w-full items-center border-b border-black pl-4">
          <div>{server}</div>
          <div className="ml-auto pr-2">
            <div
              className="group relative flex h-8 w-8 items-center justify-center"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <div className="absolute h-4 w-[1px] origin-center -translate-x-1/2 -rotate-45 bg-white transition-all" />
              <div className="absolute h-4 w-[1px] origin-center translate-x-1/2 rotate-45 bg-white transition-all" />
              <div
                className={cn(
                  "absolute bottom-0 h-[calc(50%-1px)] w-full bg-zinc-800 transition-all",
                  {
                    "h-0": isMenuOpen,
                  },
                )}
              />
            </div>
          </div>
        </div>
        <Thing />
      </div>
      {children}
    </div>
  );
};
