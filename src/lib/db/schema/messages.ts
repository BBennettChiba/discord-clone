import { relations } from "drizzle-orm";
import {
  text,
  integer,
  timestamp,
  serial,
  varchar,
  pgTable,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { type RouterOutputs } from "@/lib/server/routers/_app";
import { users } from "./auth";
import { channels } from "./channels";
import { reactionsToMessages } from "./reactionsToMessages";

export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    body: text("body").notNull(),
    channelId: integer("channel_id")
      .references(() => channels.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
    authorId: varchar("author", { length: 256 })
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    parentId: integer("parent_id"),
  },
  (message) => ({
    channelIdIndex: index("channel_id_idx").on(message.channelId),
  }),
);

export const messagesRelations = relations(messages, ({ one, many }) => ({
  parent: one(messages, {
    fields: [messages.parentId],
    references: [messages.id],
  }),
  channel: one(channels, {
    fields: [messages.channelId],
    references: [channels.id],
  }),
  author: one(users, {
    fields: [messages.authorId],
    references: [users.id],
  }),
  reactions: many(reactionsToMessages),
}));

// Schema for messages - used to validate API requests
export const insertMessageSchema = createInsertSchema(messages);

export const insertMessageParams = createSelectSchema(messages, {
  channelId: z.coerce.number(),
  body: z.string().min(1),
}).omit({
  id: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
});

export const updateMessageSchema = createSelectSchema(messages).omit({
  authorId: true,
  createdAt: true,
  channelId: true,
  updatedAt: true,
  parentId: true,
});

export const updateMessageParams = createSelectSchema(messages, {
  channelId: z.coerce.number(),
  createdAt: z.coerce.string(),
  updatedAt: z.coerce.string(),
}).omit({
  authorId: true,
});

export const messageIdSchema = updateMessageSchema.pick({
  id: true,
});

export const MessageByChannelIdSchema = createSelectSchema(messages)
  .pick({
    channelId: true,
  })
  .extend({ cursor: z.date().optional() });

// Types for messages - used to type API request params and within Components
export type Message = z.infer<typeof updateMessageSchema>;
export type NewMessage = z.infer<typeof insertMessageSchema>;
export type NewMessageParams = z.infer<typeof insertMessageParams>;
export type UpdateMessageParams = z.infer<typeof updateMessageParams>;
export type MessageId = z.infer<typeof messageIdSchema>;
export type MessageByChannelId = z.infer<typeof MessageByChannelIdSchema>;

// this type infers the return from getMessages() - meaning it will include any joins
export type CompleteMessage =
  RouterOutputs["messages"]["getMessagesByChannelId"]["messages"][number];
