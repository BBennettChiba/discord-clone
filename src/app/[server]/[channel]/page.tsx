"use client";
import { Fragment, useRef } from "react";
import { Message } from "@/components/Channel/Message";
import { ScrollContainer } from "@/components/Channel/ScrollContainer";
import { EmojiContextProvider, useEmojiPicker } from "@/contexts/EmojiContext";
import { useIntersectionObserver } from "@/hooks";
import { trpc } from "@/lib/trpc/client";

type Props = {
  params: { channel: string };
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const Channel = ({ params: { channel } }: Props) => {
  const inner = useRef<HTMLDivElement | null>(null);
  const outer = useRef<HTMLDivElement | null>(null);

  const { isVisible } = useIntersectionObserver(inner, {
    root: outer.current,
    rootMargin: "10px",
    threshold: 0,
  });

  const { Picker } = useEmojiPicker();

  const { data, isLoading, fetchNextPage, hasNextPage } =
    trpc.messages.getMessagesByChannelId.useInfiniteQuery(
      {
        channelId: +channel,
      },
      {
        getNextPageParam: ({ nextCursor }) => nextCursor,
      },
    );

  let lastDate: Date | undefined;

  if (isLoading) return <>loading</>;

  if (!data) return <div>error</div>;

  if (isVisible && hasNextPage) void fetchNextPage();

  return (
    <div ref={outer} className="relative">
      <ScrollContainer>
        {data.pages
          .flatMap((d) => d.messages)
          .map((msg, i, arr) => {
            const newDay =
              lastDate?.getDay() !== msg.createdAt.getDay() && i !== 0;
            lastDate = msg.createdAt;

            return (
              <Fragment key={msg.id}>
                {newDay ? (
                  <div className="px-4 pb-2 pt-6">
                    <div className="relative h-[1px] w-full bg-gray-500">
                      <div className="absolute left-1/2 -translate-y-1/2 bg-zinc-700 text-xs">
                        {`${
                          MONTHS[msg.createdAt.getMonth()]
                        } ${msg.createdAt.getDate()}, ${msg.createdAt.getFullYear()}`}
                      </div>
                    </div>
                  </div>
                ) : null}
                <div
                  className="pt-[17px]"
                  ref={i === arr.length - 1 ? inner : undefined}
                >
                  <Message msg={msg} />
                </div>
              </Fragment>
            );
          })}
      </ScrollContainer>
      <Picker />
    </div>
  );
};

const Provider = (props: Props) => (
  <EmojiContextProvider>
    <Channel {...props} />
  </EmojiContextProvider>
);

export default Provider;
