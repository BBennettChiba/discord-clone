ALTER TABLE "servers" ALTER COLUMN "icon_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "invites" ADD COLUMN "to_channel_id" integer;