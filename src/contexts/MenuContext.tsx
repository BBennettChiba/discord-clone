"use client";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  type Context,
} from "react";
import { usePreventOverlapping } from "@/hooks";

type Props = {
  children: ReactNode;
};

type ContextT = {
  openMenu: (id: number, top: number, left: number) => void;
  closeMenu: () => void;
  isOpenWhere: number | null;
};

type MenuArgs = {
  closeMenu: () => void;
  id: number;
};

export type MenuType = ({ closeMenu, id }: MenuArgs) => JSX.Element | null;

export const createMenuContextProvider = (
  Menu: MenuType,
  context: Context<ContextT>,
) => {
  const Provider = ({ children }: Props) => {
    const [isOpenWhere, setIsOpenWhere] = useState<null | number>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const { ref } = usePreventOverlapping();

    const closeMenu = () => {
      setIsOpenWhere(null);
    };

    const openMenu = (messageId: number, top: number, left: number) => {
      setIsOpenWhere(messageId);
      setPosition({ top, left });
    };

    return (
      <context.Provider value={{ isOpenWhere, openMenu, closeMenu }}>
        {children}
        {isOpenWhere ? (
          <div
            ref={ref}
            className="absolute z-[999] -translate-x-full"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
          >
            <Menu closeMenu={closeMenu} id={isOpenWhere} />
          </div>
        ) : null}
      </context.Provider>
    );
  };
  return Provider;
};

export const CreateMenu = (Menu: MenuType) => {
  const context = createContext({} as ContextT);
  const Provider = createMenuContextProvider(Menu, context);
  const useMenu = () => useContext(context);
  return {
    useMenu,
    Provider,
  };
};
