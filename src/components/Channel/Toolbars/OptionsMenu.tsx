"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { type MenuType } from "@/contexts/MenuContext";
import { trpc } from "@/lib/trpc/client";
import { paramsSchema } from "@/lib/utils";
import { type Messages } from "../MessageInput";

type Props = {
  id: number;
  closeMenu: () => void;
};

export const OptionsMenu: MenuType = ({ closeMenu, id }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { channel: channelId } = paramsSchema.parse(useParams());
  if (!channelId) throw new Error("Invalid channelID in Options Menu");

  const KEY = [
    ["messages", "getMessagesByChannelId"],
    { input: { channelId }, type: "infinite" },
  ];

  const { mutate } = trpc.messages.deleteMessage.useMutation({
    onSuccess: ({ id: deletedMessageId }) => {
      queryClient.setQueryData<Messages>(KEY, (prev) =>
        prev
          ? {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                messages: page.messages.filter(
                  (m) => m.id !== deletedMessageId,
                ),
              })),
            }
          : undefined,
      );
    },
  });

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
