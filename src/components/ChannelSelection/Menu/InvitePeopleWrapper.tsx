"use client";
import { type ReactNode } from "react";
import { useInvite } from "@/contexts/InviteContext";

export const InvitePeopleWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { setIsModalOpen } = useInvite();
  return (
    <div
      onClick={() => setIsModalOpen(true)}
      className="text-[#959CF6] hover:text-white"
    >
      {children}
    </div>
  );
};
