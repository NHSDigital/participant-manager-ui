import type { Metadata } from "next";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import "./globals.scss";

export const metadata: Metadata = {
  title: "UI template",
  description: "A UI template for Screening services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serviceName = process.env.SERVICE_NAME;
  return (
    <html lang="en">
      <body>
        <Header serviceName={serviceName} />
        <div className="nhsuk-width-container">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
