import { type ReactNode } from "react";
import { MembersList } from "@/components/Channel/MembersList";
import { MessageInput } from "@/components/Channel/MessageInput";
import { TopBar } from "@/components/Channel/TopBar/TopBar";
import { serverTrpc } from "@/lib/trpc/caller";

type Props = { children: ReactNode; params: { channel: string } };

const Layout = async ({ children, params: { channel } }: Props) => {
  const channelData = await serverTrpc.channels.getChannelById({
    id: +channel,
  });

  return (
    <div className="flex w-[calc(100dvw-312px)] flex-col bg-zinc-700">
      <TopBar channel={channelData} />
      <div className="flex">
        {children}
        <MembersList channelId={+channel} />
      </div>
      <MessageInput channelName={channelData.name} channelId={+channel} />
    </div>
  );
};

export default Layout;

/**
 * @TODO add tenor and emoji support
 */
