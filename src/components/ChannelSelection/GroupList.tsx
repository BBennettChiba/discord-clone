import { Group } from "./Group";

export const groups = [
  {
    id: 0,
    name: "General",
    channels: [
      { id: "0", name: "introductions", description: "introduce yourself" },
      {
        id: "1",
        name: "general-chat",
        description: "Esse officia aliqua cillum velit ut et non",
      },
      {
        id: "2",
        name: "chit-chat",
        description: "Ut cupidatat non non irure enim dolore esse.",
      },
    ],
  },
  {
    id: 1,
    name: "Topics",
    channels: [
      { id: "3", name: "books", description: "Elit Lorem dese." },
      {
        id: "4",
        name: "movies",
        description: "Adipisicing ullamco consectetur aliquip consequat.",
      },
      { id: "5", name: "games", description: "Dolore sunt duis ea dolore." },
    ],
  },
  {
    id: 2,
    name: "Topics",
    channels: [
      {
        id: "6",
        name: "books",
        description: "Et exercitation elit sunt proident.",
      },
      {
        id: "7",
        name: "movies",
        description: "Sint velit in irure adipisicing veniam pariatur sunt.",
      },
      { id: "8", name: "games", description: "Laboris commodo." },
    ],
  },
  {
    id: 3,
    name: "Topics",
    channels: [
      {
        id: "9",
        name: "books",
        description: "Proident exercitation dolor irure elit do es.",
      },
      {
        id: "10",
        name: "movies",
        description: "Cillum incididunt aute dolor ",
      },
      {
        id: "11",
        name: "games",
        description: "Consequat est excepteur eu aliq",
      },
    ],
  },
  {
    id: 4,
    name: "Topics",
    channels: [
      {
        id: "12",
        name: "books",
        description: "Ad deserunt culpa ad adipisicing.",
      },
      {
        id: "13",
        name: "movies",
        description:
          "Culpa reprehenderit tempor deserunt nisi deserunt culpa veniam ullamco velit ullamco reprehenderit exercitation proident.",
      },
      {
        id: "14",
        name: "games",
        description:
          "Reprehenderit nulla consectetur anim ut laboris officia exercitation ut veniam.",
      },
    ],
  },
  {
    id: 5,
    name: "Topics",
    channels: [
      {
        id: "13",
        name: "books",
        description: "Elit qui cupidatat culpa sint labore occaecat.",
      },
      {
        id: "14",
        name: "movies",
        description:
          "Officia laboris velit labore et velit exercitation cillum labore nulla eiusmod.",
      },
      {
        id: "15",
        name: "games",
        description:
          "In commodo consequat veniam ipsum labore id culpa non veniam adipisicing aliqua aute et.",
      },
    ],
  },
  {
    id: 6,
    name: "Topics",
    channels: [
      {
        id: "16",
        name: "books",
        description: "Laborum aute nostrud dolore nostrud.",
      },
      {
        id: "17",
        name: "movies",
        description: "In sunt duis consectetur commodo magna enim nulla.",
      },
      {
        id: "18",
        name: "games",
        description:
          "Dolor aute tempor nostrud nulla duis culpa eu pariatur enim anim nulla id ea.",
      },
    ],
  },
];
export const GroupList = () => (
  <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-900">
    <ul>
      {groups.map((group) => (
        <Group key={group.id} group={group} />
      ))}
    </ul>
  </div>
);
