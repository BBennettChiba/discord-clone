import { type ReactNode } from "react";
import { MembersList } from "@/components/Channel/MembersList";
import { MessageInput } from "@/components/Channel/MessageInput";
import { TopBar } from "@/components/Channel/TopBar/TopBar";
import { InputHeightProvider } from "@/contexts/InputHeightContext";
import { PickerMenuProvider } from "@/contexts/PickerMenuContext";
import { serverTrpc } from "@/lib/trpc/api";
import { OptionsMenuProvider } from "@/contexts/OptionsMenuContext";

type Props = { children: ReactNode; params: { channel: string } };

const Layout = async ({ children, params: { channel } }: Props) => {
  const channelData = await serverTrpc.channels.getChannelById.query({
    id: +channel,
  });

  return (
    <div className="flex h-screen flex-1 flex-col bg-zinc-700">
      <InputHeightProvider>
        <PickerMenuProvider>
          <OptionsMenuProvider>
            <TopBar channel={channelData} />
            <div className="flex min-h-0 flex-1 overflow-hidden">
              {children}
              <div className="h-full w-1" />
              <MembersList channelId={+channel} />
            </div>
            <MessageInput channelName={channelData.name} channelId={+channel} />
          </OptionsMenuProvider>
        </PickerMenuProvider>
      </InputHeightProvider>
    </div>
  );
};

export default Layout;

/**
 * @TODO add tenor support
 */
