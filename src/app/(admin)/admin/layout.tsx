import type { Metadata } from "next";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/admin/Sidebar";
import { AppSidebarInset } from "@/components/layouts/admin/SidebarInset";
import { STORE_NAME } from "@/config";

export const metadata: Metadata = {
  title: `${STORE_NAME} | Admin`,
  description: `Admin dashboard for ${STORE_NAME} - Manage users, brands, categories and products`,
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute allowedType="user">
      <SidebarProvider>
        <AppSidebar />
        <AppSidebarInset>
          <div className="max-w-420 h-full">{children}</div>
        </AppSidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
