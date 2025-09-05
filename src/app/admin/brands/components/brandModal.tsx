"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control, FieldValues, Path } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { apiService } from "@/lib/api";
import { Brand } from "@/app/interfaces";

const optionalUrl = z
  .string()
  .url({ message: "Must be a valid URL" })
  .max(512, { message: "URL must be at most 512 characters" })
  .or(z.literal(""))
  .transform((val) => (val === "" ? undefined : val))
  .optional();

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Max 255 characters"),
  slug: z.string().min(1, "Slug is required").max(255, "Max 255 characters"),
  description: z
    .string()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  websiteUrl: optionalUrl,
  logoUrl: optionalUrl,
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  slug: "",
  description: undefined,
  logoUrl: undefined,
  websiteUrl: undefined,
};

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
}

function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface FormTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
}: FormTextareaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface BrandModalProps {
  action: "create" | "edit";
  data: Brand | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function BrandModal({
  action,
  open,
  data,
  onOpenChange,
  onSuccess,
}: BrandModalProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(
        data
          ? (Object.fromEntries(
              Object.entries(data).map(([k, v]) => [k, v ?? undefined])
            ) as FormSchema)
          : defaultValues
      );
    }
  }, [open, data, form]);

  const onSubmit = async (values: FormSchema) => {
    try {
      if (action === "edit" && !data?.id) {
        throw new Error("Missing brand ID for edit");
      }

      setLoading(true);

      const request =
        action === "create"
          ? apiService.brands.createBrand(values)
          : apiService.brands.updateBrand(data!.id, values);

      await request;

      toast.success(
        `Brand ${action === "create" ? "created" : "updated"} successfully`
      );
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      let errorMessage = `Failed to ${
        action === "create" ? "create" : "update"
      } brand`;
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message ?? errorMessage;
      }
      console.error(errorMessage, err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[600px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle>
                {action === "create" ? "Add new brand" : "Edit brand"}
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>

            <div className="grid gap-4 mb-4">
              <FormInput control={form.control} name="name" label="Name" />
              <FormInput control={form.control} name="slug" label="Slug" />
              <FormTextarea
                control={form.control}
                name="description"
                label="Description"
              />
              <FormInput
                control={form.control}
                name="logoUrl"
                label="Logo URL"
              />
              <FormInput
                control={form.control}
                name="websiteUrl"
                label="Website"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? action === "create"
                    ? "Creating..."
                    : "Saving..."
                  : action === "create"
                  ? "Create"
                  : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
