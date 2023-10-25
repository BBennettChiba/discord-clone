import Image from "next/image";
import { useParams } from "next/navigation";
import { useScrollTo } from "@/contexts/ScrollToContext";
import { trpc } from "@/lib/trpc/client";
import { paramsSchema } from "@/lib/utils";

export const Reply = ({ parentId }: { parentId: number }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { channel: channelId } = paramsSchema.parse(useParams());
  if (!channelId) throw new Error("channel cannot be parsed");

  const { data } = trpc.messages.getMessageById.useQuery({ id: parentId });
  const parent = data ?? {
    author: { name: "loading", image: null },
    body: "loading",
  };

  const { scrollTo } = useScrollTo();

  const handleClick = () => {
    scrollTo(parentId);
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
      <div className="cursor-pointer flex items-center" onClick={handleClick}>
        <span className="overflow-hidden whitespace-nowrap text-ellipsis min-h-0 max-w-[60dvw]">{parent.body || ""}</span>
        {/* <span className="inline-block h-5 text-xs font-medium text-zinc-400">
            <div>
              <span className="text-[0.63rem]">(edited)</span>
            </div>
          </span> */}
      </div>
    </div>
  );
};

/**@TODO add edited tag for edits */
