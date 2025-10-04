"use client";

import { useEffect } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { RequiredLabel } from "@/components/requiredLabel";
import { apiService } from "@/lib/api";
import { ProductVariant } from "@/interfaces";

const variantSchema = z
  .object({
    productId: z.string(),
    sku: z
      .string()
      .min(1, "SKU is required")
      .max(100, "SKU exceeds 100 characters"),
    name: z
      .string()
      .min(1, "Name is required")
      .max(255, "Name exceeds 255 characters"),
    slug: z
      .string()
      .min(1, "Slug is required")
      .max(255, "Slug exceeds 255 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must be lowercase and use - instead of spaces"
      ),
    basePrice: z
      .number("Base price is required")
      .positive("Base price must be greater than 0"),
    salePrice: z
      .number()
      .nonnegative("Sale price cannot be negative")
      .optional(),
    costPrice: z
      .number("Cost proce is required")
      .positive("Cost price must be greater than 0"),
    weightKg: z.number().nonnegative("Weight cannot be negative").optional(),
    stockQuantity: z
      .number()
      .nonnegative("Stock cannot be negative")
      .optional(),
    lowStockThreshold: z
      .number()
      .nonnegative("Low threshold cannot be negative")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.salePrice !== undefined && data.basePrice !== undefined) {
        return data.salePrice <= data.basePrice;
      }
      return true;
    },
    {
      path: ["salePrice"],
      message: "Sale price cannot be higher than base price",
    }
  );

export type VariantForm = z.infer<typeof variantSchema>;

export const defaultValues: DefaultValues<VariantForm> = {
  productId: "",
  sku: "",
  name: "",
  slug: "",
  basePrice: undefined,
  salePrice: undefined,
  costPrice: undefined,
  weightKg: undefined,
  stockQuantity: undefined,
  lowStockThreshold: undefined,
};

interface ProductVariantDialogProps {
  open: boolean;
  productId: string;
  variant: ProductVariant | null;
  action?: "create" | "update";
  onOpenChange: (open: boolean) => void;
  onSuccess: (productVariant: ProductVariant) => void;
}

export function ProductVariantDialog({
  action = "create",
  open,
  productId,
  variant,
  onOpenChange,
  onSuccess,
}: ProductVariantDialogProps) {
  const form = useForm<VariantForm>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      ...defaultValues,
      productId,
    },
  });

  useEffect(() => {
    const resetValue =
      open && variant ? variant : { ...defaultValues, productId };
    form.reset(resetValue);
  }, [open, variant, form, productId]);

  const onSubmit = async (values: z.infer<typeof variantSchema>) => {
    try {
      const response = await apiService.productVariants.create(values);
      toast.success(`Product variant created successfully`);
      onSuccess(response.data);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message ?? "Request failed"
          : "Failed to save product variant";

      console.error(errorMessage, error);
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="mb-3">
                {action === "create" ? "Add new" : "Update"} variant
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 mb-4">
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

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel>SKU</RequiredLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h3 className="text-lg font-medium mb-2">Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel>Cost price</RequiredLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="basePrice"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel>Base price</RequiredLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Inventory</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <FormField
                    control={form.control}
                    name="weightKg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stockQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lowStockThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Low stock threshold</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
