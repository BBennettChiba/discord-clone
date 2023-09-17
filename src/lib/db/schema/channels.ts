import { relations } from "drizzle-orm";
import {
  varchar,
  integer,
  serial,
  pgTable,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { type getChannels } from "@/lib/api/channels/queries";
import { messages } from "./messages";
import { servers } from "./servers";

export const channels = pgTable(
  "channels",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 40 }).notNull(),
    serverId: integer("server_id")
      .references(() => servers.id, { onDelete: "cascade" })
      .notNull(),
  },
  (channel) => ({
    nameIndex: index("name_idx").on(channel.name),
    nameIndexUnique: uniqueIndex("name_idx").on(channel.name),
    serverIdIndex: index("server_id_idx").on(channel.serverId),
  }),
);

export const channelsRelations = relations(channels, ({ many, one }) => ({
  messages: many(messages),
  server: one(servers, {
    fields: [channels.serverId],
    references: [servers.id],
  }),
}));

// Schema for channels - used to validate API requests
export const insertChannelSchema = createInsertSchema(channels);

export const insertChannelParams = createSelectSchema(channels, {
  serverId: z.coerce.number(),
}).omit({
  id: true,
});

export const updateChannelSchema = createSelectSchema(channels);

export const updateChannelParams = createSelectSchema(channels, {
  serverId: z.coerce.number(),
});

export const channelIdSchema = updateChannelSchema.pick({ id: true });

// Types for channels - used to type API request params and within Components
export type Channel = z.infer<typeof updateChannelSchema>;
export type NewChannel = z.infer<typeof insertChannelSchema>;
export type NewChannelParams = z.infer<typeof insertChannelParams>;
export type UpdateChannelParams = z.infer<typeof updateChannelParams>;
export type ChannelId = z.infer<typeof channelIdSchema>["id"];

// this type infers the return from getChannels() - meaning it will include any joins
export type CompleteChannel = Awaited<
  ReturnType<typeof getChannels>
>["channels"][number];
