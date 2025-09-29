import type { Metadata } from "next";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/layouts";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "@/components/protectedRoute";

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

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />

              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-8">
              {children}
            </div>
          </div>

          <Toaster position="top-right" richColors />
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
