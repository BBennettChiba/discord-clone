import { ServerIcon } from "./ServerIcon";
import { servers } from "./Severs";

export const ServerList = () => (
  <div className="fixed h-full">
    <div className="flex-grow h-screen pt-3 relative bg-neutral-800">
      {servers.map(({ element, title }, i) => (
        <ServerIcon key={i} title={title}>
          {element}
        </ServerIcon>
      ))}
    </div>
  </div>
);
/*https://cdn.discordapp.com/icons/522815365282136076/39da61f48ba994387c660a90143bdc4f.webp?size=96*/
