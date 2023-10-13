"use client";
import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import { useRef } from "react";
import { type MenuType } from "@/contexts/MenuContext";

type Emoji = {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  emoticons: string[];
};

export const Picker: MenuType = ({ closeMenu }) => {
  const emoji = useRef("");

  const onEmojiSelect = (v: Emoji) => {
    console.log(v);
    emoji.current = v.native;
  };

  const onClickOutside = () => closeMenu();

  return (
    <EmojiPicker
      data={data}
      onEmojiSelect={onEmojiSelect}
      onClickOutside={onClickOutside}
    />
  );
};
