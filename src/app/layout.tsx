import "./globals.css";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { NextAuthProvider } from "@/lib/auth/Provider";
import { TrpcProvider } from "@/lib/trpc/Provider";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <TrpcProvider>
        <NextAuthProvider>{children}</NextAuthProvider>
      </TrpcProvider>
    </body>
  </html>
);

export default RootLayout;
