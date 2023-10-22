"use client";
import { OptionsMenu } from "@/components/Channel/Toolbars/OptionsMenu";
import { CreateMenu } from "./MenuContext";

export const { Provider: OptionsMenuContextProvider, useMenu: useOptionsMenu } =
  CreateMenu(OptionsMenu);
