import { type EmojiMartData } from "@emoji-mart/data";
import data from "@emoji-mart/data";
import { type CompleteMessage } from "@/lib/db/schema/messages";

type Props = {
  reactions: CompleteMessage["reactions"];
};

export const Reactions = ({ reactions }: Props) => {
  const emojiData = (data as EmojiMartData).emojis;

  return (
    <div className="flex h-[30px]">
      {reactions.map((r) => (
        <div key={r.reactionId} className="flex">
          <div className="text-xl">
            {emojiData[r.reactionId]?.skins[0]?.native}
          </div>
          <div>{r.reactor.length}</div>
        </div>
      ))}
    </div>
  );
};
