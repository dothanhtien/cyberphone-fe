"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="mb-6 text-2xl">Admin Dashboard</h1>

        <Button
          onClick={() => {
            localStorage.removeItem("accessToken");
            router.push("/auth/login");
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
