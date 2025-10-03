"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { RequiredLabel } from "@/components/requiredLabel";
import { SelectBrandDialog } from "./selectBrandDialog";
import { SelectCategoryDialog } from "./selectCategoryDialog";
import { Brand, Category, Product } from "@/interfaces";
import { apiService } from "@/lib/api";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCurrentProduct } from "@/lib/store/features/products/productsSlice";

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

export type ProductForm = z.infer<typeof formSchema>;

const defaultValues: ProductForm = {
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

interface ProductFormProps {
  action?: "create" | "update";
  product?: Product;
}

export function ProductForm({ action, product }: ProductFormProps) {
  const [brandModal, setBrandModal] = useState<{
    open: boolean;
    brand: Brand | null;
  }>({ open: false, brand: null });
  const [categoryModal, setCategoryModal] = useState<{
    open: boolean;
    category: Category | null;
  }>({ open: false, category: null });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<ProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    if (!product) return;
    form.reset(
      Object.fromEntries(
        Object.entries(product).map(([k, v]) => [k, v ?? undefined])
      ) as ProductForm
    );

    if (product.brand) {
      setBrandModal((prevValue) => ({
        ...prevValue,
        brand: product.brand || null,
      }));
    }

    if (product.category) {
      setCategoryModal((prevValue) => ({
        ...prevValue,
        category: product.category || null,
      }));
    }
  }, [product, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const op =
        action === "update" && product
          ? () => apiService.products.updateProduct(product.id, values)
          : () => apiService.products.createProduct(values);
      const result = await op();

      toast.success(
        `Product ${action === "create" ? "created" : "updated"} successfully`
      );

      if (action === "create") {
        form.reset(defaultValues);
        setBrandModal((prevValue) => ({ ...prevValue, brand: null }));
        setCategoryModal((prevValue) => ({ ...prevValue, category: null }));
        dispatch(setCurrentProduct(result.data));
        router.push(`/admin/products/${result.data.id}/edit`);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>Name</RequiredLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>Slug</RequiredLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <RequiredLabel className="mb-2">Brand</RequiredLabel>
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
                <BadgeCheck
                  className={brandModal.brand ? "text-green-500" : ""}
                />
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
                  setValue("brandId", brand.id, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  setBrandModal({ open: false, brand: brand });
                }}
              />
            </div>

            <div>
              <RequiredLabel className="mb-2">Category</RequiredLabel>
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
                <LayoutGrid
                  className={categoryModal.category ? "text-green-500" : ""}
                />
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
                  setValue("categoryId", category.id, {
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
                      checked={!!field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                  </FormControl>
                  <FormLabel className="!m-0">Featured</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta title</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {action === "create" && (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
          )}
          {action === "update" && (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Updating..." : "Update"}
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}
