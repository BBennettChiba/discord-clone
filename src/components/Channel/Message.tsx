import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEditMessage } from "@/contexts/EditMessageContext";
import { usePickerMenu } from "@/contexts/PickerMenuContext";
import { type CompleteMessage } from "@/lib/db/schema/messages";
import { cn } from "@/lib/utils";
import { EditMessage } from "./EditMessage";
import { MessageHoverToolbar } from "./MessageHoverToolbar";
import { Reactions } from "./Reactions";
import { Reply } from "./Reply";

type Props = {
  msg: CompleteMessage;
  displayAllInfo: boolean;
};

export const Message = ({ msg, displayAllInfo }: Props) => {
  const { data: session } = useSession();
  const { isOpenWhere } = usePickerMenu();
  const { editId } = useEditMessage();
  const today = new Date().getDay();
  const time = `${msg.createdAt.getHours()}:${String(
    msg.createdAt.getMinutes(),
  ).padStart(2, "0")}`;

  const imgCheck = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

  const imgSrc = msg.body.match(imgCheck);

  if (!session) throw new Error("no session in message component");

  const userIsOwner = msg.author.id === session.user.id;

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
          <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 text-xs group-hover:block">
            {time}
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

          {imgSrc && imgSrc.length > 0 ? (
            <>
              <img
                src={imgSrc[0]}
                className="max-h-[350px]"
                alt="reaction gif"
              />
              {msg.body.replace(imgSrc[0], "")}
            </>
          ) : (
            <>
              {editId === msg.id ? (
                <EditMessage body={msg.body} />
              ) : (
                <div>{msg.body}</div>
              )}
            </>
          )}
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
          <MessageHoverToolbar messageId={msg.id} userIsOwner={userIsOwner} />
        </div>
      </div>
    </>
  );
};

/**
 * @TODO add delete message and create menu for ... menu or right click
 */
