"use client";
import clsx from "clsx";
import { useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { server: string };
};

const Server = ({ children, params: { server } }: Props) => {
  console.log(server);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex flex-1">
      <div className="h-full w-60 bg-zinc-800">
        <div className="mb-[-1px] flex h-12 w-full items-center border-b border-black pl-4">
          <div>{server}</div>
          <div className="ml-auto pr-4">
            <div
              className="group relative flex h-8 w-8 items-center justify-center outline outline-white"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <div
                className={clsx(
                  "absolute w-[1px] -translate-x-1/2 -rotate-45 bg-white transition-all",
                  {
                    // "h-7 origin-center": isMenuOpen,
                    // "h-4 origin-bottom -translate-y-1/2": !isMenuOpen,
                  },
                )}
              />
              <div
                className={clsx(
                  "absolute w-[1px] translate-x-1/2 rotate-45 bg-white transition-all",
                  {
                    // "h-7 origin-center": isMenuOpen,
                    // "h-4 origin-bottom -translate-y-1/2": !isMenuOpen,
                  },
                )}
              />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Server;
