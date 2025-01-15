import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Hello world - ${process.env.SERVICE_NAME}`,
};

export default function Home() {
  return (
    <main className="nhsuk-main-wrapper" id="maincontent" role="main">
      <h1>Hello world</h1>
    </main>
  );
}
