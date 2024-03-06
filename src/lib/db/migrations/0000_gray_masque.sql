CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "channels" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(40) NOT NULL,
	"description" varchar(256) NOT NULL,
	"group_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"server_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invites" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"server_id" integer NOT NULL,
	"to_channel_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"channel_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"author" varchar(256) NOT NULL,
	"parent_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reactions" (
	"id" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reactions_to_messages" (
	"reaction_id" text NOT NULL,
	"message_id" integer NOT NULL,
	CONSTRAINT reactions_to_messages_reaction_id_message_id PRIMARY KEY("reaction_id","message_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reactions_to_messages_to_users" (
	"reaction_to_messages_reaction_id" text NOT NULL,
	"reaction_to_messages_message_id" integer NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT reactions_to_messages_to_users_reaction_to_messages_reaction_id_reaction_to_messages_message_id_user_id PRIMARY KEY("reaction_to_messages_reaction_id","reaction_to_messages_message_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "servers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(40) NOT NULL,
	"default_channel" integer NOT NULL,
	"owner_id" text NOT NULL,
	"icon_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_channels" (
	"user_id" text NOT NULL,
	"channel_id" integer NOT NULL,
	CONSTRAINT users_to_channels_user_id_channel_id PRIMARY KEY("user_id","channel_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_servers" (
	"user_id" text NOT NULL,
	"server_id" integer NOT NULL,
	CONSTRAINT users_to_servers_user_id_server_id PRIMARY KEY("user_id","server_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_users" (
	"user_id" text NOT NULL,
	"friend_id" text NOT NULL,
	CONSTRAINT users_to_users_user_id_friend_id PRIMARY KEY("user_id","friend_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "channels" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "channel_id_idx" ON "messages" ("channel_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "owner_id_idx" ON "servers" ("owner_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "servers" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invites" ADD CONSTRAINT "invites_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reactions_to_messages" ADD CONSTRAINT "reactions_to_messages_reaction_id_reactions_id_fk" FOREIGN KEY ("reaction_id") REFERENCES "reactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reactions_to_messages" ADD CONSTRAINT "reactions_to_messages_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reactions_to_messages_to_users" ADD CONSTRAINT "reactions_to_messages_to_users_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reactions_to_messages_to_users" ADD CONSTRAINT "reactions_to_messages_to_users_reaction_to_messages_reaction_id_reaction_to_messages_message_id_reactions_to_messages_reaction_id_message_id_fk" FOREIGN KEY ("reaction_to_messages_reaction_id","reaction_to_messages_message_id") REFERENCES "reactions_to_messages"("reaction_id","message_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "servers" ADD CONSTRAINT "servers_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_channels" ADD CONSTRAINT "users_to_channels_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_channels" ADD CONSTRAINT "users_to_channels_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_servers" ADD CONSTRAINT "users_to_servers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_servers" ADD CONSTRAINT "users_to_servers_server_id_servers_id_fk" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_users" ADD CONSTRAINT "users_to_users_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_users" ADD CONSTRAINT "users_to_users_friend_id_user_id_fk" FOREIGN KEY ("friend_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
