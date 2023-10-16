"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { type MenuType } from "@/contexts/MenuContext";
import { trpc } from "@/lib/trpc/client";
import { cn, paramsSchema } from "@/lib/utils";
import { type Messages } from "../MessageInput";

type Props = {
  id: number;
  closeMenu: () => void;
};

const USER_IS_ADMIN = false;

export const OptionsMenu: MenuType = ({ closeMenu, id }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { channel: channelId } = paramsSchema.parse(useParams());
  if (!channelId) throw new Error("Invalid channelID in Options Menu");
  const { data: session } = useSession();
  if (!session) throw new Error("Invalid session in Options Menu");

  const KEY = [
    ["messages", "getMessagesByChannelId"],
    { input: { channelId }, type: "infinite" },
  ];

  const messages = queryClient.getQueryData<Messages>(KEY);
  if (!messages) throw new Error("No messages in getQueryData");

  const thisMessage = messages.pages
    .map((page) => page.messages)
    .flat()
    .find((m) => m.id === id);
  if (!thisMessage) throw new Error("thisMessage is not found in OptionsMenu");

  const userIsOwner = thisMessage.authorId === session.user.id;

  console.log("user is owner", userIsOwner);

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

  const filteredOptions = OPTIONS.filter((option) => {
    if (option.generalAction) return true;
    if (option.ownerAction && userIsOwner) return true;
    if (option.adminAction && USER_IS_ADMIN) return true;
    if (option.neitherOwnerNorUserAction && !USER_IS_ADMIN && !userIsOwner)
      return true;
    if (option.ownerOrAdminAction && (userIsOwner || USER_IS_ADMIN))
      return true;
    return false;
  });

  return (
    <div ref={ref} className="w-[204px] bg-black px-2 py-[6px]">
      <div className="flex justify-between py-[6px] pl-[2px]">
        {EMOJI.map((e) => (
          <div
            key={e}
            className="flex h-10 w-10 items-center justify-center rounded-3xl bg-gray-900"
          >
            <button>
              <div className="h-5 w-5 text-xl ">{e}</div>
            </button>
          </div>
        ))}
      </div>
      <ul>
        {filteredOptions.map((option) => (
          <li
            key={option.title}
            className="rounded-sm p-[6px] hover:bg-indigo-500 cursor-pointer"
          >
            <div className="h-5 text-xs w-full leading-5">{option.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EMOJI = ["😆", "👍", "💯", "☝️"];

const OPTIONS = [
  { title: "Add Reaction", generalAction: true },
  { title: "Edit Message", ownerAction: true },
  { title: "Pin Message", adminAction: true },
  { title: "Reply", generalAction: true },
  { title: "Copy Text", generalAction: true },
  { title: "Mark Unread", generalAction: true },
  { title: "Copy Message Link", generalAction: true },
  { title: "Report Message", neitherOwnerNorUserAction: true },
  { title: "Delete Message", ownerOrAdminAction: true },
  { title: "Copy Message ID", generalAction: true },
];
