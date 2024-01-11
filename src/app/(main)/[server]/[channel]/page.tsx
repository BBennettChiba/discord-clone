"use client";
import { Fragment, useRef } from "react";
import { z } from "zod";
import { Message } from "@/components/Channel/Message";
import { ScrollContainer } from "@/components/Channel/ScrollContainer";
import {
  ScrollToContextProvider,
  useScrollTo,
} from "@/contexts/ScrollToContext";
import { useIntersectionObserver } from "@/hooks";
import { type CompleteMessage } from "@/lib/db/schema/messages";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

type Props = {
  params: unknown;
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

const Channel = ({ params }: Props) => {
  const { channel } = z.object({ channel: z.coerce.number() }).parse(params);
  const inner = useRef<HTMLDivElement | null>(null);
  const outer = useRef<HTMLDivElement | null>(null);
  const { scrollTargetRef, scrollTargetId, scrollTo } = useScrollTo();

  const { isVisible } = useIntersectionObserver(inner, {
    root: outer.current,
    rootMargin: "10px",
    threshold: 0,
  });

  const { data, isLoading, fetchNextPage, hasNextPage } =
    trpc.messages.getMessagesByChannelId.useInfiniteQuery(
      {
        channelId: channel,
      },
      {
        getNextPageParam: ({ nextCursor }) => nextCursor,
      },
    );

  let lastDate: Date | undefined;

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );

  if (!data) return <div>error</div>;

  if (isVisible && hasNextPage) void fetchNextPage();

  const messages = data.pages.flatMap((d) => d.messages);

  const cantFindMessage = !messages.find((m) => m.id === scrollTargetId);

  if (
    scrollTargetId &&
    !scrollTargetRef.current &&
    cantFindMessage &&
    hasNextPage
  ) {
    void (async () => {
      await fetchNextPage();
      scrollTo(scrollTargetId);
    })();
  }

  return (
    <div ref={outer} className="relative flex flex-1">
      <ScrollContainer>
        {messages.map((msg, i, arr) => {
          const newDay =
            lastDate?.getDay() !== msg.createdAt.getDay() && i !== 0;
          lastDate = msg.createdAt;
          const lastMessage = arr[i + 1];
          let displayAllInfo = true;
          if (
            !msg.parentId &&
            lastMessage &&
            lastAuthorIsSame(msg, lastMessage) &&
            tenMinutesHaveNotPassed(msg, lastMessage)
          ) {
            displayAllInfo = false;
          }
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
              <div ref={msg.id === scrollTargetId ? scrollTargetRef : null}>
                <div
                  className={cn("pt-[17px]", { "pt-0": !displayAllInfo })}
                  style={{ zIndex: 999 - i }}
                  ref={i === arr.length - 1 ? inner : undefined}
                >
                  <Message msg={msg} displayAllInfo={displayAllInfo} />
                </div>
              </div>
            </Fragment>
          );
        })}
      </ScrollContainer>
    </div>
  );
};

const Wrapper = (props: Props) => (
  <ScrollToContextProvider>
    <Channel {...props} />
  </ScrollToContextProvider>
);
export default Wrapper;

const tenMinutesHaveNotPassed = (
  message1: NonNullable<CompleteMessage>,
  message2: NonNullable<CompleteMessage>,
) => !(message1.createdAt.getTime() - message2.createdAt.getTime() > 600000);

const lastAuthorIsSame = (
  message1: NonNullable<CompleteMessage>,
  message2: NonNullable<CompleteMessage>,
) => message1.authorId === message2.authorId;
