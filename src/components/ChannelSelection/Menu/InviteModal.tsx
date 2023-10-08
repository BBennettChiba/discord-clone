import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";
import { Hash } from "@/components/Icons";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";

type FullInvite = RouterOutputs["invites"]["createInvite"];

const paramsSchema = z.object({
  server: z.coerce.number(),
});

export const InviteModal = ({
  toChannelId,
}: {
  toChannelId: null | number;
}) => {
  const [invite, setInvite] = useState<FullInvite | null>(null);
  const { mutate: createInvite } = trpc.invites.createInvite.useMutation({
    onSuccess: (data) => setInvite(data),
  });

  const { server: serverId } = paramsSchema.parse(useParams());
  useEffect(() => {
    createInvite({ serverId, toChannelId });
  }, [createInvite, serverId, toChannelId]);

  if (!invite) return null;

  return (
    <div className="absolute h-screen w-screen bg-black opacity-60">
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-72 w-96">
          <div className="flex">
            <h2>Invite friends to {invite.server.name}</h2>
            <div className="group relative flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-300">
              <div className="absolute h-5 w-[1px] origin-center -rotate-45 bg-white transition-all" />
              <div className="absolute h-5 w-[1px] origin-center rotate-45 bg-white transition-all" />
            </div>
          </div>
          <div className="flex">
            <Hash className="h-5 w-5" />
            {invite.toChannel.name}
          </div>
        </div>
      </div>
    </div>
  );
};
