import { type ReactNode } from "react";
import { ChannelBrowserButton } from "@/components/ChannelSelection/ChannelBrowser";
import { GroupList } from "@/components/ChannelSelection/GroupList";
import { MenuOpener } from "@/components/ChannelSelection/MenuOpener";
import { UserStatus } from "@/components/ChannelSelection/UserStatus";
import { serverTrpc } from "@/lib/trpc/caller";

type Props = {
  children: ReactNode;
  params: { server: string};
};

const Server = async ({ children, params: { server: serverId } }: Props) => {
  const server = await serverTrpc.servers.getServerById({ id: +serverId });

  return (
    <div className="flex flex-1">
      <div className="relative flex  h-screen w-60 flex-col bg-zinc-800">
        <MenuOpener name={server.name} />
        <ChannelBrowserButton />
        <GroupList serverId={+serverId} />
        <UserStatus />
      </div>
      {children}
    </div>
  );
};

export default Server;
