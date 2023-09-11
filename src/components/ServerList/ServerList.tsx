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
      <ServerIcon title={"Add a server"}>
        <svg
          enable-background="new 0 0 50 50"
          height="25px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 50 50"
          width="25px"
        >
          <rect fill="none" height="50" width="50" />
          <line
            fill="none"
            stroke="#259855"
            stroke-miterlimit="10"
            stroke-width="4"
            x1="9"
            x2="41"
            y1="25"
            y2="25"
          />
          <line
            fill="none"
            stroke="#259855"
            stroke-miterlimit="10"
            stroke-width="4"
            x1="25"
            x2="25"
            y1="9"
            y2="41"
          />
        </svg>
      </ServerIcon>
    </div>
  </div>
);
