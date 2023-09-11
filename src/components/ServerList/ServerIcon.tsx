"use client";
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
    <div className="w-[72px] flex justify-center mb-2 relative discord-logo group">
      <div className="h-12 w-12 cursor-pointer relative">
        <div
          className={`${
            isLong ? "text-xs" : ""
          } items-center bg-gray-700 rounded-3xl hover:rounded-xl ${
            green ? "hover:bg-green-500" : "hover:bg-indigo-500"
          } transition-all text-zinc-200 flex justify-center h-full overflow-hidden`}
        >
          {children}
        </div>
      </div>
      <div className="group-hover:block group-hover:absolute hidden rounded-lg bg-black left-20 p-2 min-w-[10rem]">
        {title}
      </div>
      <div className="absolute -left-2 flex h-full items-center overflow-hidden w-3">
        <div
          className={`bg-white rounded-lg ${
            !selected ? "group-hover:h-6 group-hover:w-6" : ""
          } ${selected ? "w-10 h-10" : "h-0 w-0"} transition-all`}
        />
      </div>
    </div>
  );
};
