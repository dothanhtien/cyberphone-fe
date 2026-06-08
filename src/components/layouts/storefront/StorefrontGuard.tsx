"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

import { useAuthStore } from "@/stores/auth";

export function StorefrontGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!hasHydrated) return;

    if (user?.type === "user") {
      router.replace("/admin/dashboard");
    }
  }, [hasHydrated, user, router]);

  if (!hasHydrated || user?.type === "user") return null;

  return <>{children}</>;
}
