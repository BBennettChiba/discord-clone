import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createChannel,
  deleteChannel,
  updateChannel,
} from "@/lib/api/channels/mutations";
import { 
  channelIdSchema,
  insertChannelParams,
  updateChannelParams 
} from "@/lib/db/schema/channels";

export async function POST(req: Request) {
  try {
    const validatedData = insertChannelParams.parse(await req.json());
    const { channel, error } = await createChannel(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/channels"); // optional - assumes you will have named route same as entity
    return NextResponse.json(channel, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateChannelParams.parse(await req.json());
    const validatedParams = channelIdSchema.parse({ id });

    const { channel, error } = await updateChannel(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(channel, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = channelIdSchema.parse({ id });
    const { channel, error } = await deleteChannel(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(channel, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
