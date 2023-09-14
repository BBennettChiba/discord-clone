/* eslint-disable @typescript-eslint/no-unnecessary-condition, prefer-const */
import Image from "next/image";
import avatar from "/public/avatar.webp";
import { cn } from "@/lib/utils";

const user = {
  avatar,
  name: "hurinfan",
  status: "online",
};

type OnlineStatus = "online" | "idle" | "do not disturb" | "invisible";

let onlineStatus: OnlineStatus = "online";

export const UserStatus = () => (
  <div className="h-[52px] w-full bg-neutral-900 px-2">
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full flex-1 items-center py-1 pr-2">
        <div className="group flex h-full flex-1 cursor-pointer items-center rounded-md hover:bg-zinc-700">
          <div className="relative">
            <div className="h-8 w-8 overflow-hidden rounded-2xl">
              <Image src={user.avatar} alt="avatar" />
            </div>
            <div
              className={cn(
                "absolute bottom-0 right-0 h-[10px] w-[10px] rounded-md bg-green-600 outline outline-black",
                { "bg-red-600": onlineStatus === "idle" },
              )}
            />
          </div>
          <div className="ml-2 flex h-full flex-1 flex-col">
            <div className="flex h-1/2 items-end text-xs">
              <div className="capitalize">{user.name}</div>
            </div>
            <div className="text-2xs flex-flex-col group h-1/2 flex-wrap overflow-hidden text-gray-400 transition-all">
              <div className="transition-all group-hover:-translate-y-full">
                {user.status}
              </div>
              <div
                className={
                  "translate-y-full transition-all group-hover:-translate-y-full"
                }
              >
                {user.name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-zinc-700">
        <svg
          className="h-[18px] w-[18px]"
          aria-hidden="true"
          role="img"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          />
        </svg>
      </div>
    </div>
  </div>
);
