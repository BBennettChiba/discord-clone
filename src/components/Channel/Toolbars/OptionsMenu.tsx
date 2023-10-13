"use client";

import {
  useEffect,
  useRef,
  type MouseEventHandler,
} from "react";
import { type MenuType } from "@/contexts/MenuContext";

export const OptionsMenu: MenuType = ({
  closeMenu,
}: {
  closeMenu: () => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside: MouseEventHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeMenu]);

  return (
    <div ref={ref} className="h-96 w-[204px] bg-black">
      yo
    </div>
  );
};
