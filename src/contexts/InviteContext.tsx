"use client";
import { useParams } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import z from "zod";
import { type Invite } from "@/lib/db/schema/invites";
import { trpc } from "@/lib/trpc/client";

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
  const [inviteChannel, setInviteChannel] = useState<null | number>(null);

  const openModal = (chan?: number) => {
    setIsModalOpen(true);
    if (chan) setInviteChannel(chan);
  };

  return (
    <context.Provider value={{ isModalOpen, openModal }}>
      {children}
      {isModalOpen ? <Modal inviteChannel={inviteChannel} /> : null}
    </context.Provider>
  );
};

const paramsSchema = z.object({
  server: z.coerce.number(),
});

const Modal = ({ inviteChannel }: { inviteChannel: null | number }) => {
  const [invite, setInvite] = useState<Invite | null>(null);
  const { mutate: createInvite } = trpc.invites.createInvite.useMutation({
    onSuccess: (data) => setInvite(data),
  });

  const { server: serverId } = paramsSchema.parse(useParams());
  useEffect(() => {
    createInvite({ serverId });
  }, [createInvite, serverId]);

  return (
    <div className="absolute h-screen w-screen bg-black opacity-60">
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-72 w-96">
          server num: {serverId} chan: {inviteChannel}
          {JSON.stringify(invite)}
        </div>
      </div>
    </div>
  );
};

/**@TODO think of a way to have general invite to server or specific channel */
