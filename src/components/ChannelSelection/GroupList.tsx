import { Group } from "./Group";

const groups = [
  {
    id: 0,
    name: "General",
    channels: [
      { id: 0, name: "introductions" },
      { id: 1, name: "general-chat" },
    ],
  },
  {
    id: 0,
    name: "Topics",
    channels: [
      { id: 3, name: "books" },
      { id: 4, name: "movies" },
    ],
  },
];
export const GroupList = () => (
  <div>
    <ul>
      {groups.map((group) => (
        <Group key={group.id} group={group} />
      ))}
    </ul>
  </div>
);
