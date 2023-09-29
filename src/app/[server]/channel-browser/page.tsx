import { BackButton } from "@/components/ChannelBrowser/BackButton";
import { HashWithLookingGlass } from "@/components/Icons";
import { serverTrpc } from "@/lib/trpc/caller";

type Props = {
  params: {
    server: `${number}`;
  };
  searchParams: {
    last: `${number}`;
  };
};

const ChannelBrowser = async ({
  params: { server },
  searchParams: { last },
}: Props) => {
  const groups = await serverTrpc.groups.getGroupByServerId({
    serverId: +server,
  });

  const lastChannel = groups
    .map((g) => g.channels)
    .flat()
    .find((c) => c.id === +last);
  if (!lastChannel) throw new Error("No last channel found");

  return (
    <div className="h-full w-full">
      <div className="flex h-12 w-full items-center bg-zinc-800 border-bottom">
        <div className="p-2">
          {<HashWithLookingGlass className="h-6 w-6" />}
        </div>
        <div>&nbsp;Browse Channels</div>
        <BackButton lastChannel={lastChannel} />
      </div>
      <div className="flex flex-col pl-4 pt-4">
        <input
          className="h-8 w-[60.69rem] flex-grow cursor-text bg-neutral-800 px-2 text-zinc-200"
          defaultValue=""
          placeholder="Search Channels"
        />
      </div>
    </div>
  );
};

export default ChannelBrowser;
