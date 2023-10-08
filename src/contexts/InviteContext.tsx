"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { InviteModal } from "@/components/ChannelSelection/Menu/InviteModal";

type Context = {
  isModalOpen: boolean;
  toggleModal: (val?: ToChannel) => void;
};

const context = createContext({} as Context);

export const useInvite = () => useContext(context);

type Props = {
  children: ReactNode;
};

export type ToChannel = {
  id: number;
  name: string;
} | null;

export const InviteContextProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toChannel, setToChannel] = useState<ToChannel>(null);

  const toggleModal = (toChannelVal?: ToChannel) => {
    setIsModalOpen((v) => !v);
    if (toChannelVal) setToChannel(toChannelVal);
    else setToChannel(null);
  };

  return (
    <context.Provider value={{ isModalOpen, toggleModal }}>
      {children}
      {isModalOpen ? <InviteModal toChannel={toChannel} /> : null}
    </context.Provider>
  );
};
