"use client";
import { type ReactNode } from "react";
import { useInvite } from "@/contexts/InviteContext";

export const InvitePeopleWrapper = ({ children }: { children: ReactNode }) => {
  const { openModal } = useInvite();
  return (
    <div
      onClick={() => openModal()}
      className="text-[#959CF6] cursor-pointer hover:text-white"
    >
      {children}
    </div>
  );
};
