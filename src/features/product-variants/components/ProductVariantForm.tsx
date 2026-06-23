import {
  CircleDollarSign,
  ImageIcon,
  Package,
  SlidersVertical,
  Star,
  Tag,
} from "lucide-react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductImagesManager } from "@/features/products/components/product-images-manager";
import { ProductVariantFormValues, productVariantSchema } from "../schemas";
import { ProductVariant } from "../types";
import { RequiredFieldLabel } from "@/components/RequiredFieldLabel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProductImageType } from "@/features/products/enums";
import { ProductAttribute } from "@/features/products/types";
import { getDirtyValues, formatCurrency, parseCurrency } from "@/utils";
import { buildImagePayload } from "@/features/products/components/product-images-manager/utils";

interface ProductVariantFormProps {
  variant: ProductVariant | null;
  attributes: ProductAttribute[];
  onSubmit: (values: Partial<ProductVariantFormValues>) => void;
}

export function ProductVariantForm({
  variant,
  attributes,
  onSubmit,
}: ProductVariantFormProps) {
  const form = useForm({
    resolver: zodResolver(productVariantSchema),
    defaultValues: {
      name: "",
      sku: "",
      isDefault: false,
      attributes: [],
      gallery: [],
      images: [],
      imageMetas: [],
    },
    mode: "all",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = form;

  const { fields: attributeFields } = useFieldArray({
    control,
    name: "attributes",
  });

  useEffect(() => {
    reset(
      variant
        ? {
            name: variant.name,
            sku: variant.sku,
            price: Number(variant.price),
            salePrice: variant.salePrice ? Number(variant.salePrice) : null,
            costPrice: variant.costPrice ? Number(variant.costPrice) : null,
            stockQuantity: variant.stockQuantity,
            lowStockThreshold: variant.lowStockThreshold,
            isDefault: variant.isDefault,
            gallery: [...(variant.images ?? [])]
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((img) => ({
                id: img.id,
                preview: img.url,
                url: img.url,
                file: undefined,
                isMain: img.imageType === ProductImageType.MAIN,
                altText: img.altText ?? "",
              })),
            images: [],
            imageMetas: [],
            attributes: (attributes || [])
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((attr) => {
                const foundAttr = variant.attributes.find(
                  (va) => va.productAttributeId === attr.id,
                );

                return {
                  id: foundAttr?.id,
                  productAttributeId: attr.id,
                  attributeValue: foundAttr?.attributeValue ?? "",
                  attributeValueDisplay: foundAttr?.attributeValueDisplay ?? "",
                };
              }),
          }
        : {
            name: "",
            sku: "",
            isDefault: false,
            attributes: attributes
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((attr) => ({
                productAttributeId: attr.id,
                attributeValue: "",
                attributeValueDisplay: "",
              })),
            gallery: [],
            images: [],
            imageMetas: [],
          },
    );
  }, [variant, reset, attributes]);

  const handleFormSubmit = (values: ProductVariantFormValues) => {
    const galleryDirty = !!dirtyFields.gallery;

    const { images, imageMetas } = galleryDirty
      ? buildImagePayload(values.gallery || [])
      : { images: [], imageMetas: [] };

    const { gallery: _, ...rest } = values;

    if (variant) {
      const dirtyValues = getDirtyValues<ProductVariantFormValues>(
        dirtyFields as Partial<Record<keyof ProductVariantFormValues, unknown>>,
        rest,
      );

      if (galleryDirty) {
        dirtyValues.images = images;
        dirtyValues.imageMetas = imageMetas;
      }

      if (!Object.keys(dirtyValues).length) {
        toast.info("No changes to save");
        return;
      }
      onSubmit(dirtyValues);
    } else {
      onSubmit({ ...rest, images, imageMetas });
    }
  };

  return (
    <form
      id="product-variant-form"
      className="space-y-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag size={16} /> General
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field>
              <RequiredFieldLabel htmlFor="name">Name</RequiredFieldLabel>
              <Input
                id="name"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            <Field>
              <RequiredFieldLabel htmlFor="sku">SKU</RequiredFieldLabel>
              <Input
                id="sku"
                {...register("sku")}
                aria-invalid={!!errors.sku}
              />
              <FieldError>{errors.sku?.message}</FieldError>
            </Field>
          </div>

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
                    id="isDefault"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign size={16} /> Pricing
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field>
              <RequiredFieldLabel htmlFor="price">Price</RequiredFieldLabel>
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <Input
                    id="price"
                    type="text"
                    value={formatCurrency(field.value ?? "")}
                    onChange={(e) => {
                      const parsed = parseCurrency(e.target.value);
                      field.onChange(parsed);
                    }}
                    onBlur={(e) => {
                      const parsed = parseCurrency(e.target.value);
                      field.onChange(parsed);
                      field.onBlur();
                    }}
                    aria-invalid={!!errors.price}
                  />
                )}
              />
              <FieldError>{errors.price?.message}</FieldError>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="salePrice">Sale price</FieldLabel>
              <Controller
                control={control}
                name="salePrice"
                render={({ field }) => (
                  <Input
                    id="salePrice"
                    type="text"
                    value={formatCurrency(field.value ?? "")}
                    onChange={(e) => {
                      const parsed = parseCurrency(e.target.value);
                      field.onChange(parsed);
                    }}
                    onBlur={(e) => {
                      const parsed = parseCurrency(e.target.value);
                      field.onChange(parsed);
                      field.onBlur();
                    }}
                    aria-invalid={!!errors.salePrice}
                  />
                )}
              />
              <FieldError>{errors.salePrice?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="costPrice">Cost price</FieldLabel>
              <Controller
                control={control}
                name="costPrice"
                render={({ field }) => (
                  <Input
                    id="costPrice"
                    type="text"
                    value={formatCurrency(field.value ?? "")}
                    onChange={(e) => {
                      const parsed = parseCurrency(e.target.value);
                      field.onChange(parsed);
                    }}
                    onBlur={(e) => {
                      const parsed = parseCurrency(e.target.value);
                      field.onChange(parsed);
                      field.onBlur();
                    }}
                    aria-invalid={!!errors.costPrice}
                  />
                )}
              />
              <FieldError>{errors.costPrice?.message}</FieldError>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package size={16} /> Inventory
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon size={16} /> Variant images
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Controller
            control={control}
            name="gallery"
            defaultValue={[]}
            render={({ field }) => (
              <ProductImagesManager
                value={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        </CardContent>
      </Card>

      {!!attributes.length && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersVertical size={16} /> Attributes
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {attributeFields.map((field, index) => {
                const attrMeta = attributes.find(
                  (a) => a.id === field.productAttributeId,
                );

                return (
                  <div key={field.id}>
                    <div className="font-medium mb-3">
                      <span className="mr-1">
                        {attrMeta?.attributeKeyDisplay}
                      </span>
                      <span className="text-destructive">*</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-neutral-100 p-4 rounded-2xl">
                      <Field>
                        <RequiredFieldLabel>Value</RequiredFieldLabel>

                        <Input
                          {...register(`attributes.${index}.attributeValue`)}
                          className="bg-white"
                          aria-invalid={
                            !!errors.attributes?.[index]?.attributeValue
                          }
                        />

                        <FieldError>
                          {errors.attributes?.[index]?.attributeValue?.message}
                        </FieldError>
                      </Field>

                      <Field>
                        <FieldLabel>Display value</FieldLabel>

                        <Input
                          {...register(
                            `attributes.${index}.attributeValueDisplay`,
                          )}
                          className="bg-white"
                        />
                      </Field>
                    </div>

                    <Input
                      type="hidden"
                      {...register(`attributes.${index}.productAttributeId`)}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
