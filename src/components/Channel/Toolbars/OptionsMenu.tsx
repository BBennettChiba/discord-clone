"use client";

import { useEffect, useRef } from "react";
import { type MenuType } from "@/contexts/MenuContext";
import { trpc } from "@/lib/trpc/client";

type Props = {
  id: number;
  closeMenu: () => void;
};

export const OptionsMenu: MenuType = ({ closeMenu, id }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { mutate } = trpc.messages.deleteMessage.useMutation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeMenu]);

  const handleDelete = () => {
    mutate({ id });
  };

  return (
    <div ref={ref} className="h-96 w-[204px] bg-black">
      <button onClick={handleDelete}>delete {id}</button>
    </div>
  );
};
