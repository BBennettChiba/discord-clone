import { faker } from "@faker-js/faker";
import { users } from "./schema/auth";
import { channels, type Channel } from "./schema/channels";
import { groups, type Group } from "./schema/groups";
import { messages, type Message } from "./schema/messages";
import { servers, type Server } from "./schema/servers";
import { db } from "./";

console.log("BEGINNING SEEDING");

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

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
      id: faker.number.int(100_000_000),
      name: faker.lorem.slug(),
      ownerId: getRandomUser(fakeUsers).id,
      defaultChannel: -1,
      icon: faker.image.urlPicsumPhotos({ height: 48, width: 48 }),
    };
    fakeServers.push(server);
  }
  return fakeServers;
};

const fakeServers = createServerData(5);

const createGroupData = () => {
  const fakeGroups = [];
  for (const server of fakeServers) {
    for (let i = 0; i < randomInt(2, 10); i++) {
      const grp = {
        id: faker.number.int(100_000_000),
        name: faker.lorem.word(),
        serverId: server.id,
      };
      fakeGroups.push(grp);
    }
  }
  return fakeGroups;
};

const fakeGroups = createGroupData();

const createChannelData = (): Channel[] => {
  const fakeChannels: Channel[] = [];
  for (const group of fakeGroups) {
    for (let i = 0; i < randomInt(2, 10); i++) {
      const channel: Channel = {
        id: faker.number.int(100_000_000),
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        groupId: group.id,
      };
      fakeChannels.push(channel);
      addDefaultChannels(group, channel.id);
    }
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

const fakeChannels = createChannelData();

const createMessageData = (): Message[] => {
  const fakeMessages: Message[] = [];
  for (const channel of fakeChannels) {
    for (let i = 0; i < randomInt(10, 300); i++) {
      const message: Message = {
        id: faker.number.int(100_000_000),
        body: faker.lorem.lines(),
        createdAt: faker.date.recent(),
        authorId: getRandomUser(fakeUsers).id,
        channelId: channel.id,
        parentId: null,
        updatedAt: null,
      };
      fakeMessages.push(message);
    }
  }
  return fakeMessages;
};

const fakeMessages = createMessageData();

await db.insert(users).values(fakeUsers);
await db.insert(servers).values(fakeServers);
await db.insert(channels).values(fakeChannels);
await db.insert(messages).values(fakeMessages);
await db.insert(groups).values(fakeGroups);

console.log("SEEDING FINISHED");
