import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { messages } from "./messages";
import { reactions } from "./reactions";
import { reactionsToMessagesToUsers } from "./reactionsToMessagesToUsers";

export const reactionsToMessages = pgTable(
  "reactions_to_messages",
  {
    reactionId: text("reaction_id")
      .notNull()
      .references(() => reactions.id),
    messageId: integer("message_id")
      .notNull()
      .references(() => messages.id),
  },
  (t) => ({
    pk: primaryKey(t.reactionId, t.messageId),
  }),
);

export const reactionsToMessagesRelations = relations(
  reactionsToMessages,
  ({ one, many }) => ({
    reaction: one(reactions, {
      fields: [reactionsToMessages.reactionId],
      references: [reactions.id],
    }),
    message: one(messages, {
      fields: [reactionsToMessages.messageId],
      references: [messages.id],
    }),
    reactors: many(reactionsToMessagesToUsers),
  }),
);
