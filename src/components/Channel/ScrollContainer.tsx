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
    <div className="flex h-[calc(100vh-116px)] flex-col-reverse overflow-y-auto bg-zinc-700 text-gray-400 scrollbar-thin scrollbar-thumb-zinc-900">
      <div className="pb-4" ref={ref} />
      {children}
    </div>
  );
};
