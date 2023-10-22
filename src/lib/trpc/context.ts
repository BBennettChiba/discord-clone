import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
// import { type Session } from "next-auth";
import { type Session } from "next-auth";
import { getUserAuth } from "../auth/utils";
import { db } from "../db";

// type CreateContextReturn = Promise<{
//   session: Session | null;
//   headers:
//     | {
//         [k: string]: string;
//       }
//     | undefined;
// }>;

export const createContext = async (opts?: FetchCreateContextFnOptions) => {
  const { session } = await getUserAuth();

  return {
    session: session,
    headers: opts && Object.fromEntries(opts.req.headers),
    db,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export type AuthedContext = Omit<Context, "session"> & { session: Session };
