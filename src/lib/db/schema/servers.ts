import { relations } from "drizzle-orm";
import {
  varchar,
  text,
  serial,
  pgTable,
  uniqueIndex,
  index,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { type getServers } from "@/lib/api/servers/queries";
import { users } from "./auth";
import { channels } from "./channels";
import { groups } from "./groups";
import { usersToServers } from "./usersToServers";

export const servers = pgTable(
  "servers",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 40 }).notNull(),
    defaultChannel: integer("default_channel").notNull(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    icon: text("icon_url").notNull()
  },
  (server) => ({
    ownerIdIndex: index("owner_id_idx").on(server.ownerId),
    nameIndex: uniqueIndex("name_idx").on(server.name),
  }),
);

export const serversRealtions = relations(servers, ({ one, many }) => ({
  owner: one(users, {
    fields: [servers.ownerId],
    references: [users.id],
  }),
  groups: many(groups),
  members: many(usersToServers),
  defaultChannel: one(channels, {
    fields: [servers.defaultChannel],
    references: [channels.id],
  }),
}));

// Schema for servers - used to validate API requests
export const insertServerSchema = createInsertSchema(servers);

export const insertServerParams = createSelectSchema(servers, {}).omit({
  id: true,
  ownerId: true,
});

export const updateServerSchema = createSelectSchema(servers);

export const updateServerParams = createSelectSchema(servers, {}).omit({
  name: true,
  ownerId: true,
});

export const serverIdSchema = updateServerSchema.pick({ id: true });

// Types for servers - used to type API request params and within Components
export type Server = z.infer<typeof updateServerSchema>;
export type NewServer = z.infer<typeof insertServerSchema>;
export type NewServerParams = z.infer<typeof insertServerParams>;
export type UpdateServerParams = z.infer<typeof updateServerParams>;
export type ServerId = z.infer<typeof serverIdSchema>;

// this type infers the return from getServers() - meaning it will include any joins
export type CompleteServer = Awaited<ReturnType<typeof getServers>>[number];
