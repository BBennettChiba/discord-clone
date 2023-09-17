DROP INDEX IF EXISTS "server_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "owner_id_idx";--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "server_id_idx" ON "channels" ("server_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "owner_id_idx" ON "servers" ("owner_id");