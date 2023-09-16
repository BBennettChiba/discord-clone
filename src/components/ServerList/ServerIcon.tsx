"use client";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  title: string;
  green?: boolean;
  selected: boolean;
};

const isText = (child: ReactNode): child is string => typeof child === "string";

export const ServerIcon = ({
  children,
  title,
  green,
  selected,
}: Props): JSX.Element => {
  const isLong = isText(children)
    ? children.length > 5
      ? true
      : false
    : false;

  return (
    <div className="discord-logo group relative mb-2 flex w-[72px] justify-center">
      <div className="relative h-12 w-12 cursor-pointer">
        <div
          className={cn(
            "flex h-full items-center justify-center overflow-hidden rounded-3xl bg-gray-700 text-zinc-200 transition-all hover:rounded-xl hover:bg-indigo-500",
            {
              "text-xs": isLong,
              "hover:bg-green-500": green,
              "rounded-xl": selected,
            },
          )}
        >
          {children}
        </div>
      </div>
      <div className="absolute left-20 top-1/2 z-10 hidden min-w-[10rem] origin-center -translate-y-1/2 rounded-lg bg-black p-2 group-hover:block">
        {title}
      </div>
      <div className="absolute -left-2 flex h-full w-3 items-center overflow-hidden">
        <div
          className={cn("rounded-lg bg-white transition-all ", {
            "h-10 w-10": selected,
            "group-hover:h-6 group-hover:w-6": !selected,
          })}
        />
      </div>
    </div>
  );
};
