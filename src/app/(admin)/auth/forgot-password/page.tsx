"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/features/auth/mutations";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/features/auth/schemas";

export default function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = (values: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate(values, {
      onSuccess: () => {
        toast.success(
          "If this email is registered, you will receive a temporary password shortly.",
        );
        reset();
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Forgot password</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleForgotPassword)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                required
                disabled={forgotPasswordMutation.isPending}
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <Field>
              <Button type="submit" disabled={forgotPasswordMutation.isPending}>
                {forgotPasswordMutation.isPending && (
                  <Loader2Icon className="animate-spin" />
                )}
                Submit
              </Button>

              <FieldDescription className="text-center">
                <Link href="/auth/login">Back to login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
