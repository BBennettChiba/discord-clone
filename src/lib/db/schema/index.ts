import * as authSchema from "./auth";
import * as channelsSchema from "./channels";
import * as groupsSchema from "./groups";
import * as messagesSchema from "./messages";
import * as serversSchema from "./servers";
import * as usersToServerSchema from "./usersToServers";

export const schema = {
  ...authSchema,
  ...channelsSchema,
  ...messagesSchema,
  ...serversSchema,
  ...usersToServerSchema,
  ...groupsSchema,
};