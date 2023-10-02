import { type ReactNode } from "react";
import { ChannelBrowserButton } from "@/components/ChannelSelection/ChannelBrowser";
import { GroupList } from "@/components/ChannelSelection/GroupList";
import { MenuOpener } from "@/components/ChannelSelection/MenuOpener";
import { UserStatus } from "@/components/ChannelSelection/UserStatus";
import { SubscribedChannelContextProvider } from "@/contexts/SubscribedChannelContext";
import { serverTrpc } from "@/lib/trpc/caller";

type Props = {
  children: ReactNode;
  params: { server: string };
};

const Server = async ({ children, params: { server: serverId } }: Props) => {
  const server = await serverTrpc.servers.getServerById({ id: +serverId });

  return (
    <div className="flex flex-1">
      <SubscribedChannelContextProvider serverId={+serverId}>
        <div className="relative flex  h-screen w-60 flex-col bg-zinc-800">
          <MenuOpener name={server.name} />
          <ChannelBrowserButton defaultChannel={server.defaultChannel} />
          <GroupList serverId={+serverId} />
          <UserStatus />
        </div>
        {children}
      </SubscribedChannelContextProvider>
    </div>
  );
};

export default Server;
