import Image from "next/image";
import { ScrollContainer } from "@/components/Channel/ScrollContainer";
import { serverTrpc } from "@/lib/trpc/caller";

type Props = {
  params: { channel: string };
};

const Channel = async ({ params: { channel } }: Props) => {
  const messages = await serverTrpc.messages.getMessagesByChannelId({
    channelId: +channel,
  });

  let lastDate: Date | undefined;

  const today = new Date().getDay();
  return (
    <ScrollContainer>
      {messages.map((msg, i) => {
        const newDay = lastDate?.getDay() !== msg.createdAt.getDay() && i !== 0;
        lastDate = msg.createdAt;
        return (
          <>
            {newDay ? <div>NEW DAY!!!!!!!!!!</div> : null}
            <div key={msg.id} className="pt-[17px]">
              <div className="min-h-12 relative flex">
                <div className="absolute left-[16px] top-1 overflow-hidden rounded-3xl">
                  <Image
                    src={msg.author.image || ""}
                    alt={msg.author.name!}
                    height={40}
                    width={40}
                  />
                </div>
                <div className="pl-[72px]">
                  <div className="flex">
                    <div className="text-purple-600">{msg.author.name}</div>
                    <div className="flex items-center pl-2 text-xs">
                      <div>
                        {msg.createdAt.getDay() === today
                          ? `today at ${msg.createdAt.toLocaleTimeString()}`
                          : msg.createdAt.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div>{msg.body}</div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </ScrollContainer>
  );
};

export default Channel;
