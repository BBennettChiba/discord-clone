import "./globals.css";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { type ReactNode } from "react";
import { ServerList } from "@/components/ServerList/ServerList";
import { NextAuthProvider } from "@/lib/auth/Provider";
import { TrpcProvider } from "@/lib/trpc/Provider";
import { serverTrpc } from "@/lib/trpc/caller";
import { authOptions } from "./api/auth/[...nextauth]/route";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const servers = await serverTrpc.servers.getServers();
  return (
    <html lang="en">
      <body className={inter.className}>
        <TrpcProvider>
          <NextAuthProvider>
            <CheckSession>
              <ServerList servers={servers} />
              {children}
            </CheckSession>
          </NextAuthProvider>
        </TrpcProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const CheckSession = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/api/auth/signin");
  return <div className="flex">{children}</div>;
};
