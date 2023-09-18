ALTER TABLE "channels" DROP CONSTRAINT "channels_server_id_servers_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "server_id_idx";--> statement-breakpoint
ALTER TABLE "channels" ADD COLUMN "group_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "channels" DROP COLUMN IF EXISTS "server_id";