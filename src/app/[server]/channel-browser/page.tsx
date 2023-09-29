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

  const lastChannel = groups.map((g) => g.channels).flatMap((m) => m).find(c => c.id === +last)
  if (!lastChannel) throw new Error("No last channel found");

  return (
    <div className="h-full w-full">
      <div className="flex h-12 w-full bg-zinc-800">
        <div>{HashWithLookingGlass}</div>
        <div>Browse Channels</div>
        <BackButton lastChannel={lastChannel} />
      </div>
    </div>
  );
};

export default ChannelBrowser;
