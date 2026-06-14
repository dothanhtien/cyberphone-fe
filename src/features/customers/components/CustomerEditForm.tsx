"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { useUpdateCustomer } from "../mutations";
import { updateCustomerSchema, UpdateCustomerFormValues } from "../schemas";
import { Customer, UpdateCustomerRequest } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { RequiredFieldLabel } from "@/components/RequiredFieldLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerInput } from "@/components/pickers/DatePickerInput";
import { getDirtyValues, handleApiError } from "@/utils";
import { Gender } from "@/enums";

interface CustomerEditFormProps {
  customer: Customer;
}

function parseDateOfBirth(dob: string | null): Date | undefined {
  if (!dob) return undefined;
  const [y, m, d] = dob.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? undefined : date;
}

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function CustomerEditForm({ customer }: CustomerEditFormProps) {
  const updateMutation = useUpdateCustomer();

  const form = useForm<UpdateCustomerFormValues>({
    resolver: zodResolver(updateCustomerSchema),
    mode: "all",
    defaultValues: {
      email: customer.email,
      phone: customer.phone ?? "",
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: parseDateOfBirth(customer.dateOfBirth),
      gender: customer.gender ?? undefined,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
  } = form;

  useEffect(() => {
    reset({
      email: customer.email,
      phone: customer.phone ?? "",
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: parseDateOfBirth(customer.dateOfBirth),
      gender: customer.gender ?? undefined,
    });
  }, [customer, reset]);

  const isPending = updateMutation.isPending || isSubmitting;

  const onSubmit = (values: UpdateCustomerFormValues) => {
    const dirty = getDirtyValues(dirtyFields, values);
    if (!Object.keys(dirty).length) {
      toast.info("No changes to save");
      return;
    }

    const payload: UpdateCustomerRequest = {};
    if (dirty.email !== undefined) payload.email = dirty.email as string;
    if (dirty.phone !== undefined)
      payload.phone = (dirty.phone as string) || null;
    if (dirty.firstName !== undefined)
      payload.firstName = dirty.firstName as string;
    if (dirty.lastName !== undefined)
      payload.lastName = dirty.lastName as string;
    if (dirty.gender !== undefined)
      payload.gender = (dirty.gender as Gender | null) ?? null;
    if (dirty.dateOfBirth !== undefined) {
      const dob = dirty.dateOfBirth as Date | null | undefined;
      payload.dateOfBirth = dob ? toISODate(dob) : null;
    }

    updateMutation.mutate(
      { id: customer.id, data: payload },
      {
        onSuccess: () => toast.success("Customer updated successfully"),
        onError: (error) =>
          handleApiError(error, "An error occurred when updating customer"),
      },
    );
  };

  return (
    <form id="customer-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field>
            <RequiredFieldLabel>First Name</RequiredFieldLabel>
            <Input
              {...register("firstName")}
              placeholder="First name"
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <FieldError>{errors.firstName.message}</FieldError>
            )}
          </Field>

          <Field>
            <RequiredFieldLabel>Last Name</RequiredFieldLabel>
            <Input
              {...register("lastName")}
              placeholder="Last name"
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <FieldError>{errors.lastName.message}</FieldError>
            )}
          </Field>
        </div>

        <Field>
          <RequiredFieldLabel>Email</RequiredFieldLabel>
          <Input
            {...register("email")}
            placeholder="email@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Phone</FieldLabel>
          <Input
            {...register("phone")}
            placeholder="+84 xxx xxx xxx"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>Date of Birth</FieldLabel>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field }) => (
                <DatePickerInput
                  value={field.value ?? undefined}
                  onChange={field.onChange}
                  error={!!errors.dateOfBirth}
                />
              )}
            />
            {errors.dateOfBirth && (
              <FieldError>{errors.dateOfBirth.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Gender</FieldLabel>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select
                  value={field.value ?? ""}
                  onValueChange={(v) =>
                    field.onChange(v === "" ? null : (v as Gender))
                  }
                >
                  <SelectTrigger aria-invalid={!!errors.gender}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Gender.MALE}>Male</SelectItem>
                    <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                    <SelectItem value={Gender.OTHER}>Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && <FieldError>{errors.gender.message}</FieldError>}
          </Field>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save changes
              </>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
