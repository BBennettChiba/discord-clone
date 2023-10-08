import { type Session } from "next-auth";
import { db } from "@/lib/db";
import { type NewInviteParams, invites } from "@/lib/db/schema/invites";
import { getChannelById } from "../channels/queries";
import { getInviteById } from "./queries";

type Input = {
  input: NewInviteParams;
  ctx: { session: Session };
};

export const createInvite = async ({ input, ctx: { session } }: Input) => {
  const insertData = { ...input, creatorId: session.user.id };
  const [newInvite] = await db.insert(invites).values(insertData).returning();
  const i = await getInviteById({ input: { id: newInvite.id } });
  if (!i) throw new Error("something went wrong creating an invite");
  const channelId = input.toChannelId ?? i.server.defaultChannel;
  const channel = await getChannelById({ input: { id: channelId } });

  return { ...i, toChannel: channel };
};
