"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, type MouseEventHandler } from "react";
import {
  CopyTextIcon,
  FlagIcon,
  HappyEmojiIcon,
  IDIcon,
  LinkIcon,
  PencilIcon,
  Pin,
  ReplyIcon,
  RightArrow,
  SiphonIcon,
  TrashIcon,
} from "@/components/Icons";
import { type MenuType } from "@/contexts/MenuContext";
import { trpc } from "@/lib/trpc/client";
import { cn, paramsSchema } from "@/lib/utils";
import { type Messages } from "../MessageInput";

type Props = {
  id: number;
  closeMenu: () => void;
};

const USER_IS_ADMIN = (() => Math.random() < 0.5)();

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

  const userIsOwner = thisMessage?.authorId === session.user.id;

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
    const handleClickOutside = (event: globalThis.MouseEvent) => {
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
    closeMenu();
  };

  const OPTIONS = [
    {
      title: "Add Reaction",
      generalAction: true,
      icon: (
        <div className={dimensions}>
          <RightArrow className="h-[10px] w-[10px]" />
        </div>
      ),
    },
    {
      title: "View Reactions",
      icon: <HappyEmojiIcon className={dimensions} />,
    },
    {
      title: "Edit Message",
      ownerAction: true,
      icon: <PencilIcon className={dimensions} />,
    },
    {
      title: "Pin Message",
      adminAction: true,
      icon: <Pin className={dimensions} />,
    },
    {
      title: "Reply",
      generalAction: true,
      icon: <ReplyIcon className={dimensions} />,
    },
    {
      title: "Copy Text",
      generalAction: true,
      icon: <CopyTextIcon className={dimensions} />,
    },
    {
      title: "Mark Unread",
      generalAction: true,
      icon: <SiphonIcon className={dimensions} />,
    },
    {
      title: "Copy Message Link",
      generalAction: true,
      icon: <LinkIcon className={dimensions} />,
    },
    {
      title: "Report Message",
      neitherOwnerNorUserAction: true,
      icon: <FlagIcon className={dimensions} />,
      extraStyles: alertClassName,
    },
    {
      title: "Delete Message",
      ownerOrAdminAction: true,
      icon: <TrashIcon className={dimensions} />,
      extraStyles: alertClassName,
      onClick: handleDelete,
    },
    {
      title: "Copy Message ID",
      generalAction: true,
      icon: <IDIcon className={dimensions} />,
    },
  ];

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
        {filteredOptions.map(
          ({
            title,
            icon,
            extraStyles,
            onClick = (e) => console.log(e.target),
          }: Option) => (
            <li
              onClick={onClick}
              key={title}
              className={cn(
                "cursor-pointer rounded-sm p-[6px] hover:bg-indigo-500",
                extraStyles,
              )}
            >
              <div className="flex">
                <div className="h-5 w-full text-xs leading-5">{title}</div>
                {icon}
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

type Option = {
  title: string;
  icon: JSX.Element;
  extraStyles?: string;
  onClick?: MouseEventHandler;
};

const EMOJI = ["😆", "👍", "💯", "☝️"];

const dimensions = "h-[18px] w-[18px]";

const alertClassName = "hover:bg-red-500 text-red-500 hover:text-white";

/**
 * @TODO find out why top isn't flush
 * @TODO open emoji menu when hover on emoji option
 * @TODO add separator before last line */
