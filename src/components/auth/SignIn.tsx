"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export const SignIn = (): JSX.Element => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={(): void => void signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={(): void => void signIn()}>Sign in</button>
    </>
  );
};
