/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { cn } from "@/lib/utils";
import {
  FolderPlusIcon,
  PencilIcon,
  PlusCircleIcon,
  BoxIcon,
  PeoplePlusIcon,
  LeaveServerIcon,
  BadgeIcon,
  CogIcon,
  ShowAllChannelsIcon,
  BellIcon,
} from "../Icons";

const ICON_SIZE = "h[18px] w-[18px]";
const options = [
  [
    {
      text: "Invite People",
      icon: <PeoplePlusIcon className={ICON_SIZE} />,
    },
    {
      adminOption: true,
      text: "Server Settings",
      icon: <CogIcon className={ICON_SIZE} />,
    },
    {
      adminOption: true,
      text: "Create Channel",
      icon: <PlusCircleIcon className={ICON_SIZE} />,
    },
    {
      adminOption: true,
      text: "Create Category",
      icon: <FolderPlusIcon className={ICON_SIZE} />,
    },
  ],
  [
    {
      text: "Show All Channels",
      icon: <ShowAllChannelsIcon className={ICON_SIZE} />,
    },
    {
      text: "Notification Settings",
      icon: <BellIcon className={ICON_SIZE} />,
    },
    {
      text: "Privacy Settings",
      icon: <BadgeIcon className={ICON_SIZE} />,
    },
  ],
  [
    {
      text: "Edit Server Profile",
      icon: <PencilIcon className={ICON_SIZE} />,
    },
    {
      text: "Hide Muted Channels",
      icon: <BoxIcon className={ICON_SIZE} />,
    },
  ],
  [
    {
      text: "Leave Server",
      icon: <LeaveServerIcon className={ICON_SIZE} />,
    },
  ],
];

const IS_ADMIN: boolean = true;

export const DropdownMenu = (): JSX.Element => (
  <div className="absolute top-12 z-10 flex w-full flex-col">
    <div className="p-3 text-xs">
      <div className="rounded-md bg-black px-2 py-2">
        {options.map((group, i) => (
          <>
            <div className="" key={i}>
              {group.map((option, j) => {
                if (!IS_ADMIN && option.adminOption) return null;
                return (
                  <div className="flex h-8 items-center" key={j}>
                    <div
                      className={cn(
                        "group flex h-full w-full items-center justify-between rounded-sm p-1 hover:bg-indigo-500",
                        {
                          "hover:bg-red-500 hover:text-white":
                            i === options.length - 1,
                        },
                      )}
                    >
                      <div>{option.text}</div>
                      <div
                        className={cn({
                          "text-red-500 group-hover:text-white":
                            i === options.length - 1,
                        })}
                      >
                        {option.icon}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {i !== options.length - 1 ? (
              <div className="m-1 border-b border-gray-700" />
            ) : null}
          </>
        ))}
      </div>
    </div>
  </div>
);
