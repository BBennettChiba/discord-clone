"use client";
import { type InfiniteData, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from "react";
import { type getMessagesByChannelId } from "@/lib/api/messages/queries";
import { trpc } from "@/lib/trpc/client";

type Props = { channelName: string; channelId: number };

type Data = InfiniteData<Awaited<ReturnType<typeof getMessagesByChannelId>>>;

/**
 * @TODO find out why new comments don't work, they're created but I can't fetch them. They update in the dom but the invalidate query erases it */

export const MessageInput = ({ channelName, channelId }: Props) => {
  const queryClient = useQueryClient();

  const [body, setBody] = useState("");
  const { mutate } = trpc.messages.createMessage.useMutation({
    onSuccess: (data) => {
      console.log(data);
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

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setBody(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      mutate({
        body,
        channelId,
        parentId: null,
      });
    }
  };

  return (
    <div className="px-4 pb-6">
      <input
        value={body}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        className="h-11 w-full appearance-none bg-neutral-600 p-4 text-gray-300 placeholder:text-gray-500 focus:outline-none"
        placeholder={`Send a message in ${channelName}`}
      />
      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  );
};
