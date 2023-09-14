import { Group } from "./Group";

const groups = [
  {
    id: 0,
    name: "General",
    channels: [
      { id: 0, name: "introductions" },
      { id: 1, name: "general-chat" },
      { id: 2, name: "chit-chat" },
    ],
  },
  {
    id: 1,
    name: "Topics",
    channels: [
      { id: 3, name: "books" },
      { id: 4, name: "movies" },
      { id: 5, name: "games" },
    ],
  },
  {
    id: 2,
    name: "Topics",
    channels: [
      { id: 6, name: "books" },
      { id: 7, name: "movies" },
      { id: 8, name: "games" },
    ],
  },
  {
    id: 3,
    name: "Topics",
    channels: [
      { id: 9, name: "books" },
      { id: 10, name: "movies" },
      { id: 11, name: "games" },
    ],
  },
  {
    id: 4,
    name: "Topics",
    channels: [
      { id: 12, name: "books" },
      { id: 13, name: "movies" },
      { id: 14, name: "games" },
    ],
  },
  {
    id: 5,
    name: "Topics",
    channels: [
      { id: 13, name: "books" },
      { id: 14, name: "movies" },
      { id: 15, name: "games" },
    ],
  },
  {
    id: 6,
    name: "Topics",
    channels: [
      { id: 16, name: "books" },
      { id: 17, name: "movies" },
      { id: 18, name: "games" },
    ],
  },
];
export const GroupList = () => (
  <div className="scrollbar-thin scrollbar-thumb-zinc-900 h-full overflow-y-auto">
    <ul>
      {groups.map((group) => (
        <Group key={group.id} group={group} />
      ))}
    </ul>
  </div>
);
