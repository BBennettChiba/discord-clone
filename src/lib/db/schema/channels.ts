import { relations } from "drizzle-orm";
import { varchar, integer, serial, pgTable, index } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { groups } from "./groups";
import { messages } from "./messages";
import { usersToChannels } from "./usersToChannels";
import type z from "zod";

export const channels = pgTable(
  "channels",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 40 }).notNull(),
    description: varchar("description", { length: 256 }).notNull(),
    groupId: integer("group_id").notNull(),
  },
  (channel) => ({
    nameIndex: index("name_idx").on(channel.name),
  }),
);

export const channelsRelations = relations(channels, ({ many, one }) => ({
  messages: many(messages),
  users: many(usersToChannels),
  group: one(groups, {
    fields: [channels.groupId],
    references: [groups.id],
  }),
}));

const channelSchema = createSelectSchema(channels);

export const channelIdSchema = channelSchema.pick({ id: true });

export type Channel = z.infer<typeof channelSchema>;
