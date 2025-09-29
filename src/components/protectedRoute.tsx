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
  redirectPath = "/admin/login",
  homePath = "/admin/dashboard",
}: ProtectedRouteProps) {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("accessToken");
    }

    if (!token && pathname !== redirectPath) {
      router.push(redirectPath);
    }
    setIsAuthenticated(!!token);
    setIsAuthChecked(true);
  }, [router, pathname, redirectPath, homePath]);

  if (!isAuthChecked) return null;

  return isAuthenticated ? <>{children}</> : null;
}
