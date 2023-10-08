import { type ReactNode } from "react";
import { ChannelBrowserButton } from "@/components/ChannelSelection/ChannelBrowser";
import { GroupList } from "@/components/ChannelSelection/GroupList";
import { DropdownMenu } from "@/components/ChannelSelection/Menu/DropdownMenu";
import { MenuOpener } from "@/components/ChannelSelection/MenuOpener";
import { UserStatus } from "@/components/ChannelSelection/UserStatus";
import { InviteContextProvider } from "@/contexts/InviteContext";
import { serverTrpc } from "@/lib/trpc/api";

type Props = {
  children: ReactNode;
  params: { server: string };
};

const Server = async ({ children, params: { server: serverId } }: Props) => {
  const server = await serverTrpc.servers.getServerById.query({
    id: +serverId,
  });

  if (!server) throw new Error("no Server in main/server/layout");

  return (
    <InviteContextProvider>
      <div className="flex flex-1">
        <div className="relative flex h-screen w-60 flex-col bg-zinc-800">
          <MenuOpener name={server.name}>
            <DropdownMenu />
          </MenuOpener>
          <ChannelBrowserButton defaultChannel={server.defaultChannel} />
          <GroupList serverId={+serverId} />
          <UserStatus />
        </div>
        {children}
      </div>
    </InviteContextProvider>
  );
};

export default Server;
