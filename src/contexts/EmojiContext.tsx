import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useRef,
} from "react";
import { usePreventOverlapping } from "@/hooks";

type Props = {
  children: ReactNode;
};

type Emoji = {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  emoticons: string[];
};

type Context = {
  Picker: () => JSX.Element | null;
  openPicker: (id: number, top: number, left: number) => void;
  closePicker: () => void;
  isOpenWhere: number | null;
};

const context = createContext<Context>({
  Picker: () => null,
  openPicker: () => {},
  closePicker: () => {},
  isOpenWhere: null,
});

export const useEmojiPicker = () => useContext(context);

export const EmojiContextProvider = ({ children }: Props) => {
  const [isOpenWhere, setIsOpenWhere] = useState<null | number>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const closePicker = () => {
    setIsOpenWhere(null);
  };

  const openPicker = (messageId: number, top: number, left: number) => {
    setIsOpenWhere(messageId);
    setPosition({ top, left });
  };

  const Picker = () => {
    const emoji = useRef("");

    const onEmojiSelect = (v: Emoji) => {
      emoji.current = v.native;
    };

    const onClickOutside = () => closePicker();
    const { ref } = usePreventOverlapping();

    if (!isOpenWhere) return null;

    console.log(emoji.current);

    return (
      <div
        ref={ref}
        className="right absolute -translate-x-full"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
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
