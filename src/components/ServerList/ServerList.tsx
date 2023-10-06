"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { type Server } from "@/lib/db/schema/servers";
import { PlusButton } from "../ChannelSelection/MenuOpener";
import { DiscordIcon } from "../Icons";
import { ServerIcon } from "./ServerIcon";

export const ServerList = ({ servers }: { servers: Server[] }): JSX.Element => {
  const { server } = useParams();

  const currentServerIndex =
    servers.findIndex((s) => s.id === +server) + 1 || 0;

  const [selected, setSelected] = useState<number>(currentServerIndex);

  return (
    <div className="h-full w-[72px]">
      <div className="relative h-screen flex-grow bg-neutral-900 pt-3">
        <div onClick={(): void => setSelected(0)}>
          <Link href="/me">
            <ServerIcon title="Direct Messages" selected={selected === 0}>
              <DiscordIcon className="h-5 w-7" />
            </ServerIcon>
          </Link>
        </div>
        <Divider />
        {servers.map(({ name, id, defaultChannel, icon }, i) => (
          <div onClick={(): void => setSelected(i + 1)} key={id}>
            <Link href={`/${id}/${defaultChannel}`}>
              <ServerIcon title={name} selected={i + 1 === selected}>
                <Image height={48} width={48} src={icon} alt={icon} />
              </ServerIcon>
            </Link>
          </div>
        ))}
        <Divider />
        <div onClick={(): void => setSelected(servers.length + 1)}>
          <ServerIcon
            title={"Add a server"}
            green
            selected={selected === servers.length + 1}
          >
            <PlusButton />
          </ServerIcon>
        </div>
      </div>
    </div>
  );
};

const Divider = () => (
  <div className="relative flex h-3 w-full items-start justify-center">
    <div className="h-[2px] w-8 bg-gray-700" />
  </div>
);
