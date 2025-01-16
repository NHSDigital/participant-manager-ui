import type { Metadata } from "next";
import { auth } from "@/app/lib/auth";
import SignInButton from "@/app/components/signInButton";
import SignOutButton from "./components/signOutButton";

export const metadata: Metadata = {
  title: `Overview - ${process.env.SERVICE_NAME}`,
};

export default async function Home() {
  const session = await auth();

  return (
    <main className="nhsuk-main-wrapper" id="maincontent" role="main">
      <h1>Overview</h1>
      {!session?.user && <SignInButton />}
      {session?.user && (
        <>
          <p>You are signed in.</p>
          <SignOutButton />
        </>
      )}
    </main>
  );
}
