"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Plus, Trash2 } from "lucide-react";

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

const variantSchema = z
  .object({
    sku: z
      .string()
      .min(1, "SKU is required")
      .max(50, "SKU must be less than 50 characters"),
    name: z.string().min(1, "Name is required"),
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must be lowercase and use - instead of spaces"
      ),
    basePrice: z
      .number()
      .positive("Base price must be greater than 0")
      .nonnegative("Base price cannot be negative"),
    salePrice: z
      .number()
      .positive("Sale price must be greater than 0")
      .nonnegative("Sale price cannot be negative"),
    costPrice: z
      .number()
      .positive("Cost price must be greater than 0")
      .nonnegative("Cost price cannot be negative"),
    weightKg: z
      .number()
      .positive("Weight must be greater than 0")
      .nonnegative("Weight cannot be negative"),
    stockQuantity: z
      .number()
      .positive("Stock must be greater than 0")
      .nonnegative("Stock cannot be negative"),
    lowStockThreshold: z
      .number()
      .positive("Threshold must be greater than 0")
      .nonnegative("Threshold cannot be negative"),
  })
  .refine((data) => data.salePrice <= data.basePrice, {
    path: ["salePrice"],
    message: "Sale price cannot be higher than base price",
  });

const variantsSchema = z.object({
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

export type VariantForm = z.infer<typeof variantsSchema>;

export const defaultValues = {
  sku: "",
  name: "",
  slug: "",
  basePrice: 0,
  salePrice: 0,
  costPrice: 0,
  weightKg: 0,
  stockQuantity: 0,
  lowStockThreshold: 0,
};

export default function ProductVariantsForm() {
  const form = useForm<VariantForm>({
    resolver: zodResolver(variantsSchema),
    defaultValues: {
      variants: [defaultValues],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const onSubmit = (values: VariantForm) => {
    console.log("Form submitted:", values);
  };

  return (
    <>
      <div className="max-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-xl p-6 space-y-6 relative mb-6"
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold">Variant #{index + 1}</div>

                  <Button
                    type="button"
                    variant={null}
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`variants.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.slug`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.sku`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
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
                      name={`variants.${index}.basePrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base price</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`variants.${index}.salePrice`}
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

                    <FormField
                      control={form.control}
                      name={`variants.${index}.costPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost price</FormLabel>
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
                      name={`variants.${index}.weightKg`}
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
                      name={`variants.${index}.stockQuantity`}
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
                      name={`variants.${index}.lowStockThreshold`}
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
            ))}

            <div className="flex justify-start">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    sku: "",
                    name: "",
                    slug: "",
                    basePrice: 0,
                    salePrice: 0,
                    costPrice: 0,
                    weightKg: 0,
                    stockQuantity: 0,
                    lowStockThreshold: 0,
                  })
                }
              >
                <Plus /> Add variant
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
