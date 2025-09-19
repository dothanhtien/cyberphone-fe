"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Control, FieldValues, Path, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as LinkIcon } from "lucide-react";
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
import SelectParentCategoryDialog from "./selectParentCategoryDialog";
import { apiService } from "@/lib/api";
import { Category } from "@/interfaces";
import { UploadLogo } from "./uploadLogo";

const emptyToUndefined = z
  .string()
  .transform((val) => (val?.trim() === "" ? undefined : val))
  .optional();

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  description: emptyToUndefined,
  logo: z.any().optional(),
  removeLogo: z.boolean().optional(),
  parentId: emptyToUndefined,
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  slug: "",
  description: "",
  logo: undefined,
  removeLogo: undefined,
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
      const op =
        action === "update" && data
          ? () => apiService.categories.updateCategory(data.id, values)
          : () => apiService.categories.createCategory(values);

      await op();

      toast.success(
        `Category ${action === "create" ? "created" : "updated"} successfully`
      );

      if (action === "create") {
        form.reset(defaultValues);
        setParentCategory(null);
      }
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

            <FormField
              control={form.control}
              name="logo"
              render={() => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <UploadLogo initialUrl={data?.logoUrl ?? null} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(true)}
              >
                <LinkIcon /> Assign parent category
              </Button>

              {parentCategory && (
                <div className="mt-3">
                  Parent category: {parentCategory.name}
                </div>
              )}
            </div>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? action === "create"
                  ? "Creating..."
                  : "Updating..."
                : action === "create"
                ? "Create"
                : "Update"}
            </Button>
          </form>
        </Form>
      </div>

      <SelectParentCategoryDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSelect={(category) => {
          setModalOpen(false);
          if (category && data && category.id === data.id) {
            toast.error("A category cannot be its own parent");
            return;
          }
          form.setValue("parentId", category?.id, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setParentCategory(category ?? null);
        }}
      />
    </>
  );
}
