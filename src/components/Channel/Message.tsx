import Image from "next/image";
import { useParams } from "next/navigation";
import { usePickerMenu } from "@/contexts/PickerMenuContext";
import { type CompleteMessage } from "@/lib/db/schema/messages";
import { trpc } from "@/lib/trpc/client";
import { cn, paramsSchema } from "@/lib/utils";
import { MessageHoverToolbar } from "./MessageHoverToolbar";
import { Reactions } from "./Reactions";

type Props = {
  msg: CompleteMessage;
  displayAllInfo: boolean;
};

export const Message = ({ msg, displayAllInfo }: Props) => {
  const { isOpenWhere } = usePickerMenu();
  const today = new Date().getDay();
  const time = `${msg.createdAt.getHours()}:${String(
    msg.createdAt.getMinutes(),
  ).padStart(2, "0")}`;

  return (
    <>
      {msg.parentId ? <Reply parentId={msg.parentId} /> : null}
      <div className="min-h-12 group relative flex flex-col hover:bg-zinc-800 hover:bg-opacity-30">
        {displayAllInfo ? (
          <div className="absolute left-4 top-1 overflow-hidden rounded-3xl">
            <Image
              src={msg.author.image || ""}
              alt={msg.author.name!}
              height={40}
              width={40}
            />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="absolute left-4 hidden text-xs group-hover:block">
              {time}
            </div>
          </div>
        )}
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
          {msg.reactions.length > 0 ? (
            <Reactions reactions={msg.reactions} />
          ) : null}
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
    </>
  );
};

/**
 * @TODO add delete message and create menu for ... menu or right click
 */

const Reply = ({ parentId }: { parentId: number }) => {
  const { channel: channelId } = paramsSchema.parse(useParams());
  if (!channelId) throw new Error("channel cannot be parsed");

  const { data } = trpc.messages.getMessageById.useQuery({ id: parentId });
  const parent = data ?? {
    author: { name: "loading", image: null },
    body: "loading",
  };

  return (
    <div className="relative flex items-center overflow-hidden overflow-ellipsis whitespace-nowrap break-words pl-[72px] text-sm text-gray-400 before:absolute before:left-9 before:top-1/2 before:h-2 before:w-8 before:rounded-tl-[4px] before:border-l before:border-t before:border-gray-500">
      <div className="overflow-hidden rounded-full indent-[-624.88rem] ">
        {parent.author.image ? (
          <Image
            src={parent.author.image}
            width={16}
            height={16}
            alt="parent author avatar"
          />
        ) : (
          parent.author.name
        )}
      </div>

      <span className="relative pl-1 font-medium text-yellow-400 opacity-[0.64]">
        @{parent.author.name || ""}
      </span>
      <div className="cursor-pointer text-ellipsis">
        <div className="relative flex items-center pl-3 text-center">
          <span>{parent.body || ""}</span>
          <span>.</span>{" "}
          {/* <span className="inline-block h-5 text-xs font-medium text-zinc-400">
            <div>
              <span className="text-[0.63rem]">(edited)</span>
            </div>
          </span> */}
        </div>
      </div>
    </div>
  );
};

/**@TODO add edited tag for edits */
/**@TODO add line from parent to child */
