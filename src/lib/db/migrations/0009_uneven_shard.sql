CREATE TABLE IF NOT EXISTS "users_to_channels" (
	"user_id" text NOT NULL,
	"channel_id" integer NOT NULL,
	CONSTRAINT users_to_channels_user_id_channel_id PRIMARY KEY("user_id","channel_id")
);
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
