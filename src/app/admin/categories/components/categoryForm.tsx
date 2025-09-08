"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Control, FieldValues, Path, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectParentCategoryDialog } from "./selectParentCategoryDialog";
import { apiService } from "@/lib/api";
import { Category } from "@/interfaces";

const emptyToUndefined = z
  .string()
  .transform((val) => (val.trim() === "" ? undefined : val))
  .optional();

const optionalUrl = z
  .string()
  .url({ message: "Must be a valid URL" })
  .max(512, { message: "URL must be at most 512 characters" })
  .or(z.literal(""))
  .transform((val) => (val === "" ? undefined : val))
  .optional();

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  description: emptyToUndefined,
  logoUrl: optionalUrl,
  parentId: emptyToUndefined,
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  slug: "",
  description: undefined,
  logoUrl: undefined,
  parentId: undefined,
};

interface FormFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: "text" | "textarea" | "url";
}

function FormFieldWrapper<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
}: FormFieldWrapperProps<T>) {
  const Component = type === "textarea" ? Textarea : Input;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Component
              {...field}
              type={type !== "textarea" ? type : undefined}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface CategoryFormProps {
  action?: "create" | "update";
  data?: Category | null;
}

export function CategoryForm({ action = "create", data }: CategoryFormProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [parentCategory, setParentCategory] = useState<Category | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!data) return;
    form.reset(
      Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, v ?? undefined])
      ) as FormSchema
    );
    setParentCategory(data.parent ?? null);
  }, [data, form]);

  const onSubmit = async (values: FormSchema) => {
    try {
      const op = data
        ? () => apiService.categories.updateCategory(data.id, values)
        : () => apiService.categories.createCategory(values);

      await op();
      toast.success(
        `Category ${action === "create" ? "created" : "updated"} successfully`
      );
      if (action === "create") form.reset();
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ?? "Request failed"
          : "Failed to save category";

      console.error(errorMessage, err);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="max-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormFieldWrapper control={form.control} name="name" label="Name" />
            <FormFieldWrapper control={form.control} name="slug" label="Slug" />
            <FormFieldWrapper
              control={form.control}
              name="description"
              label="Description"
              type="textarea"
            />
            <FormFieldWrapper
              control={form.control}
              name="logoUrl"
              label="Logo URL"
              type="url"
            />

            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(true)}
              >
                <Link /> Assign parent category
              </Button>

              {parentCategory && (
                <div className="mt-3">
                  Parent category: {parentCategory.name}
                </div>
              )}
            </div>

            <Button type="submit">
              {action === "create" ? "Create" : "Update"}
            </Button>
          </form>
        </Form>
      </div>

      <SelectParentCategoryDialog
        open={modalOpen}
        onOpenChange={(isOpen) => !isOpen && setModalOpen(false)}
        onSelect={(category) => {
          setModalOpen(false);
          form.setValue("parentId", category?.id);
          setParentCategory(category ?? null);
        }}
      />
    </>
  );
}
