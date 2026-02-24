import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RequiredFieldLabel } from "@/components/RequiredFieldLabel";
import { ProductVariantFormValues, productVariantSchema } from "../schemas";
import { ProductVariant } from "../types";

interface ProductVariantFormProps {
  variant: ProductVariant | null;
  onSubmit: (values: ProductVariantFormValues) => void;
}

export function ProductVariantForm({
  variant,
  onSubmit,
}: ProductVariantFormProps) {
  const form = useForm({
    resolver: zodResolver(productVariantSchema),
    defaultValues: {
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
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (variant) {
      reset({
        name: variant.name,
        sku: variant.sku,
        price: variant.price,
        salePrice: variant.salePrice ?? null,
        costPrice: variant.costPrice ?? null,
        stockQuantity: variant.stockQuantity,
        lowStockThreshold: variant.lowStockThreshold,
        isDefault: variant.isDefault,
      });
    }
  }, [variant, reset]);

  return (
    <form
      id="product-variant-form"
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
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
            type="number"
            {...register("price", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
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
            type="number"
            {...register("salePrice", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            aria-invalid={!!errors.salePrice}
          />
          <FieldError>{errors.salePrice?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="costPrice">Cost price</FieldLabel>
          <Input
            id="costPrice"
            type="number"
            {...register("costPrice", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
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
            type="number"
            {...register("stockQuantity", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
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
            type="number"
            {...register("lowStockThreshold", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
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
              control={control}
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
