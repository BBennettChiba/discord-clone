import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { serverTrpc } from "@/lib/trpc/api";
import { invertColor } from "@/lib/utils";

type Props = {
  params: { inviteId: string };
};

const InvitePage = async ({ params: { inviteId } }: Props) => {
  const invite = await serverTrpc.invites.getInviteById.query({ id: inviteId });

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
      <div className="flex w-[480px] flex-col items-center rounded-md bg-gray-700 p-8">
        <div className="pb-6">
          <Img invite={invite} />
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
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form action={joinServer}>
              <button className="h-11 w-full rounded-sm bg-indigo-500">
                Accept Invite
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-2 w-full text-lg text-zinc-400">
            <h1 className="mb-2 text-xs font-bold uppercase text-gray-400">
              Display Name
            </h1>
            <div className="mb-2">
              <div className="flex flex-col">
                <input
                  className="h-10 w-full cursor-text rounded bg-neutral-800 p-3 text-sm text-zinc-200"
                  defaultValue=""
                  placeholder="What should everyone call you?"
                  type="text"
                />
              </div>
            </div>
            <div className="text-xs text-gray-400">
              This is how others see you. You can use special characters and
              emoji.
            </div>
            <div className="mt-3">
              <button className="relative flex h-11 w-full cursor-pointer items-center justify-center rounded bg-indigo-500 px-4 py-1 text-center text-sm font-medium text-white">
                <div
                  className="text-ellipsis whitespace-nowrap"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) calc(2px), rgba(0, 0, 0, 0) calc(2px))",
                  }}
                >
                  Continue
                </div>
              </button>
            </div>
            <button className="relative mt-3 h-auto w-auto cursor-pointer items-center justify-center rounded py-1 text-center text-sm font-medium text-sky-500">
              <div
                className="text-ellipsis whitespace-nowrap"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) calc(2px), rgba(0, 0, 0, 0) calc(2px))",
                }}
              >
                Already have an account?
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitePage;

/**@TODO setup user creation and/or login without losing invite */

const Img = ({
  invite,
}: {
  invite: NonNullable<RouterOutputs["invites"]["getInviteById"]>;
}) => {
  const { src, alt, rounding } = invite.server.icon
    ? { src: invite.server.icon, alt: "server icon", rounding: "rounded-xl" }
    : {
        src: invite.creator.image,
        alt: "creator avatar",
        rounding: "rounded-[50px]",
      };
  if (src)
    return (
      <div className={`h-16 w-16 overflow-hidden ${rounding}`}>
        <Image src={src} alt={alt} width={64} height={64} />;
      </div>
    );

  const initials = invite.server.name
    .split(" ")
    .map((word) =>
      word
        .split("")
        .filter((letter, i) => i === 0 || letter.toUpperCase() === letter)
        .join(""),
    )
    .join("");

  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <div
      className="h-16 w-16 overflow-hidden rounded-xl"
      style={{ background: randomColor }}
    >
      <div className="flex h-full select-none items-center justify-center">
        <div style={{ color: invertColor(randomColor) }}>{initials}</div>
      </div>
    </div>
  );
  {
  }
};
