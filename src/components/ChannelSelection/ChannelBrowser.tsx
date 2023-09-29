"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HashWithLookingGlass } from "../Icons";

export const ChannelBrowserButton = ({
  defaultChannel,
}: {
  defaultChannel: number;
}) => {
  let { channel } = useParams();

  if (!channel) channel = defaultChannel.toString();

  return (
    <>
      <div className="px-2 pt-3">
        <div className="flex h-[34px] w-full cursor-pointer items-center rounded-md text-gray-400 hover:bg-zinc-700 hover:text-gray-300">
          <div className="flex items-center pl-2">
            {<HashWithLookingGlass className="h-[18px] w-[18px]" />}
          </div>
          <Link
            href={{ pathname: "channel-browser", query: { last: channel } }}
          >
            <div className="flex items-center pl-2">Browse Channels</div>
          </Link>
        </div>
      </div>
      <div className="px-3 pt-[11px]">
        <div className="h-[1px] bg-gray-600" />
      </div>
    </>
  );
};
