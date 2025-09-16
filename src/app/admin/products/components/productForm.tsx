"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Control, FieldValues, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { BadgeCheck, LayoutGrid } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import SelectCategoryDialog from "./selectCategoryDialog";
import SelectBrandDialog from "./selectBrandDialog";
import { Brand, Category, Product } from "@/interfaces";
import { apiService } from "@/lib/api";

const emptyToUndefined = z
  .string()
  .transform((val) => (val.trim() === "" ? undefined : val))
  .optional();

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  shortDescription: emptyToUndefined,
  description: emptyToUndefined,
  brandId: z.string().min(1, "Brand is required"),
  categoryId: z.string().min(1, "Category is required"),
  isFeatured: z.boolean().optional(),
  metaTitle: emptyToUndefined,
  metaDescription: emptyToUndefined,
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  slug: "",
  shortDescription: undefined,
  description: undefined,
  brandId: "",
  categoryId: "",
  isFeatured: false,
  metaTitle: undefined,
  metaDescription: undefined,
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

interface ProductFormProps {
  action?: "create" | "update";
  data?: Product | null;
}

export default function ProductForm({
  action = "create",
  data,
}: ProductFormProps) {
  const [brandModal, setBrandModal] = useState<{
    open: boolean;
    brand: Brand | null;
  }>({ open: false, brand: null });
  const [categoryModal, setCategoryModal] = useState<{
    open: boolean;
    category: Category | null;
  }>({ open: false, category: null });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!data) return;
    form.reset(
      Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, v ?? undefined])
      ) as FormSchema
    );
  }, [data, form]);

  const onSubmit = async (values: FormSchema) => {
    try {
      const op =
        action === "update" && data
          ? () => apiService.products.updateProduct(data.id, values)
          : () => apiService.products.createProduct(values);

      await op();
      toast.success(
        `Product ${action === "create" ? "created" : "updated"} successfully`
      );
      if (action === "create") {
        form.reset(defaultValues);
      }
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ?? "Request failed"
          : "Failed to save product";

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

            <div>
              <Button
                type="button"
                variant="outline"
                className={errors.brandId ? "border-red-500 text-red-500" : ""}
                onClick={() =>
                  setBrandModal((prevValue) => ({
                    ...prevValue,
                    open: true,
                  }))
                }
              >
                <BadgeCheck />
                {brandModal.brand
                  ? `Selected brand: ${brandModal.brand.name}`
                  : "Select brand"}
              </Button>

              {errors.brandId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.brandId.message}
                </p>
              )}

              <SelectBrandDialog
                open={brandModal.open}
                onOpenChange={(isOpen) =>
                  !isOpen &&
                  setBrandModal((prevValue) => ({
                    ...prevValue,
                    open: false,
                  }))
                }
                onSelect={(brand) => {
                  form.setValue("brandId", brand.id, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  setBrandModal({ open: false, brand: brand });
                }}
              />
            </div>

            <div>
              <Button
                type="button"
                variant="outline"
                className={
                  errors.categoryId ? "border-red-500 text-red-500" : ""
                }
                onClick={() =>
                  setCategoryModal((prevValue) => ({
                    ...prevValue,
                    open: true,
                  }))
                }
              >
                <LayoutGrid />{" "}
                {categoryModal.category
                  ? `Selected category: ${categoryModal.category.name}`
                  : "Select category"}
              </Button>

              {errors.categoryId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.categoryId.message}
                </p>
              )}

              <SelectCategoryDialog
                open={categoryModal.open}
                onOpenChange={(isOpen) =>
                  !isOpen &&
                  setCategoryModal((prevValue) => ({
                    ...prevValue,
                    open: false,
                  }))
                }
                onSelect={(category) => {
                  form.setValue("categoryId", category.id, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  setCategoryModal({ open: false, category: category });
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!m-0">Featured</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormFieldWrapper
              control={form.control}
              name="shortDescription"
              label="Short description"
              type="textarea"
            />
            <FormFieldWrapper
              control={form.control}
              name="description"
              label="Description"
              type="textarea"
            />
            <FormFieldWrapper
              control={form.control}
              name="metaTitle"
              label="Meta title"
              type="textarea"
            />
            <FormFieldWrapper
              control={form.control}
              name="metaDescription"
              label="Meta description"
              type="textarea"
            />

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
    </>
  );
}
