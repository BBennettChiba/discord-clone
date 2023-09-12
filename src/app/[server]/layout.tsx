"use client";
import clsx from "clsx";
import { useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { server: string };
};

const Server = ({ children, params: { server } }: Props) => {
  console.log(server);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  return (
    <div className="flex flex-1">
      <div className="h-full w-60 bg-zinc-800">
        <div className="mb-[-1px] flex h-12 w-full items-center border-b border-black pl-4">
          <div>{server}</div>
          <div className="ml-auto pr-4">
            <div
              className="group relative h-8 w-8"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <div
                className={clsx(
                  "absolute left-1/2 top-1/2 h-[1px] w-4 origin-left rotate-[225deg] bg-white transition-all",
                  {
                    "left-1 w-6 origin-center": isMenuOpen,
                  },
                )}
              />
              <div
                className={clsx(
                  "absolute left-1/2 top-1/2 h-[1px] w-4 origin-left -rotate-45 bg-white transition-all",
                  {
                    "left-1 w-6 origin-center": isMenuOpen,
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
