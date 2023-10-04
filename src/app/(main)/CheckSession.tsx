import { getServerSession } from "next-auth";

export const CheckSession = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/api/auth/signin");
  return <div className="flex">{children}</div>;
};
