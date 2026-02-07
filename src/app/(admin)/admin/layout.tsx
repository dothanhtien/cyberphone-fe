import type { Metadata } from "next";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "CyberPhone | Admin",
  description:
    "Admin dashboard for CyberPhone - Manage users, brands, categories and products",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
