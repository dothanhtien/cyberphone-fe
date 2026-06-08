"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, ShoppingBag, TabletSmartphone } from "lucide-react";

import { MiniCart } from "@/storefront/cart/components/MiniCart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/mutations";
import { useAuthStore } from "@/stores/auth";
import { getAvatarFallback, getDisplayName } from "@/utils";

export function Navbar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const logoutMutation = useLogout();

  const displayName = getDisplayName({
    firstName: user?.firstName,
    lastName: user?.lastName,
    fallbackName: "Customer",
  });
  const avatarFallback = getAvatarFallback(displayName);

  const handleLogOut = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        clearSession();
        router.push("/");
      },
    });
  };

  return (
    <>
      <header className="h-20 fixed w-full bg-white top-0 left-0 shadow-lg flex items-center z-10">
        <div className="max-w-300 container p-4 mx-auto flex justify-between">
          <Link href="/" className="logo font-bold">
            <span className="flex gap-1">
              <TabletSmartphone className="text-orange-400" /> CyberPhone
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <MiniCart />

            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">{displayName}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/customers/orders">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" asChild>
                <Link href="/auth/login">
                  <LogIn />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="header-offset h-20" aria-hidden="true"></div>
    </>
  );
}
