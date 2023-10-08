"use client";
import { type ReactNode } from "react";
import { useInvite } from "@/contexts/InviteContext";

const InvitePeopleWrapper = ({ children }: { children: ReactNode }) => {
  const { toggleModal } = useInvite();
  return (
    <div
      onClick={() => toggleModal()}
      className="cursor-pointer text-[#959CF6] hover:text-white"
    >
      {children}
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default InvitePeopleWrapper;
