import { SignIn } from "@/components/auth/SignIn";

const Home = (): JSX.Element => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <SignIn />
  </main>
);

export default Home;
