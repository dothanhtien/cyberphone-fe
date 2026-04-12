"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

import { AuthUserType } from "@/features/auth/types";
import { useAuthStore } from "@/stores/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedType?: AuthUserType;
}

export function ProtectedRoute({ children, allowedType }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      if (pathname !== "/auth/login") router.push("/auth/login");
      return;
    }

    if (allowedType && user?.type !== allowedType) {
      router.replace(
        user?.type === "customer" ? "/customers/orders" : "/admin/dashboard",
      );
    }
  }, [hasHydrated, isAuthenticated, user, allowedType, pathname, router]);

  if (!hasHydrated) return null;

  if (!isAuthenticated) return null;

  if (allowedType && user?.type !== allowedType) return null;

  return <>{children}</>;
}
