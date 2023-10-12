"use client";
import { useRef } from "react";
import { useEmojiPicker } from "@/contexts/EmojiContext";

export const MessageHoverToolbar = ({ messageId }: { messageId: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { openPicker } = useEmojiPicker();

  const openEmojiPicker = () => {
    if (!ref.current) throw new Error("No current");
    const { top, left } = ref.current.getBoundingClientRect();
    openPicker(messageId, top, left);
  };

  return (
    <div className="z-10 h-8 pr-3" ref={ref}>
      <div className="flex h-full items-center rounded-md border border-zinc-800 bg-zinc-700 hover:shadow-lg">
        <div
          className="rounded-l-md p-[6px] hover:bg-white/10"
          onClick={openEmojiPicker}
        >
          <div
            aria-label="Add Reaction"
            aria-expanded="false"
            role="button"
            tabIndex={0}
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              role="img"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.1151 2.00065C12.0768 2.00022 12.0384 2 12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 11.9616 21.9998 11.9232 21.9993 11.8849C21.1882 12.1737 20.3146 12.3309 19.4043 12.3309C15.1323 12.3309 11.6691 8.86771 11.6691 4.59565C11.6691 3.68536 11.8263 2.8118 12.1151 2.00065ZM7.92105 11.8023C7.92105 12.7107 7.18468 13.4471 6.27631 13.4471C5.36795 13.4471 4.63158 12.7107 4.63158 11.8023C4.63158 10.894 5.36795 10.1576 6.27631 10.1576C7.18467 10.1576 7.92105 10.894 7.92105 11.8023ZM10.5217 14.5171C10.3859 13.9893 9.84786 13.6716 9.32005 13.8074C8.79223 13.9433 8.47448 14.4813 8.61033 15.0091C9.01196 16.5695 10.4273 17.7236 12.1147 17.7236C13.8021 17.7236 15.2174 16.5695 15.6191 15.0091C15.7549 14.4813 15.4372 13.9433 14.9093 13.8074C14.3815 13.6716 13.8435 13.9893 13.7077 14.5171C13.525 15.2267 12.8797 15.7499 12.1147 15.7499C11.3497 15.7499 10.7044 15.2267 10.5217 14.5171Z"
                fill="currentColor"
              />
              <path
                d="M18.5 2C17.9477 2 17.5 2.44772 17.5 3V4.5H16C15.4477 4.5 15 4.94771 15 5.5C15 6.05228 15.4477 6.5 16 6.5H17.5V8C17.5 8.55228 17.9477 9 18.5 9C19.0523 9 19.5 8.55229 19.5 8V6.5H21C21.5523 6.5 22 6.05229 22 5.5C22 4.94772 21.5523 4.5 21 4.5H19.5V3C19.5 2.44772 19.0523 2 18.5 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="p-[6px] hover:bg-white/10">
          <div aria-label="Reply" role="button" tabIndex={0}>
            <svg width="24" className="h-5 w-5" height="24" viewBox="0 0 24 24">
              <path
                d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="rounded-r-md p-[6px] hover:bg-white/10">
          <div
            aria-label="More"
            aria-expanded="false"
            role="button"
            tabIndex={0}
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 12.001C7 10.8964 6.10457 10.001 5 10.001C3.89543 10.001 3 10.8964 3 12.001C3 13.1055 3.89543 14.001 5 14.001C6.10457 14.001 7 13.1055 7 12.001ZM14 12.001C14 10.8964 13.1046 10.001 12 10.001C10.8954 10.001 10 10.8964 10 12.001C10 13.1055 10.8954 14.001 12 14.001C13.1046 14.001 14 13.1055 14 12.001ZM19 10.001C20.1046 10.001 21 10.8964 21 12.001C21 13.1055 20.1046 14.001 19 14.001C17.8954 14.001 17 13.1055 17 12.001C17 10.8964 17.8954 10.001 19 10.001Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
