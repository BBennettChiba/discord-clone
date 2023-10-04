import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { serverTrpc } from "@/lib/trpc/caller";

type Props = {
  params: { inviteId: string };
};

const InvitePage = async ({ params: { inviteId } }: Props) => {
  const invite = await serverTrpc.invites.getInviteById({ id: inviteId });
  if (!invite) return <>dude wtf</>;
  const imageSrc = invite.server.icon
    ? invite.server.icon
    : invite.creator.image;
  console.log(invite);
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-indigo-500">
      <div className="flex w-[480px] flex-col items-center bg-gray-800 p-8">
        <div className="pb-6">
          <div className="h-16 w-16 overflow-hidden rounded-xl">
            <Image
              src={imageSrc!}
              alt="server logo or invite creator avatar"
              width={64}
              height={64}
            />
          </div>
        </div>
        <h2 className="text-gray-400">
          {invite.creator.name} has invited you to join{" "}
        </h2>
        <h1 className="text-xl">{invite.server.name}</h1>
      </div>
    </div>
  );
};

export default InvitePage;

/**@TODO makes sure there is a src for the image. Also change the server to not require an image. if the user has no image and server has no image use css */
