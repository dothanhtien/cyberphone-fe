import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberPhone | Login",
  description: "Log in to the CyberPhone admin portal",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
