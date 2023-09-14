import Image from "next/image";
export const servers = [
  {
    id: "0",
    element: (
      <Image
        src="https://cdn.discordapp.com/icons/522815365282136076/39da61f48ba994387c660a90143bdc4f.webp?size=96"
        height={48}
        width={48}
        alt="server name"
      />
    ),
    title: "The Cool Looking Tree",
    defaultChannel: 0,
  },
  {
    id: "1",
    element: <>hntdwtclt</>,
    title: "Has Nothing to Do with the Cool Looking Tree",
    defaultChannel: 0,
  },
  { id: "2", element: <>DS</>, title: "Dark Souls", defaultChannel: 0 },
];
