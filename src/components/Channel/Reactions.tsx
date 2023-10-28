import { type EmojiMartData } from "@emoji-mart/data";
import data from "@emoji-mart/data";
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

  const utils = trpc.useUtils().messages.getMessagesByChannelId;

  const { data: session } = useSession();

  if (!session)
    throw new Error("something went wrong no session returned from useSession");
  const userId = session.user.id;

  const { mutate: toggleMutate } = trpc.reactions.toggleReaction.useMutation({
    onSettled: () => void utils.invalidate({ channelId }),
  });

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as const;

  const handleClick = (input: { reactionId: string; messageId: number }) => {
    toggleMutate(input);
  };

  return (
    <div className="flex h-[30px] gap-1 overflow-hidden">
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
          <div className="relative">
            <div className="invisible min-w-[14px] px-1" />
            {digits.map((digit, i) => (
              <div
                key={i}
                style={{
                  transform: `translateY(${
                    (i - r.reactors.length + 1) * 100
                  }%)`,
                }}
                className="absolute min-w-[14px] px-1 transition-all"
              >
                {digit}
              </div>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
};

/**
 type InfiniteMessages = InfiniteData<
  RouterOutputs["messages"]["getMessagesByChannelId"]
>;


 onSuccess: ({ reactionId, action, messageId }) => {
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
                      action === "deleted"
                        ? reaction.reactors.filter(
                            (reactor) =>
                              reactor.userId === userId &&
                              reactor.reactionToMessagesReactionId ===
                                reactionId &&
                              reactor.reactionToMessagesMessageId === messageId,
                          )
                        : [
                            ...reaction.reactors,
                            {
                              reactionToMessagesMessageId: messageId,
                              reactionToMessagesReactionId: reactionId,
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
    }, */
