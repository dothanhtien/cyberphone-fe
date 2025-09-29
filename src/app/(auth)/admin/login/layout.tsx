import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberPhone | Login",
  description: "Admin login page for CyberPhone",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
