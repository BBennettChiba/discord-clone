import { type EmojiMartData } from "@emoji-mart/data";
import data from "@emoji-mart/data";

type Props = {
  reactions: string[];
};

export const Reactions = ({ reactions }: Props) => {
  const emojiData = (data as EmojiMartData).emojis;
  const mappedReactions = reactions.map(
    (reaction) => emojiData[reaction]?.skins[0]?.native,
  );

  return (
    <div className="h-[30px]">
      {mappedReactions.map((r) => (
        <div key={r} className="text-3xl">
          {r}
        </div>
      ))}
    </div>
  );
};
