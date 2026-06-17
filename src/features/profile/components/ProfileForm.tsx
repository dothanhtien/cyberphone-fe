"use client";

import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Undo2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { useUpdateProfile } from "../mutations";
import { updateProfileSchema, UpdateProfileFormValues } from "../schemas";
import { Profile, UpdateProfileRequest } from "../types";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DatePickerInput } from "@/components/pickers/DatePickerInput";
import { RequiredFieldLabel } from "@/components/RequiredFieldLabel";
import { Gender } from "@/enums";
import { ApiError } from "@/types";
import {
  getDirtyValues,
  handleApiError,
  parseDateOfBirth,
  toISODate,
} from "@/utils";

interface ProfileFormProps {
  profile: Profile;
  isEditing: boolean;
  onEditingChange: (isEditing: boolean) => void;
}

function buildFormValues(profile: Profile) {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone ?? "",
    dateOfBirth: parseDateOfBirth(profile.dateOfBirth),
    gender: profile.gender ?? undefined,
  };
}

export function ProfileForm({
  profile,
  isEditing,
  onEditingChange,
}: ProfileFormProps) {
  const updateMutation = useUpdateProfile();

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    mode: "all",
    defaultValues: buildFormValues(profile),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, dirtyFields, isDirty, isValid, isSubmitting },
  } = form;

  const [newPassword, newPasswordConfirmation] = useWatch({
    control,
    name: ["newPassword", "newPasswordConfirmation"],
  });
  const showCurrentPassword = !!(newPassword || newPasswordConfirmation);

  useEffect(() => {
    if (!isDirty) {
      reset(buildFormValues(profile));
    }
  }, [profile, reset, isDirty]);

  const isPending = updateMutation.isPending || isSubmitting;

  const handleCancel = () => {
    reset();
    onEditingChange(false);
  };

  const onSubmit = (values: UpdateProfileFormValues) => {
    const dirty = getDirtyValues(dirtyFields, values);
    if (!Object.keys(dirty).length) {
      onEditingChange(false);
      return;
    }

    const payload: UpdateProfileRequest = {};
    if (dirty.firstName !== undefined) payload.firstName = dirty.firstName;
    if (dirty.lastName !== undefined) payload.lastName = dirty.lastName;
    if (dirty.email !== undefined) payload.email = dirty.email;
    if (dirty.phone !== undefined) payload.phone = dirty.phone || null;
    if (dirty.gender !== undefined) payload.gender = dirty.gender ?? null;
    if (dirty.dateOfBirth !== undefined) {
      payload.dateOfBirth = dirty.dateOfBirth
        ? toISODate(dirty.dateOfBirth)
        : null;
    }
    if (dirty.newPassword) {
      payload.currentPassword = dirty.currentPassword;
      payload.newPassword = dirty.newPassword;
      payload.newPasswordConfirmation = dirty.newPasswordConfirmation;
    }

    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        reset();
        onEditingChange(false);
      },
      onError: (error) => {
        if (axios.isAxiosError<ApiError>(error)) {
          if (error.response?.status === 409) {
            const msg = error.response.data?.message ?? "";
            if (msg.toLowerCase().includes("phone")) {
              setError("phone", { message: "Phone number is already in use" });
            } else {
              setError("email", { message: "Email is already in use" });
            }
            return;
          }
          if (error.response?.status === 400) {
            handleApiError(error, "Validation failed");
            return;
          }
        }
        handleApiError(error, "An error occurred when updating profile");
      },
    });
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">First Name</p>
            <p className="font-medium">{profile.firstName}</p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Last Name</p>
            <p className="font-medium">{profile.lastName}</p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Phone</p>
            <p className="font-medium">{profile.phone ?? "—"}</p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Date of Birth</p>
            <p className="font-medium">{profile.dateOfBirth ?? "—"}</p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Gender</p>
            <p className="font-medium capitalize">{profile.gender ?? "—"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

        <Separator />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>New Password</FieldLabel>
            <Input
              {...register("newPassword")}
              type="password"
              placeholder="Enter new password"
              aria-invalid={!!errors.newPassword}
            />
            {errors.newPassword && (
              <FieldError>{errors.newPassword.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Confirm New Password</FieldLabel>
            <Input
              {...register("newPasswordConfirmation")}
              type="password"
              placeholder="Confirm new password"
              aria-invalid={!!errors.newPasswordConfirmation}
            />
            {errors.newPasswordConfirmation && (
              <FieldError>{errors.newPasswordConfirmation.message}</FieldError>
            )}
          </Field>

          {showCurrentPassword && (
            <Field>
              <FieldLabel>Current Password</FieldLabel>
              <Input
                {...register("currentPassword")}
                type="password"
                placeholder="Enter current password to confirm changes"
                aria-invalid={!!errors.currentPassword}
              />
              <p className="text-muted-foreground text-xs">
                Your current password is required to update your password.
              </p>
              {errors.currentPassword && (
                <FieldError>{errors.currentPassword.message}</FieldError>
              )}
            </Field>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCancel}
            disabled={isPending}
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={isPending || !isDirty || !isValid}
          >
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
