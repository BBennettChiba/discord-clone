/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";
import { env } from "@/env";
import { schema } from "./schema";

const connectionString = env.DATABASE_URL;

let client: postgres.Sql;

// @ts-expect-error I know what I'm doing
if (global.client) {
  // @ts-expect-error I know what I'm doing
  client = global.client;
} else {
  client = postgres(connectionString);
}

// const client = postgres(connectionString);

export const db = drizzle(client, { schema });
