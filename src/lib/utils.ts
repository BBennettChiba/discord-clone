import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export const cn = (...args: ClassValue[]): string => twMerge(clsx(args));

export const invertColor = (hex: string) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0]! + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  // invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
};

const padZero = (str: string, len = 2) => {
  const zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
};

export const isNotNull = <T>(item: T | null): item is T => item !== null;

export const throwError = (msg: string) => {
  throw new Error(msg);
};

export const paramsSchema = z.object({
  server: z.coerce.number().optional(),
  channel: z.coerce.number().optional(),
});
