"use client";
import { type InfiniteData, useQueryClient } from "@tanstack/react-query";

import {
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useEffect,
} from "react";
import { useInputHeight } from "@/contexts/InputHeightContext";
import { type getMessagesByChannelId } from "@/lib/api/messages/queries";
import { trpc } from "@/lib/trpc/client";

type Props = { channelName: string; channelId: number };

type Data = InfiniteData<Awaited<ReturnType<typeof getMessagesByChannelId>>>;

export const MessageInput = ({ channelName, channelId }: Props) => {
  const queryClient = useQueryClient();
  const { inputRows, setInputRows } = useInputHeight();

  const [body, setBody] = useState("");
  const { mutate } = trpc.messages.createMessage.useMutation({
    onSuccess: (data) => {
      setBody("");
      queryClient.setQueryData<Data>(
        [
          ["messages", "getMessagesByChannelId"],
          { input: { channelId }, type: "infinite" },
        ],
        //@ts-expect-error I will solve this later, It's annoying me
        (prev) => ({
          ...prev,
          pages: prev?.pages.map((page, i) => ({
            ...page,
            messages:
              i === 0 ? [data.message, ...page.messages] : page.messages,
          })),
        }),
      );
    },
    onSettled: () => {
      void queryClient.invalidateQueries([
        ["messages", "getMessagesByChannelId"],
        { input: { channelId }, type: "infinite" },
      ]);
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
        parentId: null,
      });
    }
  };

  useEffect(() => {
    const numberOfBreaks = (body.match(/\n/g) || []).length;
    setInputRows(numberOfBreaks + 1);
  }, [body, setInputRows]);

  return (
    <div className="flex flex-shrink-0 justify-self-end px-4 pb-6 align-bottom">
      <textarea
        rows={inputRows}
        value={body}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="align-botttom w-full resize-none appearance-none overflow-hidden rounded-lg bg-neutral-800 bg-opacity-40 p-4 text-gray-300 placeholder:text-gray-500 focus:outline-none"
        placeholder={`Send a message in ${channelName}`}
      />
    </div>
  );
};
