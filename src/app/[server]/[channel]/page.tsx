"use client";
import Image from "next/image";
import { Fragment, useRef } from "react";
import { ScrollContainer } from "@/components/Channel/ScrollContainer";
import { useIntersectionObserver } from "@/lib/hooks";
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

  const highestPost = useRef<HTMLDivElement | null>(null);

  const { isVisible } = useIntersectionObserver(highestPost);

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

  const today = new Date().getDay();

  if (isLoading) return <>loading</>;

  if (!data) return <div>error</div>;

  if (isVisible && hasNextPage) void fetchNextPage();

  console.log("is visible? ", isVisible);
  console.log(data, hasNextPage);

  return (
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
                ref={i === arr.length - 1 ? highestPost : undefined}
              >
                <div className="min-h-12 relative flex">
                  <div className="absolute left-[16px] top-1 overflow-hidden rounded-3xl">
                    <Image
                      src={msg.author.image || ""}
                      alt={msg.author.name!}
                      height={40}
                      width={40}
                    />
                  </div>
                  <div className="pl-[72px]">
                    <div className="flex">
                      <div className="text-purple-600">{msg.author.name}</div>
                      <div className="flex items-center pl-2 text-xs">
                        <div>
                          {msg.createdAt.getDay() === today
                            ? `today at ${msg.createdAt.toLocaleTimeString()}`
                            : msg.createdAt.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div>{msg.body}</div>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
    </ScrollContainer>
  );
};

export default Channel;
