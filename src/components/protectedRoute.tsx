"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
  homePath?: string;
}

export default function ProtectedRoute({
  children,
  redirectPath = "/login",
  homePath = "/admin/dashboard",
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("accessToken");
    }

    if (!token && pathname !== redirectPath) {
      router.replace(redirectPath);
    }
    setIsAuthenticated(!!token);
    setIsAuthChecked(true);
  }, [window, router, pathname, redirectPath, homePath]);

  if (!isAuthChecked) return null;

  return isAuthenticated ? <>{children}</> : null;
}
