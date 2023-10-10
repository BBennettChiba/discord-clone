import { Hash, LookingGlass } from "@/components/Icons";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { icons } from "./Icons";
import { SearchBar } from "./SearchBar";

type Props = {
  channel: RouterOutputs["channels"]["getChannelById"];
};

export const TopBar = ({ channel }: Props) => (
  <div className="flex flex-shrink-0 h-12 items-center border-b border-black">
    <div className="pl-4">
      <Hash className="h-6 w-6" />
    </div>
    <div className="p-2">{channel.name}</div>
    <div className="h-full p-2">
      <div className="h-full w-[1px] bg-gray-500" />
    </div>
    <div className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap p-2 text-xs">
      {channel.description}
    </div>
    {icons.map(({ svg, text }, i) => (
      <div key={i} className="group relative cursor-pointer px-2">
        <HoverText text={text} />
        {svg}
      </div>
    ))}
    <div className="px-2">
      <SearchBar>
        <LookingGlass className="absolute right-1 top-1/2 z-[2] h-[18px] w-[18px] -translate-y-1/2 text-zinc-400" />
      </SearchBar>
    </div>
  </div>
);

const HoverText = ({ text }: { text: string }) => (
  <div className="absolute left-1/2 top-full z-10 hidden -translate-x-1/2 flex-col items-center whitespace-nowrap text-xs group-hover:flex">
    <div className="h-2 w-2 translate-y-1/2 rotate-45 bg-black" />
    <div className="rounded-md bg-black p-2">{text}</div>
  </div>
);
