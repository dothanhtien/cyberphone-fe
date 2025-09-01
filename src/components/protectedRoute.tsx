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
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsAuthenticated(true);
      router.replace(homePath);
    } else {
      setIsAuthenticated(false);
      if (pathname !== redirectPath) {
        router.replace(redirectPath);
      }
    }

    setIsAuthChecked(true);
  }, [router, pathname, redirectPath, homePath]);

  if (!isAuthChecked) return null;

  return isAuthenticated ? <>{children}</> : null;
}
