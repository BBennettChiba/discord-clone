import Image from "next/image";
import { serverTrpc } from "@/lib/trpc/api";

type Props = {
  channelId: number;
};

export const MembersList = async ({ channelId }: Props) => {
  const users = await serverTrpc.users.getUsersByChannel.query({ channelId });
  console.log(users);
  return (
    <>
      <input type="checkbox" className="peer hidden" id="checkbox" />
      <div className="w-0 flex-shrink-0 overflow-hidden bg-zinc-800 peer-checked:block peer-checked:w-60">
        {users.map((user) => (
          <div key={user.id} className="w-full p-2">
            <div className="flex h-[46px] items-center text-gray-400">
              <div className="pr-3">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={user.image || ""}
                    height={32}
                    width={32}
                    alt="avatar"
                  />
                </div>
              </div>
              <div>{user.name}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
