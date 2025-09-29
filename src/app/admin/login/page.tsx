"use client";

import { MonitorSmartphone } from "lucide-react";
import { useRouter } from "next/navigation";

import { LoginForm } from "./components/loginForm";

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <MonitorSmartphone className="size-6" />
          </div>
          CyberPhone
        </a>
        <LoginForm onSuccess={() => router.push("/admin/dashboard")} />
      </div>
    </div>
  );
}
