import { faker } from "@faker-js/faker";
import { users } from "./schema/auth";
import { channels, type Channel } from "./schema/channels";
import { groups, type Group } from "./schema/groups";
import { messages, type Message } from "./schema/messages";
import { servers, type Server } from "./schema/servers";
import { db } from "./";

console.log("BEGINNING SEEDING");

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const createUserData = (numOfUsers: number) => {
  const fakeUsers = [];
  for (let i = 0; i < numOfUsers; i++) {
    const user = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
    };
    fakeUsers.push(user);
  }
  return fakeUsers;
};

const fakeUsers = createUserData(5);

const getRandomUser = (listOfUsers: User[]) =>
  listOfUsers[Math.floor(Math.random() * listOfUsers.length)];

const createServerData = (numOfServers: number) => {
  const fakeServers = [];
  for (let i = 0; i < numOfServers; i++) {
    const server: Server = {
      id: faker.number.int(100_000),
      name: faker.lorem.slug(),
      ownerId: getRandomUser(fakeUsers).id,
      defaultChannel: -1,
    };
    fakeServers.push(server);
  }
  return fakeServers;
};

const fakeServers = createServerData(5);

// const getRandomServer = (listofServers: Server[]): Server =>
// listofServers[Math.floor(Math.random() * listofServers.length)];

const createGroupData = (numOfGroups: number) => {
  const fakeGroups = [];
  for (const server of fakeServers) {
    for (let i = 0; i < numOfGroups; i++) {
      const grp = {
        id: faker.number.int(100_000),
        name: faker.lorem.word(),
        serverId: server.id,
      };
      fakeGroups.push(grp);
    }
  }
  return fakeGroups;
};

const fakeGroups = createGroupData(5);

const getRandomGroup = (listOfGroups: Group[]) =>
  listOfGroups[Math.floor(Math.random() * listOfGroups.length)];

const createChannelData = (numOfChannels: number): Channel[] => {
  const fakeChannels: Channel[] = [];
  for (let i = 0; i < numOfChannels; i++) {
    const group = getRandomGroup(fakeGroups);
    const channel: Channel = {
      id: faker.number.int(100_000),
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      groupId: group.id,
    };
    fakeChannels.push(channel);
    addDefaultChannels(group, channel.id);
  }
  return fakeChannels;
};

const addDefaultChannels = (group: Group, channelId: number) => {
  const server = fakeServers.find(
    (s) => s.defaultChannel === -1 && s.id === group.serverId,
  );
  if (!server) return;
  server.defaultChannel = channelId;
};

const fakeChannels = createChannelData(25);

const getRandomChannel = (listOfChannels: Channel[]): Channel =>
  listOfChannels[Math.floor(Math.random() * listOfChannels.length)];

const createMessageData = (numOfMessages: number): Message[] => {
  const fakeMessages: Message[] = [];
  for (let i = 0; i < numOfMessages; i++) {
    const message: Message = {
      id: faker.number.int(100_000),
      body: faker.lorem.lines(),
      createdAt: faker.date.recent(),
      authorId: getRandomUser(fakeUsers).id,
      channelId: getRandomChannel(fakeChannels).id,
      parentId: null,
      updatedAt: null,
    };
    fakeMessages.push(message);
  }
  return fakeMessages;
};

const fakeMessages = createMessageData(200);

await db.insert(users).values(fakeUsers);
await db.insert(servers).values(fakeServers);
await db.insert(channels).values(fakeChannels);
await db.insert(messages).values(fakeMessages);
await db.insert(groups).values(fakeGroups);

console.log("SEEDING FINISHED");
