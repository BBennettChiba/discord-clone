type Props = {
  params: { inviteId: string };
};

const InvitePage = ({ params: { inviteId } }: Props) => (
  <div className="h-screen w-screen bg-indigo-500">{inviteId}</div>
);

export default InvitePage;
