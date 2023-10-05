import { appRouter } from "../server/routers/_app";

export const serverTrpc = appRouter.createCaller({
  //   evenger: () => {} },
  session: { user: { name: "bryson", id: "yo" }, expires: "30000" },
  headers: { "Content-Type": "application/json" },
});

/**@TODO figure out how to get session working */