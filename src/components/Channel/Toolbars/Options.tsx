import {
  CopyTextIcon,
  FlagIcon,
  HappyEmojiIcon,
  IDIcon,
  LinkIcon,
  PencilIcon,
  Pin,
  ReplyIcon,
  RightArrow,
  SiphonIcon,
  TrashIcon,
} from "@/components/Icons";
import { type Message } from "@/lib/db/schema/messages";
import { cn } from "@/lib/utils";

type Props = {
  userIsAdmin: boolean;
  userIsOwner: boolean;
  handleDelete: () => void;
  id: number;
  thisMessage?: Message;
};

export const Options = ({
  userIsAdmin,
  userIsOwner,
  handleDelete,
  id,
  thisMessage,
}: Props) => {
  const dimensions = "h-[18px] w-[18px]";

  const alertClassName = "hover:bg-red-500 text-red-500 hover:text-white";
  const OPTIONS = [
    {
      title: "Add Reaction",
      generalAction: true,
      icon: (
        <div className={dimensions}>
          <RightArrow className="h-[10px] w-[10px]" />
        </div>
      ),
      /**@TODO add reaction functionality */
      onClick: () => console.log("add reaction functionality"),
    },
    {
      title: "View Reactions",
      icon: <HappyEmojiIcon className={dimensions} />,
      /**@TODO add reaction functionality */
      onClick: () => console.log("add reaction functionality"),
    },
    {
      title: "Edit Message",
      ownerAction: true,
      icon: <PencilIcon className={dimensions} />,
      /**@TOOD look below */
      onClick: () => console.log("add edit message functionality"),
    },
    {
      title: "Pin Message",
      adminAction: true,
      icon: <Pin className={dimensions} />,
      /**@TODO add pin functionality */
      onClick: () => console.log("add pin message functionality"),
    },
    {
      title: "Reply",
      generalAction: true,
      icon: <ReplyIcon className={dimensions} />,
      /**@OTOD look below */
      onClick: () => console.log("add reply functionality"),
    },
    {
      title: "Copy Text",
      generalAction: true,
      icon: <CopyTextIcon className={dimensions} />,
      onClick: () => navigator.clipboard.writeText(thisMessage?.body || ""),
    },
    {
      title: "Mark Unread",
      generalAction: true,
      icon: <SiphonIcon className={dimensions} />,
      /**@TODO look below */
      onClick: () => console.log("you need to add read/unread functionality"),
    },
    {
      title: "Copy Message Link",
      generalAction: true,
      icon: <LinkIcon className={dimensions} />,
      onClick: () =>
        navigator.clipboard.writeText(
          `${window.location.href}/${id.toString()}`,
        ),
    },
    {
      title: "Report Message",
      neitherOwnerNorUserAction: true,
      icon: <FlagIcon className={dimensions} />,
      extraStyles: alertClassName,
      /**@TODO make reporting functionality */
      onClick: () => console.log("handle reporting"),
    },
    {
      title: "Delete Message",
      ownerOrAdminAction: true,
      icon: <TrashIcon className={dimensions} />,
      extraStyles: alertClassName,
      onClick: handleDelete,
    },
    {
      title: "Copy Message ID",
      generalAction: true,
      icon: <IDIcon className={dimensions} />,
      onClick: () => navigator.clipboard.writeText(id.toString()),
    },
  ];

  const filteredOptions = OPTIONS.filter((option) => {
    if (option.generalAction) return true;
    if (option.ownerAction && userIsOwner) return true;
    if (option.adminAction && userIsAdmin) return true;
    if (option.neitherOwnerNorUserAction && !userIsAdmin && !userIsOwner)
      return true;
    if (option.ownerOrAdminAction && (userIsOwner || userIsAdmin)) return true;
    return false;
  });
  return (
    <ul>
      {filteredOptions.map(({ title, icon, extraStyles, onClick }) => (
        <li
          onClick={onClick}
          key={title}
          className={cn(
            "cursor-pointer rounded-sm p-[6px] hover:bg-indigo-500",
            extraStyles,
          )}
        >
          <div className="flex">
            <div className="h-5 w-full text-xs leading-5">{title}</div>
            {icon}
          </div>
        </li>
      ))}
    </ul>
  );
};
