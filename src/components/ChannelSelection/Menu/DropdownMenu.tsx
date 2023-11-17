/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import {
  FolderPlusIcon,
  PencilIcon,
  PlusCircleIcon,
  BoxIcon,
  LeaveServerIcon,
  BadgeIcon,
  CogIcon,
  ShowAllChannelsIcon,
  BellIcon,
  PeoplePlusIcon,
} from "../../Icons";

import InvitePeopleWrapper from "./InvitePeopleWrapper";

const ICON_SIZE = "h[18px] w-[18px]";

const options = [
  [
    {
      adminOption: false,
      text: "Invite People",
      wrapper: true,
      icon: <PeoplePlusIcon className={ICON_SIZE} />,
    },
    {
      adminOption: true,
      text: "Server Settings",
      icon: <CogIcon className={ICON_SIZE} />,
      Wrapper: null,
    },
    {
      adminOption: true,
      text: "Create Channel",
      icon: <PlusCircleIcon className={ICON_SIZE} />,
      Wrapper: null,
    },
    {
      adminOption: true,
      text: "Create Category",
      icon: <FolderPlusIcon className={ICON_SIZE} />,
      Wrapper: null,
    },
  ],
  [
    {
      adminOption: false,
      text: "Show All Channels",
      icon: <ShowAllChannelsIcon className={ICON_SIZE} />,
      Wrapper: null,
    },
    {
      adminOption: false,
      text: "Notification Settings",
      icon: <BellIcon className={ICON_SIZE} />,
      Wrapper: null,
    },
    {
      adminOption: false,
      text: "Privacy Settings",
      icon: <BadgeIcon className={ICON_SIZE} />,
      Wrapper: null,
    },
  ],
  [
    {
      adminOption: false,
      text: "Edit Server Profile",
      icon: <PencilIcon className={ICON_SIZE} />,
      Wrapper: null,
    },
    {
      adminOption: false,
      text: "Hide Muted Channels",
      icon: <BoxIcon className={ICON_SIZE} />,
      Wrapper: null,
    },
  ],
  [
    {
      adminOption: false,
      text: "Leave Server",
      icon: <LeaveServerIcon className={ICON_SIZE} />,
      Wrapper: null,
    },
  ],
];

const IS_ADMIN: boolean = true;

export const DropdownMenu = (): JSX.Element => (
  <div className="absolute top-12 z-10 flex w-full flex-col">
    <div className="p-3 text-xs">
      <div className="rounded-md bg-black px-2 py-2">
        {options.map((group, i) => (
          <Fragment key={i}>
            {group.map(({ wrapper, ...option }, j) => {
              if (!IS_ADMIN && option?.adminOption) return null;
              if (wrapper)
                return (
                  <InvitePeopleWrapper>
                    <Content option={option} i={i} />
                  </InvitePeopleWrapper>
                );
              return <Content key={j} option={option} i={i} />;
            })}
            {i !== options.length - 1 ? (
              <div className="m-1 border-b border-gray-700" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  </div>
);

type Props = {
  option: Omit<(typeof options)[number][number], "wrapper">;
  i: number;
};

const Content = ({ option, i }: Props) => (
  <div className="flex h-8 items-center">
    <div
      className={cn(
        "group flex h-full w-full items-center justify-between rounded-sm p-1 hover:bg-indigo-500",
        {
          "hover:bg-red-500 hover:text-white": i === options.length - 1,
        },
      )}
    >
      <div>{option.text}</div>
      <div
        className={cn({
          "text-red-500 group-hover:text-white": i === options.length - 1,
        })}
      >
        {option.icon}
      </div>
    </div>
  </div>
);
