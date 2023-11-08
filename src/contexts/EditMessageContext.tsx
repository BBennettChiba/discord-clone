"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type State = null | number;

type Context = {
  editId: State;
  setEditId: Dispatch<SetStateAction<State>>;
};

const context = createContext({} as Context);

export const useEditMessage = () => useContext(context);

type Props = {
  children: ReactNode;
};

export const EditMessageContextProvider = ({ children }: Props) => {
  const [editId, setEditId] = useState<State>(null);

  return (
    <context.Provider value={{ editId, setEditId }}>
      {children}
    </context.Provider>
  );
};
