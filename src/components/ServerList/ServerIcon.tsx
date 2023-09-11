"use client";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

const isText = (child: ReactNode): child is string => typeof child === "string";

export const ServerIcon = ({ children, title }: Props) => {
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
          } items-center bg-gray-700 rounded-3xl hover:rounded-xl hover:bg-indigo-500 transition-all text-zinc-200 flex justify-center h-full overflow-hidden`}
        >
          {children}
        </div>
      </div>
      <div className="group-hover:block group-hover:absolute hidden r-0 rounded-lg bg-black left-20 p-2 min-w-[10rem]">
        {title}
      </div>
    </div>
  );
};
