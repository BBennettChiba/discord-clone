import { BackButton } from "@/components/ChannelBrowser/BackButton";
import { Browser } from "@/components/ChannelBrowser/Browser";
import { HashWithLookingGlass } from "@/components/Icons";
import { serverTrpc } from "@/lib/trpc/api";

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
  const groups = await serverTrpc.groups.getGroupsByServerId.query({
    serverId: +server,
  });

  let lastChannel = groups
    .map((g) => g.channels)
    .flat()
    .find((c) => c.id === +last);
  if (!lastChannel) lastChannel = groups[0].channels[0];

  return (
    <div className="flex h-full w-full flex-col bg-zinc-800">
      <div className="flex h-12 w-full items-center border-b border-black">
        <div className="p-2">
          {<HashWithLookingGlass className="h-6 w-6" />}
        </div>
        <div>&nbsp;Browse Channels</div>
        <BackButton lastChannel={lastChannel} />
      </div>
      <Browser />
    </div>
  );
};

export default ChannelBrowser;
