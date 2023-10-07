import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { timestamp, varchar, pgTable, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getInviteById } from "@/lib/api/invites/queries";
import { users } from "./auth";
import { servers } from "./servers";

export const invites = pgTable("invites", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  creatorId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  serverId: integer("server_id").notNull(),
});

export const invitesRelations = relations(invites, ({ one }) => ({
  creator: one(users, {
    fields: [invites.creatorId],
    references: [users.id],
  }),
  server: one(servers, {
    fields: [invites.serverId],
    references: [servers.id],
  }),
}));

// Schema for invites - used to validate API requests
export const insertInviteSchema = createInsertSchema(invites);

export const insertInviteParams = createSelectSchema(invites).omit({
  id: true,
  creatorId: true,
  createdAt: true,
});

export const updateInviteSchema = createSelectSchema(invites);

export const updateInviteParams = createSelectSchema(invites, {
  createdAt: z.coerce.string(),
}).omit({
  creatorId: true,
});

export const inviteIdSchema = updateInviteSchema.pick({ id: true });

// Types for invites - used to type API request params and within Components
export type Invite = z.infer<typeof updateInviteSchema>;
export type NewInvite = z.infer<typeof insertInviteSchema>;
export type NewInviteParams = z.infer<typeof insertInviteParams>;
export type UpdateInviteParams = z.infer<typeof updateInviteParams>;
export type InviteId = z.infer<typeof inviteIdSchema>["id"];

// this type infers the return from getInvites() - meaning it will include any joins
export type CompleteInvite = Awaited<
  ReturnType<typeof getInviteById>
>;
