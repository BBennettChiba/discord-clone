import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { serverTrpc } from "@/lib/trpc/api";

type Props = {
  params: { inviteId: string };
};

const InvitePage = async ({ params: { inviteId } }: Props) => {
  const invite = await serverTrpc.invites.getInviteById.query({ id: inviteId });
  if (!invite) return <>dude wtf</>;

  const imageSrc = invite.server.icon
    ? invite.server.icon
    : invite.creator.image;

  const session = await getServerSession(authOptions);

  const joinServer = async () => {
    "use server";
    const sub = await serverTrpc.servers.joinServer.mutate({
      id: invite.server.id,
    });
    redirect(`/${sub.serverId}/${invite.server.defaultChannel}`);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-indigo-500">
      <div className="flex w-[480px] flex-col items-center rounded-md bg-gray-800 p-8">
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
        <h2 className="pt-2 text-gray-400">
          {invite.creator.name} has invited you to join{" "}
        </h2>
        <div className="pt-2">
          <h1 className="text-xl">{invite.server.name}</h1>
        </div>
        <div className="flex pt-2">
          {/* <div /> here put online number when I have that info/ setup websockets?*/}
          <div className="flex items-center">
            <div className="pr-1">
              <div className="h-2 w-2 rounded-lg bg-gray-500" />
            </div>
            <span className="text-xs text-gray-400">
              {invite.server.numberOfMembers} members
            </span>
          </div>
        </div>
        {session?.user ? (
          <div className="w-full pt-10">
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
            <form action={joinServer}>
              <button className="h-11 w-full rounded-sm bg-indigo-500">
                Accept Invite
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InvitePage;

/**@TODO makes sure there is a src for the image. Also change the server to not require an image. if the user has no image and server has no image use css */

/**@TODO setup user creation and/or login without losing invite */
