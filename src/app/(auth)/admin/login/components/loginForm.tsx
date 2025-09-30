"use client";

import { FormEvent, useState } from "react";
import { Loader2Icon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginData } from "@/interfaces";
import { apiService } from "@/lib/api";
import { useAppDispatch } from "@/lib/store/hooks";
import { setLoggedInUser } from "@/lib/store/features/auth/authSlice";

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [loggingIn, setLoggingIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<LoginData>({
    identifier: "",
    password: "",
  });

  const handleInputChange = (
    field: "identifier" | "password",
    value: string
  ) => {
    const newFormData = {
      [field]: value,
    };

    setFormData((prevValue) => ({ ...prevValue, ...newFormData }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.identifier.trim() || !formData.password.trim()) {
      setIsError(true);
      return;
    }

    try {
      setIsError(false);
      setLoggingIn(true);
      const res = await apiService.auth.login(formData);
      dispatch(setLoggedInUser(res.data));
      localStorage.setItem("accessToken", res.data.accessToken);
      onSuccess();
    } catch (err) {
      setIsError(true);
      console.log("An error occurred when logging in", err);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="identifier">Email or Phone</Label>
                  <Input
                    id="identifier"
                    placeholder="test@test.test or 0987654321"
                    required
                    onChange={(e) =>
                      handleInputChange("identifier", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </div>

                {isError && (
                  <div className="text-sm text-red-500">
                    Email/Phone or Password is invalid
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loggingIn}>
                  {loggingIn && <Loader2Icon className="animate-spin" />}
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
