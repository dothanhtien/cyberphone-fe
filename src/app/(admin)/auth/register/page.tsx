"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useRegister } from "@/features/auth/mutations";
import { RegisterRequest } from "@/features/auth/types";
import { handleApiError } from "@/utils";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const handleRegister = (values: RegisterRequest) => {
    registerMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Registered successfully");
        router.push("/auth/login");
      },
      onError: (error) =>
        handleApiError(error, "An error occurred when registering"),
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle>Create an account to join with us now</CardTitle>
      </CardHeader>

      <CardContent>
        <RegisterForm
          isSubmitting={registerMutation.isPending}
          onSubmit={handleRegister}
        />
      </CardContent>
    </Card>
  );
}
