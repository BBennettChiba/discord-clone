import Image from "next/image";
import { type trpc } from "@/lib/trpc/client";
import { MessageHoverToolbar } from "./MessageHoverToolbar";

type MessageT = Awaited<
  Exclude<
    ReturnType<
      typeof trpc.messages.getMessagesByChannelId.useInfiniteQuery
    >["data"],
    undefined
  >["pages"][number]["messages"][number]
>;
type Props = {
  msg: MessageT;
};

export const Message = ({ msg }: Props) => {
  const today = new Date().getDay();
  return (
    <div className="min-h-12 group relative flex hover:bg-zinc-800 hover:bg-opacity-30">
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
              {msg.createdAt.getDate() === today
                ? `today at ${msg.createdAt.toLocaleTimeString()}`
                : msg.createdAt.toLocaleString()}
            </div>
          </div>
        </div>
        <div>{msg.body}</div>
      </div>
      <div className="absolute -translate-y-1/2 right-0 group-hover:block hidden">
        <MessageHoverToolbar />
      </div>
    </div>
  );
};
