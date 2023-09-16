import { redirect } from "next/navigation";
import { type Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getUserAuth = async (): Promise<{ session: null | Session }> => {
  const session = await getServerSession(authOptions);
  return { session };
};

export const checkAuth = async (): Promise<void> => {
  const { session } = await getUserAuth();
  if (!session) redirect("/api/auth/signin");
};
