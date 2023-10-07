"use client";
import { type ReactNode, useState, useEffect } from "react";
import { useInvite } from "@/contexts/InviteContext";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  name: string;
};

export const MenuOpener = ({ name, children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isModalOpen } = useInvite();
  useEffect(() => {
    if (isModalOpen) setIsMenuOpen(false);
  }, [isModalOpen]);

  return (
    <>
      <div className="mb-[-1px] flex h-12 w-full flex-none items-center border-b border-black pl-4">
        <div className="w-52 overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </div>
        <div className="ml-auto pr-2">
          <div
            className={cn(
              "group relative flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-300",
              { "-rotate-90": isMenuOpen },
            )}
            onClick={(): void => setIsMenuOpen((v) => !v)}
          >
            <div className="absolute h-4 w-[1px] origin-center -rotate-45 bg-white transition-all" />
            <div className="absolute h-4 w-[1px] origin-center rotate-45 bg-white transition-all" />
            <div
              className={cn(
                "absolute bottom-0 h-1/2 w-full bg-zinc-800 transition-all duration-300",
                {
                  "h-0": isMenuOpen,
                },
              )}
            />
          </div>
        </div>
      </div>
      {isMenuOpen ? children : null}
    </>
  );
};

export const PlusButton = () => (
  <svg
    className="group"
    enableBackground="new 0 0 50 50"
    height="25px"
    id="Layer_1"
    version="1.1"
    viewBox="0 0 50 50"
    width="25px"
  >
    <rect fill="none" height="50" width="50" />
    <line
      fill="none"
      stroke="#259855"
      strokeMiterlimit="10"
      strokeWidth="4"
      x1="9"
      x2="41"
      y1="25"
      y2="25"
      className="group-hover:stroke-white"
    />
    <line
      fill="none"
      stroke="#259855"
      strokeMiterlimit="10"
      strokeWidth="4"
      x1="25"
      x2="25"
      y1="9"
      y2="41"
      className="group-hover:stroke-white"
    />
  </svg>
);
