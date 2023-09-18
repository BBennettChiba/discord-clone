import { router } from "../trpc";
import { channelsRouter } from "./channels";
import { messagesRouter } from "./messages";
import { serversRouter } from "./servers";
import { groupsRouter } from "./groups";

export const appRouter = router({
  messages: messagesRouter,
  servers: serversRouter,
  channels: channelsRouter,
  groups: groupsRouter,
});

export type AppRouter = typeof appRouter;
