import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RequiredFieldLabel } from "@/components/RequiredFieldLabel";
import {
  CreateProductVariantFormValues,
  createProductVariantSchema,
} from "../schemas";

interface ProductVariantFormProps {
  productId: string;
  onSubmit: (values: CreateProductVariantFormValues) => void;
}

export function ProductVariantForm({
  productId,
  onSubmit,
}: ProductVariantFormProps) {
  const form = useForm<CreateProductVariantFormValues>({
    resolver: zodResolver(createProductVariantSchema),
    defaultValues: {
      productId,
      name: "",
      sku: "",
      price: undefined,
      salePrice: null,
      costPrice: null,
      stockQuantity: undefined,
      lowStockThreshold: undefined,
      isDefault: false,
    },
    mode: "all",
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form
      id="product-variant-form"
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-6">
        <Field>
          <RequiredFieldLabel htmlFor="name">Name</RequiredFieldLabel>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>

        <Field>
          <RequiredFieldLabel htmlFor="sku">SKU</RequiredFieldLabel>
          <Input id="sku" {...register("sku")} aria-invalid={!!errors.sku} />
          <FieldError>{errors.sku?.message}</FieldError>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Field>
          <RequiredFieldLabel htmlFor="price">Price</RequiredFieldLabel>
          <Input
            id="price"
            {...register("price", { valueAsNumber: true })}
            aria-invalid={!!errors.price}
          />
          <FieldError>{errors.price?.message}</FieldError>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Field>
          <FieldLabel htmlFor="salePrice">Sale price</FieldLabel>
          <Input
            id="salePrice"
            {...register("salePrice", { valueAsNumber: true })}
            aria-invalid={!!errors.salePrice}
          />
          <FieldError>{errors.salePrice?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="costPrice">Cost price</FieldLabel>
          <Input
            id="costPrice"
            {...register("costPrice", { valueAsNumber: true })}
            aria-invalid={!!errors.costPrice}
          />
          <FieldError>{errors.costPrice?.message}</FieldError>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Field>
          <RequiredFieldLabel htmlFor="stockQuantity">
            Stock quantity
          </RequiredFieldLabel>
          <Input
            id="stockQuantity"
            {...register("stockQuantity", { valueAsNumber: true })}
            aria-invalid={!!errors.stockQuantity}
          />
          <FieldError>{errors.stockQuantity?.message}</FieldError>
        </Field>

        <Field>
          <RequiredFieldLabel htmlFor="lowStockThreshold">
            Low stock threshold
          </RequiredFieldLabel>
          <Input
            id="lowStockThreshold"
            {...register("lowStockThreshold", { valueAsNumber: true })}
            aria-invalid={!!errors.lowStockThreshold}
          />
          <FieldError>{errors.lowStockThreshold?.message}</FieldError>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-neutral-100 flex items-center justify-between p-4 gap-2 rounded-xl">
          <div>
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>

          <Field orientation="horizontal">
            <FieldLabel htmlFor="isDefault">Default variant</FieldLabel>
            <Controller
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </Field>
        </div>
      </div>
    </form>
  );
}
