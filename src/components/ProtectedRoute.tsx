"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthentication = () => {
      let token: string | null = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("accessToken");
      }

      if (!token && pathname !== "/auth/login") {
        router.push("/auth/login");
      }
      setIsAuthenticated(!!token);
      setIsAuthChecked(true);
    };

    checkAuthentication();
  }, [router, pathname]);

  if (!isAuthChecked) return null;

  return isAuthenticated ? <>{children}</> : null;
}
