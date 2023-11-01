"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { type MenuType } from "@/contexts/MenuContext";
import { useClickAway } from "@/hooks";
import { trpc } from "@/lib/trpc/client";
import { paramsSchema } from "@/lib/utils";
import { Options } from "./Options";

type Props = {
  id: number;
  closeMenu: () => void;
};

const USER_IS_ADMIN = (() => Math.random() < 0.5)();

export const OptionsMenu: MenuType = ({ closeMenu, id }: Props) => {
  const ref = useClickAway<HTMLDivElement>(closeMenu);
  const utils = trpc.useUtils().messages.getMessagesByChannelId;
  const { channel: channelId } = paramsSchema.parse(useParams());
  if (!channelId) throw new Error("Invalid channelID in Options Menu");
  const { data: session } = useSession();
  if (!session) throw new Error("Invalid session in Options Menu");

  const messages = utils.getInfiniteData({ channelId });
  if (!messages) throw new Error("No messages in getQueryData");

  const thisMessage = messages.pages
    .map((page) => page.messages)
    .flat()
    .find((m) => m.id === id);

  const userIsOwner = thisMessage?.authorId === session.user.id;

  const { mutate: deleteMessage } = trpc.messages.deleteMessage.useMutation({
    onSettled: async () => {
      await utils.invalidate({ channelId });
    },
  });

  const handleDelete = () => {
    deleteMessage({ id });
    closeMenu();
  };

  return (
    <div ref={ref} className="w-[204px] bg-black px-2 py-[6px]">
      <div className="flex justify-between py-[6px] pl-[2px]">
        {EMOJI.map((e) => (
          <div
            key={e}
            className="flex h-10 w-10 items-center justify-center rounded-3xl bg-gray-900"
          >
            <button>
              <div className="h-5 w-5 text-xl ">{e}</div>
            </button>
          </div>
        ))}
      </div>
      <Options
        userIsOwner={userIsOwner}
        userIsAdmin={USER_IS_ADMIN}
        handleDelete={handleDelete}
        id={id}
        thisMessage={thisMessage}
      />
    </div>
  );
};

export const EMOJI = ["😆", "👍", "💯", "☝️"];

/**
O find out why top isn't flush
 * @TODO open emoji menu when hover on emoji option
 * @TODO add separator before last line */
