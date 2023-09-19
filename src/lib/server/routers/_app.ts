import { router } from "../trpc";
import { channelsRouter } from "./channels";
import { groupsRouter } from "./groups";
import { messagesRouter } from "./messages";
import { serversRouter } from "./servers";

export const appRouter = router({
  messages: messagesRouter,
  servers: serversRouter,
  channels: channelsRouter,
  groups: groupsRouter,
});

export type AppRouter = typeof appRouter;
