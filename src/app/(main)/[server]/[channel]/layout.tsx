import { type ReactNode } from "react";
import { z } from "zod";
import { MembersList } from "@/components/Channel/MembersList";
import { MessageInput } from "@/components/Channel/MessageInput";
import { TopBar } from "@/components/Channel/TopBar/TopBar";
import { EditMessageContextProvider } from "@/contexts/EditMessageContext";
import { InputHeightContextProvider } from "@/contexts/InputHeightContext";
import { OptionsMenuContextProvider } from "@/contexts/OptionsMenuContext";
import { PickerMenuContextProvider } from "@/contexts/PickerMenuContext";
import { ReplyContextProvider } from "@/contexts/ReplyContext";
import { serverTrpc } from "@/lib/trpc/api";

type Props = { children: ReactNode; params: unknown };

const Layout = async ({ children, params }: Props) => {
  const { channel } = z.object({ channel: z.coerce.number() }).parse(params);

  const channelData = await serverTrpc.channels.getChannelById.query({
    id: channel,
  });

  return (
    <div className="flex h-screen flex-1 flex-col bg-zinc-700">
      <ReplyContextProvider>
        <InputHeightContextProvider>
          <PickerMenuContextProvider>
            <OptionsMenuContextProvider>
              <EditMessageContextProvider>
                <TopBar channel={channelData} />
                <div className="flex min-h-0 flex-1 overflow-hidden">
                  {children}
                  <div className="h-full w-1" />
                  <MembersList channelId={+channel} />
                </div>
                <MessageInput
                  channelName={channelData.name}
                  channelId={channel}
                />
              </EditMessageContextProvider>
            </OptionsMenuContextProvider>
          </PickerMenuContextProvider>
        </InputHeightContextProvider>
      </ReplyContextProvider>
    </div>
  );
};

export default Layout;