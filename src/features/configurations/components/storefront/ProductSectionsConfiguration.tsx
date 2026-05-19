"use client";

import { Save } from "lucide-react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import type { DragEndEvent } from "@dnd-kit/react";
import { isSortableOperation } from "@dnd-kit/react/sortable";

import {
  type ProductSectionField,
  ProductSectionCard,
} from "./ProductSectionCard";
import { CategorySelectorList } from "./CategorySelectorList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCategories } from "@/features/categories/queries";
import { useStorefrontConfigurations } from "@/features/configurations/queries";
import { useSyncStorefrontConfigurations } from "@/features/configurations/mutations";
import { StorefrontConfigurationSection } from "@/features/configurations/enums";
import type { StorefrontProductSection } from "@/features/configurations/types";

interface ProductSectionsFormValues {
  categories: ProductSectionField[];
}

export function ProductSectionsConfiguration() {
  const { data: categoriesData } = useCategories({ limit: 100 });
  const { data: productSectionsData } =
    useStorefrontConfigurations<StorefrontProductSection>(
      StorefrontConfigurationSection.PRODUCT_SECTIONS,
    );
  const { mutate: syncProductSections } = useSyncStorefrontConfigurations();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<ProductSectionsFormValues>({
    defaultValues: { categories: [] },
  });

  useEffect(() => {
    if (productSectionsData?.length && !isDirty) {
      reset({
        categories: productSectionsData
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((s) => ({
            categoryId: s.categoryId ?? "",
            categoryName: s.categoryName ?? "",
            title: s.title ?? s.categoryName ?? "",
            enabled: s.enabled,
            displayOrder: s.displayOrder,
          })),
      });
    }
  }, [productSectionsData, reset, isDirty]);

  const { fields, append, move, update } = useFieldArray({
    control,
    name: "categories",
  });

  const watchedCategories = useWatch({
    control,
    name: "categories",
    defaultValue: [],
  });
  const activeIds = new Set(
    watchedCategories.filter((c) => !c.deleted).map((c) => c.categoryId),
  );
  const availableCategories =
    categoriesData?.items?.filter((c) => !activeIds.has(c.id)) ?? [];

  const handleAdd = (category: { value: string; label: string }) => {
    append({
      categoryId: category.value,
      categoryName: category.label,
      title: category.label,
      enabled: true,
      displayOrder: 0,
    });
  };

  const handleRemove = (index: number) =>
    update(index, { ...watchedCategories[index], deleted: true });

  const handleDragEnd = (event: DragEndEvent) => {
    if (!isSortableOperation(event.operation)) return;
    const { source } = event.operation;
    if (!source || source.initialIndex === source.index) return;
    move(source.initialIndex, source.index);
  };

  const onSubmit = (data: ProductSectionsFormValues) => {
    let displayOrder = 0;
    syncProductSections(
      {
        items: data.categories.map((c) => ({
          categoryId: c.categoryId,
          title: c.title,
          displayOrder: c.deleted ? c.displayOrder : displayOrder++,
          enabled: c.enabled,
          type: StorefrontConfigurationSection.PRODUCT_SECTIONS,
          isDeleted: c.deleted,
        })),
      },
      {
        onSuccess: () => toast.success("Product sections saved."),
        onError: () => toast.error("Failed to save product sections."),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>New Products</CardTitle>
          <CardDescription>
            Always shown on the storefront — highlights newly added products.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Featured Products</CardTitle>
          <CardDescription>
            Always shown on the storefront — highlights featured products.
          </CardDescription>
        </CardHeader>
      </Card>

      <CategorySelectorList
        description="Add categories to display as sections on the storefront and set their display order."
        availableCategories={availableCategories}
        fields={fields}
        onAdd={handleAdd}
        onDragEnd={handleDragEnd}
        renderItem={(fieldId, index) => {
          if (watchedCategories[index]?.deleted) return null;
          return (
            <Controller
              key={fieldId}
              control={control}
              name={`categories.${index}`}
              render={({ field: { value, onChange } }) => (
                <ProductSectionCard
                  fieldId={fieldId}
                  index={index}
                  value={value}
                  onChange={onChange}
                  onRemove={() => handleRemove(index)}
                />
              )}
            />
          );
        }}
      />

      <Button type="submit">
        <Save className="h-4 w-4" />
        Save
      </Button>
    </form>
  );
}
