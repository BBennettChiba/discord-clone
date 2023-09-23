import Image from "next/image";
import { useEmojiPicker } from "@/contexts/EmojiContext";
import { type trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
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
  const { isOpenWhere } = useEmojiPicker();
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
      <div
        className={cn(
          `absolute right-0 hidden -translate-y-1/2 group-hover:block`,
          {
            block: msg.id === isOpenWhere,
          },
        )}
      >
        <MessageHoverToolbar messageId={msg.id} />
      </div>
    </div>
  );
};
