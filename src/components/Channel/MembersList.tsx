import Image from "next/image";
import { serverTrpc } from "@/lib/trpc/api";

type Props = {
  channelId: number;
};

export const MembersList = async ({ channelId }: Props) => {
  const users = await serverTrpc.users.getUsersByChannel.query({ channelId });
  return (
    <>
      <input type="checkbox" className="peer hidden" id="checkbox" />
      <div className="w-0 flex-col overflow-hidden peer-checked:flex peer-checked:w-60">
        {users.map((user) => (
          <div key={user.id} className="flex h-[46px] w-full">
            <div className="">
              <Image
                src={user.image || ""}
                height={32}
                width={32}
                alt="avatar"
              />
            </div>
            <div>{user.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};
