import { type EmojiMartData } from "@emoji-mart/data";
import data from "@emoji-mart/data";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { type CompleteMessage } from "@/lib/db/schema/messages";
import { trpc } from "@/lib/trpc/client";
import { cn, paramsSchema } from "@/lib/utils";

type Props = {
  reactions: CompleteMessage["reactions"];
};

export const Reactions = ({ reactions }: Props) => {
  const emojiData = (data as EmojiMartData).emojis;

  const { channel: channelId } = paramsSchema.parse(useParams());
  const client = useQueryClient();

  const { mutate: toggleMutate } = trpc.reactions.toggleReaction.useMutation({
    onSettled: () =>
      client.invalidateQueries([
        ["messages", "getMessagesByChannelId"],
        { input: { channelId }, type: "infinite" },
      ]),
  });

  const { data: session } = useSession();

  if (!session)
    throw new Error("something went wrong no session returned from useSession");
  const userId = session.user.id;

  const handleClick = (input: { reactionId: string; messageId: number }) => {
    toggleMutate(input);
  };

  return (
    <div className="flex gap-1">
      {reactions.map((r) => (
        <button
          onClick={() =>
            handleClick({ reactionId: r.reactionId, messageId: r.messageId })
          }
          key={r.reactionId}
          className={cn(
            "flex rounded-md border border-transparent bg-zinc-800 bg-opacity-30 px-[5px] py-[2px] hover:border-gray-500",
            {
              "border-indigo-500 hover:border-indigo-500": r.reactors.some(
                (reac) => reac.userId === userId,
              ),
            },
          )}
        >
          <div className="">{emojiData[r.reactionId]?.skins[0]?.native}</div>
          <div className="px-1">{r.reactors.length}</div>
        </button>
      ))}
    </div>
  );
};
