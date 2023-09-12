"use client";
import { clsx } from "clsx";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  green?: boolean;
  selected: boolean;
};

const isText = (child: ReactNode): child is string => typeof child === "string";

export const ServerIcon = ({ children, title, green, selected }: Props) => {
  const isLong = isText(children)
    ? children.length > 5
      ? true
      : false
    : false;

  return (
    <div className="discord-logo group relative mb-2 flex w-[72px] justify-center">
      <div className="relative h-12 w-12 cursor-pointer">
        <div
          className={clsx(
            "flex h-full items-center justify-center overflow-hidden rounded-3xl bg-gray-700 text-zinc-200 transition-all hover:rounded-xl ",
            {
              "text-xs": isLong,
              "hover:bg-green-500": green,
              "hover:bg-indigo-500": !green,
            },
          )}
        >
          {children}
        </div>
      </div>
      <div className="left-20 hidden min-w-[10rem] rounded-lg bg-black p-2 group-hover:absolute group-hover:block">
        {title}
      </div>
      <div className="absolute -left-2 flex h-full w-3 items-center overflow-hidden">
        <div
          // className={`rounded-lg bg-white ${
          //   !selected ? "group-hover:h-6 group-hover:w-6" : ""
          // } ${selected ? "h-10 w-10" : "h-0 w-0"} transition-all`}
          className={clsx("rounded-lg bg-white transition-all", {
            "h-0 w-0 group-hover:h-6 group-hover:w-6": !selected,
            "h-10 w-10": selected,
          })}
        />
      </div>
    </div>
  );
};
