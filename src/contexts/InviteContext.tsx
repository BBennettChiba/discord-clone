"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { InviteModal } from "@/components/ChannelSelection/Menu/InviteModal";

type Context = {
  isModalOpen: boolean;
  openModal: (val?: number) => void;
};

const context = createContext({} as Context);

export const useInvite = () => useContext(context);

type Props = {
  children: ReactNode;
};

export const InviteContextProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toChannelId, setToChannelId] = useState<null | number>(null);

  const openModal = (toChannel?: number) => {
    setIsModalOpen(true);
    if (toChannel) setToChannelId(toChannel);
  };

  return (
    <context.Provider value={{ isModalOpen, openModal }}>
      {children}
      {isModalOpen ? <InviteModal toChannelId={toChannelId} /> : null}
    </context.Provider>
  );
};
