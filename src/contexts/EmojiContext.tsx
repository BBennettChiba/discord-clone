import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { usePreventOverlapping } from "@/hooks";

type Props = {
  children: ReactNode;
};

type Context = {
  Picker: ({ id }: { id: number }) => JSX.Element | null;
  openPicker: (id: number) => void;
  closePicker: () => void;
  isOpenWhere: number | null;
};

const context = createContext({} as Context);

export const useEmojiPicker = () => useContext(context);

export const EmojiContextProvider = ({ children }: Props) => {
  const [isOpenWhere, setIsOpenWhere] = useState<null | number>(0);
  const closePicker = () => {
    setIsOpenWhere(null);
  };
  const openPicker = (messageId: number) => {
    setIsOpenWhere(messageId);
  };

  const Picker = ({ id }: { id: number }) => {
    const onEmojiSelect = (v) => console.log(v);
    const onClickOutside = () => closePicker();
    const { ref } = usePreventOverlapping();

    if (id !== isOpenWhere) return null;
    return (
      <div ref={ref} className="absolute -translate-x-full">
        <EmojiPicker
          data={data}
          onEmojiSelect={onEmojiSelect}
          onClickOutside={onClickOutside}
        />
      </div>
    );
  };

  return (
    <context.Provider value={{ isOpenWhere, openPicker, closePicker, Picker }}>
      {children}
    </context.Provider>
  );
};
