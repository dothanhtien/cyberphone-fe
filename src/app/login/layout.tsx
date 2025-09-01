import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Cyberphone | Login",
  description: "TBD",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
