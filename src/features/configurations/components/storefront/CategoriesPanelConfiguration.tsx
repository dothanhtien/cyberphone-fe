"use client";

import { Save } from "lucide-react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import type { DragEndEvent } from "@dnd-kit/react";
import { isSortableOperation } from "@dnd-kit/react/sortable";

import {
  type CategoryPanelField,
  CategoryPanelCard,
} from "./CategoryPanelCard";
import { CategorySelectorList } from "./CategorySelectorList";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/features/categories/queries";
import { useStorefrontConfigurations } from "../../queries";
import type { StorefrontCategoryPanelItem } from "../../types";
import { useSyncStorefrontConfigurations } from "../../mutations";
import { StorefrontConfigurationSection } from "../../enums";

interface CategoriesPanelFormValues {
  categories: CategoryPanelField[];
}

export function CategoriesPanelConfiguration() {
  const { data: categoriesData } = useCategories({ limit: 100 });
  const { data: categoriesPanelData } =
    useStorefrontConfigurations<StorefrontCategoryPanelItem>(
      StorefrontConfigurationSection.CATEGORIES_PANEL,
    );
  const { mutate: syncCategoriesPanel } = useSyncStorefrontConfigurations();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<CategoriesPanelFormValues>({
    defaultValues: { categories: [] },
  });

  useEffect(() => {
    if (categoriesPanelData?.length && !isDirty) {
      reset({
        categories: [...categoriesPanelData]
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((item) => ({
            categoryId: item.categoryId ?? "",
            categoryName: item.categoryName ?? "",
            icon: item.icon ?? undefined,
            enabled: item.enabled,
            displayOrder: item.displayOrder,
          })),
      });
    }
  }, [categoriesPanelData, reset, isDirty]);

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

  const onSubmit = (data: CategoriesPanelFormValues) => {
    let displayOrder = 0;
    syncCategoriesPanel(
      {
        items: data.categories.map((c) => ({
          categoryId: c.categoryId,
          icon: c.icon,
          displayOrder: c.deleted ? c.displayOrder : displayOrder++,
          enabled: c.enabled,
          type: StorefrontConfigurationSection.CATEGORIES_PANEL,
          isDeleted: c.deleted,
        })),
      },
      {
        onSuccess: () => toast.success("Categories panel saved."),
        onError: () => toast.error("Failed to save categories panel."),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <CategorySelectorList
        description="Add categories to display in the storefront panel and set their display order."
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
                <CategoryPanelCard
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
