import type { Metadata } from "next";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/admin/Sidebar";
import { AppSidebarInset } from "@/components/layouts/admin/SidebarInset";

export const metadata: Metadata = {
  title: "CyberPhone | Customer",
  description:
    "Customer dashboard for CyberPhone - View orders, payments and your profile",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute allowedType="customer">
      <SidebarProvider>
        <AppSidebar />
        <AppSidebarInset>
          <div className="max-w-420 h-full">{children}</div>
        </AppSidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
