import { users } from "./schema/auth";
import { channels } from "./schema/channels";
import { groups } from "./schema/groups";
import { messages } from "./schema/messages";
import { servers } from "./schema/servers";
import { usersToChannels } from "./schema/usersToChannels";
import { usersToServers } from "./schema/usersToServers";
import { db, client } from ".";

await db.delete(users);

await db.delete(servers);

await db.delete(messages);

await db.delete(channels);

await db.delete(usersToChannels);

await db.delete(usersToServers);

await db.delete(groups);

await client.end();
