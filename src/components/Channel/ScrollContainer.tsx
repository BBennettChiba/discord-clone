"use client";
import { useRef, type ReactNode, useEffect } from "react";
import { useInputHeight } from "@/contexts/InputHeightContext";

const TOP_BAR_HEIGHT = 48;

type Props = {
  children: ReactNode;
};

export const ScrollContainer = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { inputRows } = useInputHeight();

  const INPUT_HEIGHT = 32 + inputRows * 24;
  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView();
  }, [ref]);

  const HEIGHT = INPUT_HEIGHT + TOP_BAR_HEIGHT;

  return (
    <div
      style={{ height: `calc(100dvh-${HEIGHT}px)` }}
      className="flex flex-1 flex-col-reverse overflow-y-auto whitespace-pre bg-zinc-700 text-gray-400 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-900"
    >
      <div className="pb-4" ref={ref} />
      {children}
    </div>
  );
};

/**@TODO make it so mutliples posts by the same user in a row are grouped together
 */
