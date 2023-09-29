import Link from "next/link";

type Props = { lastChannel: { id: number; name: string } };
export const BackButton = ({ lastChannel }: Props) => (
  <Link href={lastChannel.id.toString()}>return to {lastChannel.name}</Link>
);
