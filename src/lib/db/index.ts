import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";
import { env } from "@/env";
import { schema } from "./schema";

const connectionString = env.DATABASE_URL;

export const client = postgres(connectionString);

export const db = drizzle(client, { schema });

/**@TODO try to fix the too many clients error */
