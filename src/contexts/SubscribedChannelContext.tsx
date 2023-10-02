"use client"
import { type inferRouterOutputs } from "@trpc/server";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  type SetStateAction,
  type Dispatch,
} from "react";
import { type AppRouter } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";

type Props = {
  children: ReactNode;
  serverId: number;
};

type Groups = inferRouterOutputs<AppRouter>["groups"]["getGroupsByServerId"];

type Context = {
  subscribedChannels: Groups;
  setSubscribedChannels: Dispatch<SetStateAction<Groups>>;
};

const context = createContext<Context>({
  subscribedChannels: [],
  setSubscribedChannels: () => void {},
});

export const useSubscribedChannels = () => useContext(context);

export const SubscribedChannelContextProvider = ({
  children,
  serverId,
}: Props) => {
  const { data } = trpc.groups.getGroupsByServerId.useQuery({
    serverId,
  });
  const [subscribedChannels, setSubscribedChannels] = useState<Groups>([]);

  useEffect(() => {
    if (!data) return;
    setSubscribedChannels(data);
  }, [data]);

  return (
    <context.Provider value={{ subscribedChannels, setSubscribedChannels }}>
      {children}
    </context.Provider>
  );
};
