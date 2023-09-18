import { serverTrpc } from "@/lib/trpc/caller";

type Props = {
  params: { channel: string };
};

const Channel = async ({ params: { channel } }: Props) => {
  const messages = await serverTrpc.messages.getMessagesByChannelId({
    channelId: +channel,
  });
  return (
    <div className="h-[calc(100vh-116px)] overflow-y-auto bg-zinc-700">
      {messages.map((msg) => (
        <div key={msg.id}>
          <div>id: {msg.id}</div>
          <div>{msg.body}</div>
          <div>author: {msg.author.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Channel;
