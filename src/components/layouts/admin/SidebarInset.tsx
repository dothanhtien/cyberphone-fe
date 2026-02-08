"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

interface AppSidebarInsetProps {
  children: React.ReactNode;
}

const BREADCRUMB_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Products",
  create: "Create",
  edit: "Edit",
};

export function AppSidebarInset({ children }: AppSidebarInsetProps) {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => segment !== "admin");

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/admin/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    return {
      label:
        BREADCRUMB_LABELS[segment] ??
        segment.charAt(0).toUpperCase() + segment.slice(1),
      href,
      isLast,
    };
  });

  return (
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
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.href}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {item.isLast ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-8">
          {children}
        </div>
      </div>
    </SidebarInset>
  );
}
