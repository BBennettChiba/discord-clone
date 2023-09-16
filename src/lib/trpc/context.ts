import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { type Session } from "next-auth";
import { getUserAuth } from "../auth/utils";

type CreateContextReturn = Promise<{
  session: Session | null;
  headers: {
      [k: string]: string;
  } | undefined;
}>

export const createContext = async (
  opts?: FetchCreateContextFnOptions,
): CreateContextReturn => {
  const { session } = await getUserAuth();

  return {
    session: session,
    headers: opts && Object.fromEntries(opts.req.headers),
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
