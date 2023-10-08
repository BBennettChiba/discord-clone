import { useParams } from "next/navigation";
import { useEffect } from "react";
import z from "zod";
import { Hash } from "@/components/Icons";
import { type ToChannel, useInvite } from "@/contexts/InviteContext";
import { trpc } from "@/lib/trpc/client";

const paramsSchema = z.object({
  server: z.coerce.number(),
});

export const InviteModal = ({ toChannel }: { toChannel: ToChannel }) => {
  const { toggleModal } = useInvite();

  const { mutate: createInvite, data: mutationData } =
    trpc.invites.createInvite.useMutation();

  const { data: invite } = trpc.invites.getInviteById.useQuery(
    { id: mutationData?.id || "" },
    { enabled: !!mutationData },
  );

  const { data: channel } = trpc.channels.getChannelById.useQuery(
    { id: toChannel?.id || invite?.server.defaultChannel || 0 },
    { enabled: !!toChannel || !!invite },
  );

  const { server: serverId } = paramsSchema.parse(useParams());

  useEffect(() => {
    createInvite({ serverId, toChannelId: toChannel?.id ?? null });
  }, [createInvite, serverId, toChannel]);

  if (!invite || !channel) return null;

  return (
    <div className="absolute h-screen w-screen bg-black opacity-60">
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-72 w-96">
          <div className="flex">
            <h2>Invite friends to {invite.server.name}</h2>
            <div
              className="group relative flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-300"
              onClick={() => toggleModal()}
            >
              <div className="absolute h-5 w-[1px] origin-center -rotate-45 bg-white transition-all" />
              <div className="absolute h-5 w-[1px] origin-center rotate-45 bg-white transition-all" />
            </div>
          </div>
          <div className="flex">
            <Hash className="h-5 w-5" />
            {channel.name}
          </div>
        </div>
      </div>
    </div>
  );
};
