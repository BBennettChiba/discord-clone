import { BellIcon, Pin, TwoPeople } from "@/components/Icons";

export const icons = [
  {
    svg: <BellIcon className="h-6 w-6" />,
    text: "Notification Settings",
  },
  {
    svg: <Pin className="h-6 w-6" />,
    text: "Pinned Messages",
  },
  {
    svg: (
      <label htmlFor="checkbox">
        <TwoPeople className="h-6 w-6" />
      </label>
    ),
    text: "Show Members List",
  },
];
