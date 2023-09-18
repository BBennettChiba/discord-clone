import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { servers } from "./servers";

export const usersToServers = pgTable(
  "users_to_servers",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    serverId: integer("server_id")
      .notNull()
      .references(() => servers.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.serverId),
  }),
);

export const usersToServersRelations = relations(usersToServers, ({ one }) => ({
  server: one(servers, {
    fields: [usersToServers.serverId],
    references: [servers.id],
  }),
  user: one(users, {
    fields: [usersToServers.userId],
    references: [users.id],
  }),
}));
