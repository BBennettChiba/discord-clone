"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type ReplyTarget= null | number;

type Context = {
  replyTarget: ReplyTarget;
  setReplyTarget: Dispatch<SetStateAction<ReplyTarget>>;
};

const context = createContext({} as Context);

export const useReply = () => useContext(context);

type Props = {
  children: ReactNode;
};

export const ReplyContextProvider = ({ children }: Props) => {
  const [replyTarget, setReplyTarget] = useState<ReplyTarget>(null);

  console.log(replyTarget);

  return (
    <context.Provider
      value={{  replyTarget, setReplyTarget}}
    >
      {children}
    </context.Provider>
  );
};
