CREATE TABLE IF NOT EXISTS "users_to_servers" (
	"user_id" text NOT NULL,
	"server_id" integer NOT NULL,
	CONSTRAINT users_to_servers_user_id_server_id PRIMARY KEY("user_id","server_id")
);
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
