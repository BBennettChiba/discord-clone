import React from "react";

type Props = {
  position: { top: number; left: number };
};

export const OptionsMenu = ({ position }: Props) => (
  <div
    className="absolute z-[999] h-96 w-[204px] -translate-x-full bg-black"
    style={{ top: `${position.top}px`, left: `${position.left}px` }}
  >
    yo
  </div>
);
