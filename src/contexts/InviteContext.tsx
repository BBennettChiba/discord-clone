"use client";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Context = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const context = createContext({} as Context);

export const useInvite = () => useContext(context);

type Props = {
  children: ReactNode;
};

export const InviteContextProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <context.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
      {isModalOpen ? <Modal /> : null}
    </context.Provider>
  );
};

const Modal = () => (
  <div className="absolute h-screen w-screen bg-black opacity-60">
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-72 w-96">hey</div>
    </div>
  </div>
);
