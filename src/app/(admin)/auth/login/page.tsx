"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon, TabletSmartphone } from "lucide-react";
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

export default function LoginPage() {
  const [credentials, setCredentials] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const loginMutation = useLogin();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        router.replace("/admin/dashboard");
      } else {
        setCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [router]);

  if (checkingAuth) return null;

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    loginMutation.mutate(credentials, {
      onSuccess: (response) => {
        localStorage.setItem("accessToken", response.accessToken);
        router.push("/admin/dashboard");
      },
      onError: (error) => {
        console.log("Login failed: ", error);
        toast.error("Username/Phone or password is invalid", {
          position: "top-right",
        });
      },
      onSettled: () => {
        setCredentials({ identifier: "", password: "" });
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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-bold"
        >
          <TabletSmartphone className="size-6 text-orange-400" />
          CyberPhone
        </Link>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="identifier">
                      Username / Phone
                    </FieldLabel>
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
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
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
                      Don&apos;t have an account? <Link href="/">Sign up</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
