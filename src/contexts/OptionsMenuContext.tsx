"use client";
import { useContext, type ReactNode, createContext, useState } from "react";
import { OptionsMenu } from "@/components/Channel/Toolbars/OptionsMenu";

type Props = {
  children: ReactNode;
};

type OptionsMenuContext = {
  openMenu: (id: number, point: { top: number; left: number }) => void;
  closeMenu: () => void;
  isOpenWhere: null | number;
};

const context = createContext({} as OptionsMenuContext);

export const useOptionsMenu = () => useContext(context);

export const OptionsMenuContextProvider = ({ children }: Props) => {
  const [isOpenWhere, setIsOpenWhere] = useState<null | number>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const openMenu = (
    messageId: number,
    point: { top: number; left: number },
  ) => {
    setIsOpenWhere(messageId);
    setPosition(point);
  };

  const closeMenu = () => setIsOpenWhere(null);

  return (
    <context.Provider value={{ closeMenu, openMenu, isOpenWhere }}>
      {children}
      <OptionsMenu position={position}/>
    </context.Provider>
  );
};
