import { users } from "./schema/auth";
import { channels } from "./schema/channels";
import { messages } from "./schema/messages";
import { servers } from "./schema/servers";
import { db } from ".";

await db.delete(users);

await db.delete(servers);

await db.delete(messages);

await db.delete(channels);
