import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createServer,
  deleteServer,
  updateServer,
} from "@/lib/api/servers/mutations";
import { 
  serverIdSchema,
  insertServerParams,
  updateServerParams 
} from "@/lib/db/schema/servers";

export async function POST(req: Request) {
  try {
    const validatedData = insertServerParams.parse(await req.json());
    const { server, error } = await createServer(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/servers"); // optional - assumes you will have named route same as entity
    return NextResponse.json(server, { status: 201 });
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

    const validatedData = updateServerParams.parse(await req.json());
    const validatedParams = serverIdSchema.parse({ id });

    const { server, error } = await updateServer(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(server, { status: 200 });
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

    const validatedParams = serverIdSchema.parse({ id });
    const { server, error } = await deleteServer(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(server, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
