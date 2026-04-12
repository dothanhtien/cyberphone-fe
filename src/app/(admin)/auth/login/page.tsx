"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginRequest } from "@/features/auth/types";
import { useLogin } from "@/features/auth/mutations";
import { useAuthStore } from "@/stores/auth";

export default function LoginPage() {
  const [credentials, setCredentials] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const router = useRouter();
  const loginMutation = useLogin();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);

  const getRedirectPath = (type: string) =>
    type === "customer" ? "/customers/orders" : "/admin/dashboard";

  useEffect(() => {
    if (!hasHydrated) return;

    if (isAuthenticated && user) {
      router.replace(getRedirectPath(user.type));
    }
  }, [hasHydrated, isAuthenticated, user, router]);

  if (!hasHydrated || isAuthenticated) return null;

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    loginMutation.mutate(credentials, {
      onSuccess: (response) => {
        setSession({
          user: response.data,
          accessToken: response.accessToken,
        });
        router.push(getRedirectPath(response.data.type));
        setCredentials({ identifier: "", password: "" });
      },
      onError: (error) => {
        console.log("Login failed: ", error);
        toast.error("Phone/Email or password is invalid");
      },
    });
  };

  const handleInputChange = (
    field: "identifier" | "password",
    value: string,
  ) => {
    const newValue = {
      [field]: value,
    };

    setCredentials((prevValue) => ({ ...prevValue, ...newValue }));
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Welcome back</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="identifier">Phone / Email</FieldLabel>
              <Input
                id="identifier"
                required
                disabled={loginMutation.isPending}
                onChange={(e) =>
                  handleInputChange("identifier", e.target.value)
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                disabled={loginMutation.isPending}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </Field>

            <Field>
              <Button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending && (
                  <Loader2Icon className="animate-spin" />
                )}
                Login
              </Button>

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register">Sign up</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
