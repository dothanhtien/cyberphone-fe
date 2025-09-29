import type { Metadata } from "next";

import ProtectedRoute from "@/components/protectedRoute";

export const metadata: Metadata = {
  title: "CyberPhone | Admin",
  description: "To be defined",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
