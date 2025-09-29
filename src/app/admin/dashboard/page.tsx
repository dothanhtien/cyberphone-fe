"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/admin/login");
  };

  return (
    <div className="p-8">
      <h1>Dashboard</h1>
      <div className="mt-4">
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </div>
  );
}
