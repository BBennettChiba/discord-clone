"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useRef,
  type MutableRefObject,
} from "react";

type Context = {
    scrollTargetRef: MutableRefObject<null | HTMLDivElement>;
  scrollTargetId: number | null;
  scrollTo: (id: number) => void;
};

const context = createContext({} as Context);

export const useScrollTo = () => useContext(context);

type Props = {
  children: ReactNode;
};

export const ScrollToContextProvider = ({ children }: Props) => {
  const [scrollTargetId, setScrollTargetId] = useState<null | number>(null);

  const scrollTargetRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (id: number) => {
    setScrollTargetId(id);
    setTimeout(() => {
      if (!scrollTargetRef.current) return;
      scrollTargetRef.current.scrollIntoView();
    }, 0);
  };

  return (
    <context.Provider value={{ scrollTargetRef, scrollTo, scrollTargetId }}>
      {children}
    </context.Provider>
  );
};
