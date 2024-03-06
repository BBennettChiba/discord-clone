import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const usersToUsers = pgTable(
  "users_to_users",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    friendId: text("friend_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.friendId),
  }),
);

export const usersToUsersRelations = relations(usersToUsers, ({ one }) => ({
  friend: one(users, {
    fields: [usersToUsers.friendId],
    references: [users.id],
  }),
  user: one(users, {
    fields: [usersToUsers.userId],
    references: [users.id],
  }),
}));
