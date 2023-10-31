"use client";
import { type InfiniteData } from "@tanstack/react-query";

import {
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useEffect,
} from "react";
import Tenor from 'react-tenor'
import { useInputHeight } from "@/contexts/InputHeightContext";
import { useReply } from "@/contexts/ReplyContext";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { AtSymbolIcon, XInCircleIcon } from "../Icons";

type Props = { channelName: string; channelId: number };

export type Messages = InfiniteData<
  RouterOutputs["messages"]["getMessagesByChannelId"]
>;

export const MessageInput = ({ channelName, channelId }: Props) => {
  const { replyTarget, setReplyTarget } = useReply();
  const utils = trpc.useUtils().messages.getMessagesByChannelId;
  const { inputRows, setInputRows } = useInputHeight();

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
    <div className="flex flex-shrink-0 flex-col justify-self-end px-4 pb-6 align-bottom">
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
      <textarea
        rows={inputRows}
        value={body}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "align-botttom w-full resize-none appearance-none overflow-hidden rounded-lg bg-neutral-800 bg-opacity-40 p-4 text-gray-300 placeholder:text-gray-500 focus:outline-none",
          { "rounded-t-none": !!replyTarget },
        )}
        placeholder={`Send a message in ${channelName}`}
      />
      <div className="absolute">
        <Tenor
          token="your-token-here"
          onSelect={(result) => console.log(result)}
        />
      </div>
    </div>
  );
};
