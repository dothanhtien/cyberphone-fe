import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberPhone | Login",
  description: "To be defined",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
