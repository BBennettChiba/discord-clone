import { faker } from "@faker-js/faker";
import { users } from "./schema/auth";
import { channels, type Channel } from "./schema/channels";
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

const createUserData = (numOfUsers: number): User[] => {
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

const getRandomUser = (listOfUsers: User[]): User =>
  listOfUsers[Math.floor(Math.random() * listOfUsers.length)];

const createServerData = (numOfServers: number): Server[] => {
  const fakeServers = [];
  for (let i = 0; i < numOfServers; i++) {
    const server: Server = {
      id: faker.number.int(100_000),
      name: faker.lorem.slug(),
      ownerId: getRandomUser(fakeUsers).id,
    };
    fakeServers.push(server);
  }
  return fakeServers;
};

const fakeServers = createServerData(5);

const getRandomServer = (listofServers: Server[]): Server =>
  listofServers[Math.floor(Math.random() * listofServers.length)];

const createChannelData = (numOfChannels: number): Channel[] => {
  const fakeChannels: Channel[] = [];
  for (let i = 0; i < numOfChannels; i++) {
    const channel: Channel = {
      id: faker.number.int(100_000),
      name: faker.lorem.word(),
      serverId: getRandomServer(fakeServers).id,
    };
    fakeChannels.push(channel);
  }
  return fakeChannels;
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

console.log("SEEDING FINISHED");

