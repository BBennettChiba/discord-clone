import { z } from "zod";
import { BackButton } from "@/components/ChannelBrowser/BackButton";
import { Browser } from "@/components/ChannelBrowser/Browser";
import { HashWithLookingGlass } from "@/components/Icons";
import { serverTrpc } from "@/lib/trpc/api";
import { throwError } from "@/lib/utils";

const ChannelBrowser = async (props: unknown) => {
  const {
    searchParams: { last },
    params: { server },
  } = z
    .object({
      searchParams: z.object({ last: z.coerce.number() }),
      params: z.object({ server: z.coerce.number() }),
    })
    .parse(props);

  const groups = await serverTrpc.groups.getGroupsByServerId.query({
    serverId: server,
  });

  let lastChannel = groups
    .map((g) => g.channels)
    .flat()
    .find((c) => c.id === last);
  if (!lastChannel)
    lastChannel =
      groups[0]?.channels[0] || throwError("no last channel found ");

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
