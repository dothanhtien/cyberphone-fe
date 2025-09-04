"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MonitorSmartphone } from "lucide-react";

import { LoginForm, LoginFormData } from "@/components/forms/loginForm";
import apiClient from "@/lib/api/client";
import { useAppDispatch } from "@/lib/hooks";
import { setLoggedInUser } from "@/lib/store/features/auth/authSlice";

export default function AdminLoginPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = async (formData: LoginFormData) => {
    try {
      setIsError(false);
      setLoggingIn(true);
      const result = await apiClient.post("/auth/login", formData);

      if (result.data?.data) {
        dispatch(setLoggedInUser(result.data.data));
        localStorage.setItem("accessToken", result.data?.accessToken);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setIsError(true);
      console.log("An error occurred when logging in", err);
    } finally {
      setLoggingIn(false);
    }
  };

  if (checkingAuth) return null;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <MonitorSmartphone className="size-4" />
          </div>
          Cyberphone
        </a>

        <LoginForm
          loggingIn={loggingIn}
          isError={isError}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
