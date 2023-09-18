import { appRouter } from "../server/routers/_app";

export const serverTrpc = appRouter.createCaller({
  //   eventServer: { trigger: () => {} },
  session: { user: { name: "bryson", id: "yo" }, expires: "30000" },
  headers: { "Content-Type": "application/json" },
});
