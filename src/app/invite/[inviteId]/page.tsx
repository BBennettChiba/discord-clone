import { serverTrpc } from "@/lib/trpc/caller";

type Props = {
  params: { inviteId: string };
};

const InvitePage = async ({ params: { inviteId } }: Props) => {
  const invite = await serverTrpc.invites.getInviteById({ id: inviteId });
  console.log(invite);
  return <div className="h-screen w-screen bg-indigo-500">{inviteId}</div>;
};

export default InvitePage;
