"use client";
import { type InfiniteData } from "@tanstack/react-query";

import GifPicker from "gif-picker-react";
import {
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useEffect,
} from "react";
import { useInputHeight } from "@/contexts/InputHeightContext";
import { useReply } from "@/contexts/ReplyContext";
import { env } from "@/env";
import { useClickAway } from "@/hooks";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { AtSymbolIcon, GifIcon, XInCircleIcon } from "../Icons";

type Props = { channelName: string; channelId: number };

export type Messages = InfiniteData<
  RouterOutputs["messages"]["getMessagesByChannelId"]
>;

export const MessageInput = ({ channelName, channelId }: Props) => {
  const { replyTarget, setReplyTarget } = useReply();
  const utils = trpc.useUtils().messages.getMessagesByChannelId;
  const { inputRows, setInputRows } = useInputHeight();
  const [isGifMenuOpen, setIsGifMenuOpen] = useState(false);
  const ref = useClickAway<HTMLDivElement>(() => setIsGifMenuOpen(false));
  const input = { channelId };

  const replyAuthor = replyTarget
    ? utils
        .getInfiniteData(input)
        ?.pages.map((p) => p.messages)
        .flat()
        .find((m) => m.id === replyTarget)?.author
    : null;

  const [body, setBody] = useState("");
  const { mutate } = trpc.messages.createMessage.useMutation({
    onSettled: () => {
      setBody("");
      setReplyTarget(null);
      void utils.invalidate(input);
    },
  });

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBody(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === "Enter" && event.shiftKey) return;
    if (event.key === "Enter") event.preventDefault();
    if (event.key === "Enter" && body.length > 0) {
      mutate({
        body,
        channelId,
        parentId: replyTarget,
      });
    }
  };

  useEffect(() => {
    const numberOfBreaks = (body.match(/\n/g) || []).length;
    setInputRows(numberOfBreaks + 1);
  }, [body, setInputRows]);

  return (
    <div className="relative flex flex-shrink-0 flex-col justify-self-end px-4 pb-6 align-bottom">
      {replyTarget ? (
        <div className="flex cursor-pointer select-none items-center justify-between rounded-tl-lg rounded-tr-lg bg-zinc-800">
          <div>
            <div className="ml-4 flex-grow overflow-hidden text-ellipsis text-sm text-gray-400">
              Replying to{" "}
              <span className="font-semibold text-fuchsia-600">
                {replyAuthor?.name || ""}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <div className="flex items-center px-3 py-2 text-sm font-bold uppercase text-sky-500">
                <AtSymbolIcon />
                ON
                {/**@TODO write functionality for disabling @ */}
              </div>
            </div>
            <div
              className=" flex h-full items-center pl-4 pr-5 text-gray-400"
              onClick={() => setReplyTarget(null)}
            >
              <XInCircleIcon />
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex">
        <textarea
          rows={inputRows}
          value={body}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "align-botttom w-full resize-none appearance-none overflow-hidden rounded-l-lg bg-neutral-800 bg-opacity-40 p-4 text-gray-300 placeholder:text-gray-500 focus:outline-none",
            { "rounded-t-none": !!replyTarget },
          )}
          placeholder={`Send a message in ${channelName}`}
        />
        <div className="flex rounded-r-lg bg-neutral-800 bg-opacity-40 pr-2">
          <div className="flex items-center">
            <button
              className="relative flex h-8 w-auto cursor-pointer items-center justify-center rounded text-center text-sm font-medium"
              onClick={() => setIsGifMenuOpen((v) => !v)}
            >
              <div
                className="m-1 flex items-center justify-center p-1 text-gray-400"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) calc(2px), rgba(0, 0, 0, 0) calc(2px))",
                }}
              >
                <div>
                  <GifIcon />
                </div>
              </div>
            </button>
          </div>
          <div className="flex items-center">
            <button
              className="relative flex h-7 w-auto cursor-pointer items-center justify-center rounded p-1 text-center text-xl font-medium"
              style={{
                maxHeight: "3.13rem",
              }}
            >
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) calc(2px), rgba(0, 0, 0, 0) calc(2px))",
                }}
              >
                😊
              </div>
            </button>
          </div>
        </div>
        {isGifMenuOpen ? (
          <div className="absolute right-0 -translate-y-full" ref={ref}>
            <GifPicker
              tenorApiKey={env.NEXT_PUBLIC_TENOR_TOKEN}
              onGifClick={(result) => console.log(result)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
