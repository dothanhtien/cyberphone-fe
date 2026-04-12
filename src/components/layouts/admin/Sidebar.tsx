"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  ChevronsUpDown,
  CircleUserRound,
  Layers,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  TabletSmartphone,
  // Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLayoutStore } from "@/stores/layout";
import { useAuthStore } from "@/stores/auth";
import { useLogout } from "@/features/auth/mutations";

const userMenuItems = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Brands",
    url: "/admin/brands",
    icon: BadgeCheck,
  },
  {
    name: "Categories",
    url: "/admin/categories",
    icon: Layers,
  },
  {
    name: "Products",
    url: "/admin/products",
    icon: Package,
  },
  // {
  //   name: "Users",
  //   url: "/admin/dashboard",
  //   icon: Users,
  // },
];

const customerMenuItems = [
  {
    name: "My Orders",
    url: "/customers/orders",
    icon: ShoppingBag,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const activeMenu = useLayoutStore((state) => state.activeMenu);
  const user = useAuthStore((state) => state.user);
  const menuItems =
    user?.type === "customer" ? customerMenuItems : userMenuItems;
  const clearSession = useAuthStore((state) => state.clearSession);
  const { isMobile } = useSidebar();
  const logoutMutation = useLogout();

  const handleLogOut = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearSession();
        router.push("/auth/login");
      },
      onError: () => {
        clearSession();
        router.push("/auth/login");
      },
    });
  };

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Admin";
  const displayEmail = user?.email ?? user?.phone ?? "No contact info";
  const avatarFallback = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div
                  className={`bg-sidebar text-sidebar-primary-foreground
                  flex items-center justify-center rounded-lg aspect-square`}
                >
                  <TabletSmartphone className="text-orange-400 size-6!" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">CyberPhone</span>
                  <span className="truncate text-xs">
                    {user?.type === "user" ? "Admin" : "Customer"} Portal
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={activeMenu === item.url}
                  className="
                    transition-colors
                    data-[active=true]:bg-sidebar-primary
                    data-[active=true]:text-white
                    data-[active=true]:font-semibold
                  "
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {avatarFallback || "AD"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{displayName}</span>
                    <span className="truncate text-xs">{displayEmail}</span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {avatarFallback || "AD"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {displayName}
                      </span>
                      <span className="truncate text-xs">{displayEmail}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <CircleUserRound />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogOut}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
