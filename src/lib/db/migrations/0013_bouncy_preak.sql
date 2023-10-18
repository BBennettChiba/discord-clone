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
