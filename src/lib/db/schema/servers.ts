import { relations } from "drizzle-orm";
import {
  varchar,
  text,
  serial,
  pgTable,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { type getServers } from "@/lib/api/servers/queries";
import { users } from "./auth";
import { channels } from "./channels";

export const servers = pgTable(
  "servers",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 40 }).notNull(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
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
  channels: many(channels),
}));

// Schema for servers - used to validate API requests
export const insertServerSchema = createInsertSchema(servers);

export const insertServerParams = createSelectSchema(servers, {}).omit({
  id: true,
  ownerId: true,
});

export const updateServerSchema = createSelectSchema(servers);

export const updateServerParams = createSelectSchema(servers, {}).omit({
  ownerId: true,
});

export const serverIdSchema = updateServerSchema.pick({ id: true });

// Types for servers - used to type API request params and within Components
export type Server = z.infer<typeof updateServerSchema>;
export type NewServer = z.infer<typeof insertServerSchema>;
export type NewServerParams = z.infer<typeof insertServerParams>;
export type UpdateServerParams = z.infer<typeof updateServerParams>;
export type ServerId = z.infer<typeof serverIdSchema>[];

// this type infers the return from getServers() - meaning it will include any joins
export type CompleteServer = Awaited<
  ReturnType<typeof getServers>
>["servers"][number];
