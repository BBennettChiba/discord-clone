import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { type ReactNode } from "react";
import { ServerList } from "@/components/ServerList/ServerList";
import { serverTrpc } from "@/lib/trpc/api";
import { authOptions } from "../api/auth/[...nextauth]/route";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const servers = await serverTrpc.servers.getServers.query();

  return (
    <CheckSession>
      <ServerList servers={servers} />
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </CheckSession>
  );
};

export default RootLayout;

export const CheckSession = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/api/auth/signin");
  return <div className="flex">{children}</div>;
};
