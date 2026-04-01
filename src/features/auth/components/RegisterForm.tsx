import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePickerInput } from "@/components/pickers/DatePickerInput";
import { RequiredFieldLabel } from "@/components/RequiredFieldLabel";
import { RegisterFormValues, registerSchema } from "../schemas";
import { RegisterRequest } from "../types";
import { Gender } from "@/enums";
import { capitalize } from "@/utils";

interface RegisterFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: RegisterRequest) => void;
}

export interface RegisterFormRef {
  resetForm: () => void;
}

export const RegisterForm = ({ isSubmitting, onSubmit }: RegisterFormProps) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  const handleFormSubmit = (values: RegisterFormValues) => {
    const payload = {
      ...values,
      dateOfBirth: dayjs(values.dateOfBirth).format("YYYY-MM-DD"),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <RequiredFieldLabel htmlFor="username">Username</RequiredFieldLabel>
            <Input
              id="username"
              {...register("username")}
              aria-invalid={!!errors.username}
            />
            <FieldError>{errors.username?.message}</FieldError>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <RequiredFieldLabel htmlFor="phone">Phone</RequiredFieldLabel>
            <Input
              id="phone"
              {...register("phone")}
              aria-invalid={!!errors.phone}
            />
            <FieldError>{errors.phone?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              {...register("email", {
                setValueAs: (v) => (v === "" ? undefined : v),
              })}
              aria-invalid={!!errors.email}
            />
            <FieldError>{errors.email?.message}</FieldError>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <RequiredFieldLabel htmlFor="firstName">
              Firstname
            </RequiredFieldLabel>
            <Input
              id="firstName"
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
            />
            <FieldError>{errors.firstName?.message}</FieldError>
          </Field>

          <Field>
            <RequiredFieldLabel htmlFor="lastName">Lastname</RequiredFieldLabel>
            <Input
              id="lastName"
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
            />
            <FieldError>{errors.lastName?.message}</FieldError>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <RequiredFieldLabel>Date of birth</RequiredFieldLabel>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field, fieldState }) => (
                <DatePickerInput
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                />
              )}
            />
            <FieldError>{errors.dateOfBirth?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Gender</FieldLabel>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  orientation="horizontal"
                  className="w-fit flex gap-6"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {Object.values(Gender).map((g) => (
                    <div key={g} className="flex items-center gap-2">
                      <RadioGroupItem value={g} id={g} />
                      <Label htmlFor={g}>{capitalize(g)}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            <FieldError>{errors.gender?.message}</FieldError>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <RequiredFieldLabel htmlFor="password">Password</RequiredFieldLabel>
            <Input
              id="password"
              type="password"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            <FieldError>{errors.password?.message}</FieldError>
          </Field>

          <Field>
            <RequiredFieldLabel htmlFor="passwordConfimation">
              Confim password
            </RequiredFieldLabel>
            <Input
              id="passwordConfimation"
              type="password"
              {...register("passwordConfirmation")}
              aria-invalid={!!errors.passwordConfirmation}
            />
            <FieldError>{errors.passwordConfirmation?.message}</FieldError>
          </Field>
        </div>

        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            Register
          </Button>

          <FieldDescription className="text-center">
            Already have an account?.&nbsp;
            <Link href="/auth/login">Log in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};
