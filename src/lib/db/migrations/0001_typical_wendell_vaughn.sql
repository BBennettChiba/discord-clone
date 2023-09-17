CREATE TABLE IF NOT EXISTS "channels" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(40) NOT NULL,
	"server_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"channel_id" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"author" varchar(256) NOT NULL,
	"parent_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "servers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(40) NOT NULL,
	"owner_id" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "computers";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "channels" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "server_id_idx" ON "channels" ("server_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "channel_id_idx" ON "messages" ("channel_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "owner_id_idx" ON "servers" ("owner_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "servers" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "channels" ADD CONSTRAINT "channels_server_id_servers_id_fk" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "servers" ADD CONSTRAINT "servers_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
