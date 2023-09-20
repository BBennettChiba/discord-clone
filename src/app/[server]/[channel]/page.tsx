import Image from "next/image";
import React, { Fragment } from "react";
import { ScrollContainer } from "@/components/Channel/ScrollContainer";
import { serverTrpc } from "@/lib/trpc/caller";

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

const Channel = async ({ params: { channel } }: Props) => {
  const messages = await serverTrpc.messages.getMessagesByChannelId({
    channelId: +channel,
  });

  let lastDate: Date | undefined;

  const today = new Date().getDay();
  return (
    <ScrollContainer>
      {messages.map((msg, i) => {
        const newDay = lastDate?.getDay() !== msg.createdAt.getDay() && i !== 0;
        lastDate = msg.createdAt;

        return (
          <Fragment key={msg.id}>
            {newDay ? (
              <div className="px-4 pt-6 pb-2">
                <div className="relative h-[1px] w-full bg-gray-500">
                  <div className="absolute left-1/2 -translate-y-1/2 bg-zinc-700 text-xs">
                    {`${
                      MONTHS[msg.createdAt.getMonth()]
                    } ${msg.createdAt.getDate()}, ${msg.createdAt.getFullYear()}`}
                  </div>
                </div>
              </div>
            ) : null}
            <div className="pt-[17px]">
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
