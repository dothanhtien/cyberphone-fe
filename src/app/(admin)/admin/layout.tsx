import type { Metadata } from "next";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/admin/Sidebar";
import { AppSidebarInset } from "@/components/layouts/admin/SidebarInset";

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
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <AppSidebarInset>{children}</AppSidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
