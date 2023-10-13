"use client";
import { OptionsMenu } from "@/components/Channel/Toolbars/OptionsMenu";
import { CreateMenu } from "./MenuContext";

export const { Provider: OptionsMenuProvider, useMenu: useOptionsMenu } =
  CreateMenu(OptionsMenu);
