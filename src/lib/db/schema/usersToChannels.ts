import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { channels } from "./channels";

export const usersToChannels = pgTable(
  "users_to_channels",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    channelId: integer("channel_id")
      .notNull()
      .references(() => channels.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.channelId),
  }),
);

export const usersToChannelsRelations = relations(
  usersToChannels,
  ({ one }) => ({
    channel: one(channels, {
      fields: [usersToChannels.channelId],
      references: [channels.id],
    }),
    user: one(users, {
      fields: [usersToChannels.userId],
      references: [users.id],
    }),
  }),
);
