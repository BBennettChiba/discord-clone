import { type EmojiMartData } from "@emoji-mart/data";
import data from "@emoji-mart/data";
import { useSession } from "next-auth/react";
import { type CompleteMessage } from "@/lib/db/schema/messages";
import { cn } from "@/lib/utils";

type Props = {
  reactions: CompleteMessage["reactions"];
};

export const Reactions = ({ reactions }: Props) => {
  const emojiData = (data as EmojiMartData).emojis;
  
  
  const { data: session } = useSession();
  if (!session)
    throw new Error("something went wrong no session returned from useSession");
  const userId = session.user.id;

  return (
    <div className="flex gap-1">
      {reactions.map((r) => (
        <button
          key={r.reactionId}
          className={cn(
            "flex rounded-md border border-transparent bg-zinc-800 bg-opacity-30 px-[5px] py-[2px] hover:border-gray-500",
            {
              "border-indigo-500": r.reactors.some(
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
