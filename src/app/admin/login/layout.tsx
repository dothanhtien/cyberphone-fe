import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Cyberphone | Admin | Login",
  description: "TBD",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
