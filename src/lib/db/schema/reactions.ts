import { relations } from "drizzle-orm";
import { varchar, pgTable } from "drizzle-orm/pg-core";
import { reactionsToMessages } from "./reactionsToMessages";

export const reactions = pgTable("reactions", {
  id: varchar("id").primaryKey(),
});

export const reactionsRelations = relations(reactions, ({ many }) => ({
  messages: many(reactionsToMessages),
}));
