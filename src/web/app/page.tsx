import type { Metadata } from "next";
import { auth } from "@/app/lib/auth";
import SignInButton from "@/app/components/signInButton";
import SignOutButton from "./components/signOutButton";
import { formatNhsNumber, formatDate } from "@/app/lib/utils";

export const metadata: Metadata = {
  title: `Overview - ${process.env.SERVICE_NAME}`,
};

export default async function Home() {
  const session = await auth();

  return (
    <main className="nhsuk-main-wrapper" id="maincontent" role="main">
      <h1>Overview</h1>
      <p>Public content.</p>
      {!session?.user && <SignInButton />}
      {session?.user && (
        <>
          <p>
            Welcome {session.user.firstName} {session.user.lastName} (NHS
            number:{" "}
            {session.user.nhsNumber
              ? formatNhsNumber(session.user.nhsNumber)
              : ""}
            ).
          </p>
          <p>Date of birth: {formatDate(session.user.dob ?? "")}</p>
          <p>Identity level: {session.user.identityLevel}</p>
          <p>Private content.</p>
          <SignOutButton />
        </>
      )}
    </main>
  );
}
