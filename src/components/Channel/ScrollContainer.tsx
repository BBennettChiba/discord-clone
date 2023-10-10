"use client";
import { useRef, type ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export const ScrollContainer = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView();
  }, [ref]);

  return (
    <div className="flex h-[calc(100dvh-128px)] flex-1 flex-col-reverse overflow-y-auto whitespace-pre bg-zinc-700 text-gray-400 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-900">
      <div className="pb-4" ref={ref} />
      {children}
    </div>
  );
};
