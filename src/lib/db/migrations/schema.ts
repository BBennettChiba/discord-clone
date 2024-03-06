import { pgTable, foreignKey, text, timestamp, varchar, integer, index, serial, primaryKey } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});

export const invites = pgTable("invites", {
	id: varchar("id", { length: 128 }).primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	userId: varchar("user_id", { length: 256 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	serverId: integer("server_id").notNull(),
	toChannelId: integer("to_channel_id"),
});

export const channels = pgTable("channels", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 40 }).notNull(),
	description: varchar("description", { length: 256 }).notNull(),
	groupId: integer("group_id").notNull(),
},
(table) => {
	return {
		nameIdx: index("name_idx").on(table.name),
	}
});

export const groups = pgTable("groups", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	serverId: integer("server_id").notNull(),
});

export const reactions = pgTable("reactions", {
	id: varchar("id").primaryKey().notNull(),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: text("image"),
});

export const messages = pgTable("messages", {
	id: serial("id").primaryKey().notNull(),
	body: text("body").notNull(),
	channelId: integer("channel_id").notNull().references(() => channels.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	author: varchar("author", { length: 256 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	parentId: integer("parent_id"),
},
(table) => {
	return {
		channelIdIdx: index("channel_id_idx").on(table.channelId),
	}
});

export const servers = pgTable("servers", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 40 }).notNull(),
	defaultChannel: integer("default_channel").notNull(),
	ownerId: text("owner_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	iconUrl: text("icon_url"),
},
(table) => {
	return {
		ownerIdIdx: index("owner_id_idx").on(table.ownerId),
	}
});

export const usersToUsers = pgTable("users_to_users", {
	userId: text("user_id").notNull().references(() => user.id),
	friendId: text("friend_id").notNull().references(() => user.id),
},
(table) => {
	return {
		usersToUsersUserIdFriendId: primaryKey(table.userId, table.friendId)
	}
});

export const usersToChannels = pgTable("users_to_channels", {
	userId: text("user_id").notNull().references(() => user.id),
	channelId: integer("channel_id").notNull().references(() => channels.id),
},
(table) => {
	return {
		usersToChannelsUserIdChannelId: primaryKey(table.userId, table.channelId)
	}
});

export const usersToServers = pgTable("users_to_servers", {
	userId: text("user_id").notNull().references(() => user.id),
	serverId: integer("server_id").notNull().references(() => servers.id),
},
(table) => {
	return {
		usersToServersUserIdServerId: primaryKey(table.userId, table.serverId)
	}
});

export const reactionsToMessages = pgTable("reactions_to_messages", {
	reactionId: text("reaction_id").notNull().references(() => reactions.id),
	messageId: integer("message_id").notNull().references(() => messages.id),
},
(table) => {
	return {
		reactionsToMessagesReactionIdMessageId: primaryKey(table.reactionId, table.messageId)
	}
});

export const verificationToken = pgTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationtokenIdentifierToken: primaryKey(table.identifier, table.token)
	}
});

export const reactionsToMessagesToUsers = pgTable("reactions_to_messages_to_users", {
	reactionToMessagesReactionId: text("reaction_to_messages_reaction_id").notNull(),
	reactionToMessagesMessageId: integer("reaction_to_messages_message_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id),
},
(table) => {
	return {
		reactionsToMessagesToUsersReactionToMessagesReactionId: primaryKey(table.reactionToMessagesReactionId, table.reactionToMessagesMessageId, table.userId)
	}
});

export const account = pgTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		accountProviderProvideraccountid: primaryKey(table.provider, table.providerAccountId)
	}
});