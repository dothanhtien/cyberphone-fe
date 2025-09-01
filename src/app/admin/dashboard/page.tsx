"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/admin/login");
  };

  return (
    <div className="p-8">
      <h1>Admin Dashboard Page</h1>
      <div className="mt-4">
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </div>
  );
}
