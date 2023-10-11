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
  i: number;
  arr: Array<MessageT>;
};

export const Message = ({ msg, i, arr }: Props) => {
  const { isOpenWhere } = useEmojiPicker();
  const today = new Date().getDay();
  const lastMessage = arr[i + 1];
  let displayAllInfo = true;
  if (
    lastMessage &&
    lastAuthorIsSame(msg, lastMessage) &&
    tenMinutesHaveNotPassed(msg, lastMessage)
  ) {
    displayAllInfo = false;
  }
  return (
    <div className="min-h-12 group relative flex hover:bg-zinc-800 hover:bg-opacity-30">
      {displayAllInfo ? (
        <div className="absolute left-[16px] top-1 overflow-hidden rounded-3xl">
          <Image
            src={msg.author.image || ""}
            alt={msg.author.name!}
            height={40}
            width={40}
          />
        </div>
      ) : null}
      <div className="pl-[72px]">
        {displayAllInfo ? (
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
        ) : null}
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

const tenMinutesHaveNotPassed = (message1: MessageT, message2: MessageT) =>
  !(message1.createdAt.getTime() - message2.createdAt.getTime() > 600000);

const lastAuthorIsSame = (message1: MessageT, message2: MessageT) =>
  message1.authorId === message2.authorId;

/**
 * @TODO display time on hover when !displayAllInfo 
 * @TODO add delete message and create menu for ... menu or right click
*/