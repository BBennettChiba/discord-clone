CREATE TABLE IF NOT EXISTS "reactions_to_messages_to_users" (
	"reaction_to_messages_reaction_id" text NOT NULL,
	"reaction_to_messages_message_id" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT reactions_to_messages_to_users_reaction_to_messages_reaction_id_reaction_to_messages_message_id_user_id PRIMARY KEY("reaction_to_messages_reaction_id","reaction_to_messages_message_id","user_id")
);
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
