/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { cn } from "@/lib/utils";
import { CreateChannelIcon, InvitePeopleIcon, SettingsIcons } from "../Icons";

const ICON_SIZE = "h[18px] w-[18px]";
const options = [
  [
    {
      text: "Invite People",
      icon: <InvitePeopleIcon className={ICON_SIZE} />,
    },
    {
      adminOption: true,
      text: "Server Settings",
      icon: <SettingsIcons className={ICON_SIZE} />,
    },
    {
      adminOption: true,
      text: "Create Channel",
      icon: <CreateChannelIcon className={ICON_SIZE} />,
    },
    {
      adminOption: true,
      text: "Create Category",
      icon: (
        <svg
          className={ICON_SIZE}
          aria-hidden="true"
          role="img"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20 7H12L10.553 5.106C10.214 4.428 9.521 4 8.764 4H3C2.447 4 2 4.447 2 5V19C2 20.104 2.895 21 4 21H20C21.104 21 22 20.104 22 19V9C22 7.896 21.104 7 20 7ZM16 15H13V18H11V15H8V13H11V10H13V13H16V15Z"
          />
        </svg>
      ),
    },
  ],
  [
    {
      text: "Show All Channels",
      icon: (
        <svg
          aria-hidden="true"
          role="img"
          className={ICON_SIZE}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.37499 3H18.625C19.9197 3 21.0056 4.08803 21 5.375V18.625C21 19.936 19.9359 21 18.625 21H5.37499C4.06518 21 3 19.936 3 18.625V5.375C3 4.06519 4.06518 3 5.37499 3Z"
            className="text-indigo-500"
            fill="currentColor"
          />
          <path
            d="M9.58473 14.8636L6.04944 11.4051L4.50003 12.9978L9.58473 18L19.5 8.26174L17.9656 6.64795L9.58473 14.8636Z"
            className="text-white"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      text: "Notification Settings",
      icon: (
        <svg
          className={ICON_SIZE}
          aria-hidden="true"
          role="img"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 9V14C18 15.657 19.344 17 21 17V18H3V17C4.656 17 6 15.657 6 14V9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9ZM11.9999 21C10.5239 21 9.24793 20.19 8.55493 19H15.4449C14.7519 20.19 13.4759 21 11.9999 21Z"
          />
        </svg>
      ),
    },
    {
      text: "Privacy Settings",
      icon: (
        <svg
          className={ICON_SIZE}
          aria-hidden="true"
          role="img"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 6.00001C15.56 6.00001 12.826 2.43501 12.799 2.39801C12.421 1.89801 11.579 1.89801 11.201 2.39801C11.174 2.43501 8.44 6.00001 5 6.00001C4.447 6.00001 4 6.44801 4 7.00001V14C4 17.807 10.764 21.478 11.534 21.884C11.68 21.961 11.84 21.998 12 21.998C12.16 21.998 12.32 21.96 12.466 21.884C13.236 21.478 20 17.807 20 14V7.00001C20 6.44801 19.553 6.00001 19 6.00001ZM15 16L12 14L9 16L10 13L8 11H11L12 8.00001L13 11H16L14 13L15 16Z"
          />
        </svg>
      ),
    },
  ],
  [
    {
      text: "Edit Server Profile",
      icon: (
        <svg
          className={ICON_SIZE}
          aria-hidden="true"
          role="img"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      text: "Hide Muted Channels",
      icon: (
        <svg
          aria-hidden="true"
          role="img"
          className={ICON_SIZE}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.625 3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V5.375C21.0057 4.08803 19.9197 3 18.625 3ZM19 19V5H4.99999V19H19Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ],
  [
    {
      text: "Leave Server",
      icon: (
        <svg
          className={ICON_SIZE}
          aria-hidden="true"
          role="img"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"
          />
        </svg>
      ),
    },
  ],
];

const IS_ADMIN = true;

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
