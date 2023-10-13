'use client'
import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import { useRef } from "react";

type Emoji = {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  emoticons: string[];
};

export const Picker = ({
  closeMenu,
  isOpenWhere,
}: {
  closeMenu: () => void;
  isOpenWhere: null | number;
}) => {
  const emoji = useRef("");

  const onEmojiSelect = (v: Emoji) => {
    console.log(v);
    emoji.current = v.native;
  };

  const onClickOutside = () => closeMenu();

  if (!isOpenWhere) return null;

  return (
    <EmojiPicker
      data={data}
      onEmojiSelect={onEmojiSelect}
      onClickOutside={onClickOutside}
    />
  );
};
