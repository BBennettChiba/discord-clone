import { BackButton } from "@/components/ChannelBrowser/BackButton";
import { Browser } from "@/components/ChannelBrowser/Browser";
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
    <div className="h-full w-full bg-zinc-800 flex flex-col">
      <div className="flex h-12 w-full items-center border-b border-black">
        <div className="p-2">
          {<HashWithLookingGlass className="h-6 w-6" />}
        </div>
        <div>&nbsp;Browse Channels</div>
        <BackButton lastChannel={lastChannel} />
      </div>

     <Browser groups={groups}/> 
    </div>
  );
};

export default ChannelBrowser;
