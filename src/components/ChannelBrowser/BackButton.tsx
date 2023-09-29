import Link from "next/link";
import { Hash } from "../Icons";

type Props = { lastChannel: { id: number; name: string } };
export const BackButton = ({ lastChannel }: Props) => (
  <Link href={lastChannel.id.toString()} className="ml-auto pr-4">
    <button className="h-[30px] border border-gray-500  px-2 py-[2px] rounded-md text-xs hover:bg-gray-500">
      <div className="flex items-center justify-center">
        Return to &nbsp;<div>{<Hash className="h-4 w-4" />}</div>
        &nbsp;
        <div>
          <div>{lastChannel.name}</div>
        </div>
      </div>
    </button>
  </Link>
);
