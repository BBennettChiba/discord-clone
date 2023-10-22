"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type Context = {
  inputRows: number;
  setInputRows: Dispatch<SetStateAction<number>>;
};

const context = createContext({} as Context);

export const useInputHeight = () => useContext(context);

type Props = {
  children: ReactNode;
};

export const InputHeightContextProvider = ({ children }: Props) => {
  const [inputRows, setInputRows] = useState(1);

  return (
    <context.Provider value={{ inputRows, setInputRows }}>
      {children}
    </context.Provider>
  );
};
