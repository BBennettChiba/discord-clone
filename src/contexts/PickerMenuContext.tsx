"use client";
import { Picker } from "@/components/Channel/Toolbars/EmojiPicker";
import { CreateMenu } from "./MenuContext";

export const { Provider: PickerMenuProvider, useMenu: usePickerMenu } =
  CreateMenu(Picker);
