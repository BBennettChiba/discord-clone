"use client";
import { useRef } from "react";
import { useOptionsMenu } from "@/contexts/OptionsMenuContext";
import { usePickerMenu } from "@/contexts/PickerMenuContext";
import { DotDotDotIcon, EmojiIcon, ReplyIcon } from "../Icons";

export const MessageHoverToolbar = ({ messageId }: { messageId: number }) => {
  const optionsButtonRef = useRef<HTMLDivElement | null>(null);
  const reactionsButtonRef = useRef<HTMLDivElement>(null);
  const { openMenu: openPickerMenu } = usePickerMenu();
  const { openMenu: openOptionsMenu } = useOptionsMenu();

  const openEmojiPicker = () => {
    if (!reactionsButtonRef.current) throw new Error("No current");
    const { top, left } = reactionsButtonRef.current.getBoundingClientRect();
    openPickerMenu(messageId, top, left);
  };

  const handleOptionsButtonClick = () => {
    if (!optionsButtonRef.current) throw new Error("no current");
    const { top, left } = optionsButtonRef.current.getBoundingClientRect();
    openOptionsMenu(messageId, top, left);
  };

  return (
    <div className="z-10 h-8 pr-3">
      <div className="flex h-full items-center rounded-md border border-zinc-800 bg-zinc-700 hover:shadow-lg">
        <div
          className="rounded-l-md p-[6px] hover:bg-white/10"
          onClick={openEmojiPicker}
          ref={reactionsButtonRef}
        >
          <div
            aria-label="Add Reaction"
            aria-expanded="false"
            role="button"
            tabIndex={0}
          >
            <EmojiIcon />
          </div>
        </div>
        <div className="p-[6px] hover:bg-white/10">
          <div aria-label="Reply" role="button" tabIndex={0}>
            <ReplyIcon />
          </div>
        </div>
        <div
          ref={optionsButtonRef}
          className="rounded-r-md p-[6px] hover:bg-white/10"
          onClick={handleOptionsButtonClick}
        >
          <div
            aria-label="More"
            aria-expanded="false"
            role="button"
            tabIndex={0}
          >
            <DotDotDotIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
/**@TODO when comment is your own the option to reply is one to edit */