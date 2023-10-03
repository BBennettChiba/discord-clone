type Props = {
  params: { inviteId: string };
};

const InvitePage = ({ params: { inviteId } }: Props) => <div>{inviteId}</div>;

export default InvitePage;
