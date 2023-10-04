import { router } from "../trpc";
import { channelsRouter } from "./channels";
import { groupsRouter } from "./groups";
import { invitesRouter } from "./invites";
import { messagesRouter } from "./messages";
import { serversRouter } from "./servers";
import { usersRouter } from "./users";

export const appRouter = router({
  messages: messagesRouter,
  servers: serversRouter,
  channels: channelsRouter,
  groups: groupsRouter,
  users: usersRouter,
  invites: invitesRouter
});

export type AppRouter = typeof appRouter;
