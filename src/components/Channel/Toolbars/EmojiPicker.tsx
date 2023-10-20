"use client";
import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { type MenuType } from "@/contexts/MenuContext";
import { trpc } from "@/lib/trpc/client";
import { paramsSchema } from "@/lib/utils";

type Emoji = {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  emoticons: string[];
};

export const Picker: MenuType = ({ closeMenu, id }) => {
  const { channel: channelId } = paramsSchema.parse(useParams());
  const queryClient = useQueryClient();
  const { mutate } = trpc.reactions.createReaction.useMutation({
    onSettled: async (_data) => {
      await queryClient.invalidateQueries([
        ["messages", "getMessagesByChannelId"],
        { input: { channelId }, type: "infinite" },
      ]);
    },
  });
  const emoji = useRef("");

  const onEmojiSelect = (v: Emoji) => {
    mutate({ messageId: id, reactionId: v.id });
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
