"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MonitorSmartphone } from "lucide-react";

import { LoginForm } from "./components/loginForm";

export default function AdminLoginPage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) return null;

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
