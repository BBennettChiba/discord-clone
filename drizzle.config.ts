import { env } from "./src/env";
import type { Config } from "drizzle-kit";
import "dotenv/config";
// import { env } from "@/env";

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
