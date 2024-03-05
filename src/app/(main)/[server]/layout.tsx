import { type ReactNode } from "react";
import { z } from "zod";
import { ChannelBrowserButton } from "@/components/ChannelSelection/ChannelBrowser";
import { GroupList } from "@/components/ChannelSelection/GroupList";
import { DropdownMenu } from "@/components/ChannelSelection/Menu/DropdownMenu";
import { MenuOpener } from "@/components/ChannelSelection/MenuOpener";
import { UserStatus } from "@/components/ChannelSelection/UserStatus";
import { InviteContextProvider } from "@/contexts/InviteContext";
import { serverTrpc } from "@/lib/trpc/api";

type Props = {
  children: ReactNode;
  params: unknown;
};

const Server = async ({ children, params }: Props) => {
  const { server: serverId } = z
    .object({ server: z.coerce.number() })
    .parse(params);

  const server = await serverTrpc.servers.getServerById.query({
    id: serverId,
  });

  return (
    <InviteContextProvider>
      <div className="flex flex-1">
        <div className="relative flex h-screen w-60 flex-col bg-zinc-800 bg-opacity-80">
          <MenuOpener name={server.name}>
            <DropdownMenu />
          </MenuOpener>
          <ChannelBrowserButton defaultChannel={server.defaultChannel} />
          <GroupList serverId={serverId} groups={server.groups} />
          <UserStatus />
        </div>
        {children}
      </div>
    </InviteContextProvider>
  );
};

export default Server;
