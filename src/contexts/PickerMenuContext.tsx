"use client";
import { Picker } from "@/components/Channel/Toolbars/EmojiPicker";
import { CreateMenu } from "./MenuContext";

export const { Provider: PickerMenuContextProvider, useMenu: usePickerMenu } =
  CreateMenu(Picker);
