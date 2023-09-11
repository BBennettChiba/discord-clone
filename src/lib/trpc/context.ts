import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getUserAuth } from "../auth/utils";

export const createContext = async (opts?: FetchCreateContextFnOptions) => {
  const { session } = await getUserAuth();

  return {
    session: session,
    headers: opts && Object.fromEntries(opts.req.headers),
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
