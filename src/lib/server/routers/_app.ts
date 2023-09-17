import { router } from "../trpc";
import { computersRouter } from "./computers";
import { messagesRouter } from "./messages";
import { serversRouter } from "./servers";
import { channelsRouter } from "./channels";

export const appRouter = router({
  computers: computersRouter,
  messages: messagesRouter,
  servers: serversRouter,
  channels: channelsRouter,
});

export type AppRouter = typeof appRouter;
