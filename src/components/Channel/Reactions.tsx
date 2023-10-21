import { type EmojiMartData } from "@emoji-mart/data";
import data from "@emoji-mart/data";
import { type InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { type CompleteMessage } from "@/lib/db/schema/messages";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { cn, paramsSchema } from "@/lib/utils";

type Props = {
  reactions: CompleteMessage["reactions"];
};

type InfiniteMessages = InfiniteData<
  RouterOutputs["messages"]["getMessagesByChannelId"]
>;

export const Reactions = ({ reactions }: Props) => {
  const emojiData = (data as EmojiMartData).emojis;

  const { channel: channelId } = paramsSchema.parse(useParams());
  const client = useQueryClient();

  const { data: session } = useSession();

  if (!session)
    throw new Error("something went wrong no session returned from useSession");
  const userId = session.user.id;

  const KEY = [
    ["messages", "getMessagesByChannelId"],
    { input: { channelId }, type: "infinite" },
  ];

  const { mutate: toggleMutate } = trpc.reactions.toggleReaction.useMutation({
    onSettled: () => client.invalidateQueries(KEY),
    onSuccess: (successData) => {
      client.setQueryData<InfiniteMessages>(KEY, (prev) =>
        prev
          ? {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                messages: page.messages.map((message) => ({
                  ...message,
                  reactions: message.reactions.map((reaction) => ({
                    ...reaction,
                    reactors:
                      successData.action === "deleted"
                        ? reaction.reactors.filter(
                            (reactor) =>
                              reactor.userId === userId &&
                              reactor.reactionToMessagesReactionId ===
                                successData.reactionId &&
                              reactor.reactionToMessagesMessageId ===
                                successData.messageId,
                          )
                        : [
                            ...reaction.reactors,
                            {
                              reactionToMessagesMessageId:
                                successData.messageId,
                              reactionToMessagesReactionId:
                                successData.reactionId,
                              userId,
                              reactor: {
                                email: session.user.email!,
                                emailVerified: null,
                                name: session.user.name!,
                                id: userId,
                                image: session.user.image!,
                              },
                            },
                          ],
                  })),
                })),
              })),
            }
          : prev,
      );
    },
  });
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
