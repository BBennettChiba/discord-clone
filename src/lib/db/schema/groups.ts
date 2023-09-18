import { relations } from "drizzle-orm";
import { varchar, serial, pgTable, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { type getGroupsByServerId } from "@/lib/api/groups/queries";
import { channels } from "./channels";
import { servers } from "./servers";

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  serverId: integer("server_id").notNull(),
});

export const groupsRelations = relations(groups, ({ one, many }) => ({
  server: one(servers, {
    fields: [groups.serverId],
    references: [servers.id],
  }),
  channels: many(channels),
}));

// Schema for groups - used to validate API requests

export const getGroupsByServerIdSchema = createSelectSchema(groups, {}).pick({
  serverId: true,
});

export const insertGroupSchema = createInsertSchema(groups);

export const insertGroupParams = createSelectSchema(groups, {}).omit({
  id: true,
});

export const updateGroupSchema = createSelectSchema(groups);

export const updateGroupParams = createSelectSchema(groups, {});

export const groupIdSchema = updateGroupSchema.pick({ id: true });

// Types for groups - used to type API request params and within Components
export type Group = z.infer<typeof updateGroupSchema>;
export type NewGroup = z.infer<typeof insertGroupSchema>;
export type NewGroupParams = z.infer<typeof insertGroupParams>;
export type UpdateGroupParams = z.infer<typeof updateGroupParams>;
export type GroupId = z.infer<typeof groupIdSchema>["id"];

// this type infers the return from getGroups() - meaning it will include any joins
export type CompleteGroup = Awaited<
  ReturnType<typeof getGroupsByServerId>
>[number];
