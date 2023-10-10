import { useParams } from "next/navigation";
import { useEffect } from "react";
import z from "zod";
import { Hash, X } from "@/components/Icons";
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

  const link = `http://localhost:3000/invite/${invite.id}`;

  return (
    <div className="absolute h-screen w-screen bg-black bg-opacity-60">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative w-[440px] bg-zinc-600 opacity-100">
          <div
            className="relative flex items-center justify-start break-words rounded-tl rounded-tr p-4"
            style={{
              overflow: "hidden auto",
            }}
          >
            <button className="absolute bottom-[6.13rem] left-[25.38rem] right-[0.88rem] top-[0.88rem] z-[3] flex h-7 w-3 cursor-pointer items-center justify-center rounded p-1 text-gray-400 opacity-50 hover:text-white hover:opacity-100 transition-all duration-300">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) calc(2px), rgba(0, 0, 0, 0) calc(2px))",
                }}
              >
                <div className="" onClick={() => toggleModal()}>
                  <X className="inline h-6 w-6" />
                </div>
              </div>
            </button>
            <div className="w-full">
              <div className="flex flex-col">
                <div>
                  <h1 className="mb-1 mr-7 flex-grow font-medium text-gray-100">
                    Invite friends to{" "}
                    <strong className="font-semibold">
                      {invite.server.name}
                    </strong>
                  </h1>
                </div>
                <div className="mb-1 flex items-center">
                  <Hash className="mr-2 mt-1 h-5 w-5 text-gray-400" />
                  <div className="text-gray-400">{channel.name}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-row-reverse items-stretch justify-start rounded-bl rounded-br p-4"
            style={{
              overflow: "hidden auto",
            }}
          >
            <div className="flex w-full flex-grow flex-col items-stretch justify-start">
              <h2 className="mb-2 text-xs font-bold uppercase text-gray-400">
                Send a server invite link to a friend
              </h2>
              <div className="flex items-center justify-center rounded bg-neutral-800 text-zinc-200">
                <div className="flex flex-grow flex-col">
                  <input
                    className="bg h-10 w-full cursor-text overflow-hidden text-ellipsis rounded bg-neutral-800 p-3 text-xs"
                    value={link}
                    placeholder=""
                    type="text"
                  />
                </div>
                <button
                  className="mr-1 flex h-8 min-h-[2rem] w-16 cursor-pointer items-center justify-center rounded bg-indigo-500 px-4 py-1 text-center text-sm font-medium text-white"
                  onClick={() => void navigator.clipboard.writeText(link)}
                >
                  <div
                    className="mx-1.5"
                    style={{
                      backgroundImage:
                        "linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) calc(2px), rgba(0, 0, 0, 0) calc(2px))",
                    }}
                  >
                    Copy
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**@todo find out how to get base url */
