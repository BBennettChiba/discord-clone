import { relations } from "drizzle-orm";
import { foreignKey, integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { reactionsToMessages } from "./reactionsToMessages";

export const reactionsToMessagesToUsers = pgTable(
  "reactions_to_messages_to_users",
  {
    reactionToMessagesReactionId: text(
      "reaction_to_messages_reaction_id",
    ).notNull(),
    reactionToMessagesMessageId: integer(
      "reaction_to_messages_message_id",
    ).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    pk: primaryKey(
      t.reactionToMessagesReactionId,
      t.reactionToMessagesMessageId,
      t.userId,
    ),
    reactionsToMessagesReference: foreignKey({
      foreignColumns: [
        reactionsToMessages.reactionId,
        reactionsToMessages.messageId,
      ],
      columns: [t.reactionToMessagesReactionId, t.reactionToMessagesMessageId],
    }),
  }),
);

export const reactionsToMessagesToUsersRelations = relations(
  reactionsToMessagesToUsers,
  ({ one }) => ({
    reactionToMessages: one(reactionsToMessages, {
      fields: [
        reactionsToMessagesToUsers.reactionToMessagesReactionId,
        reactionsToMessagesToUsers.reactionToMessagesMessageId,
      ],
      references: [
        reactionsToMessages.reactionId,
        reactionsToMessages.messageId,
      ],
    }),
    reactor: one(users, {
      fields: [reactionsToMessagesToUsers.userId],
      references: [users.id],
    }),
  }),
);
