"use client";

import { Plus, Save } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/react";
import { isSortableOperation } from "@dnd-kit/react/sortable";

import { SliderItemCard, type SliderItemField } from "./SliderItemCard";
import { useSyncStorefrontSliders } from "../../mutations";
import { useStorefrontSliders } from "../../queries";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { handleApiError } from "@/utils/api";

interface SliderFormValues {
  items: SliderItemField[];
}

export function SliderConfiguration() {
  const { data: slidersData } = useStorefrontSliders();

  const { control, handleSubmit, reset } = useForm<SliderFormValues>({
    defaultValues: {
      items: [],
    },
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && slidersData?.length) {
      reset({
        items: slidersData.map((slider) => ({
          id: slider.id,
          url: slider.url,
          title: slider.title ?? "",
          altText: slider.altText ?? "",
          isDeactivated: !slider.isActive,
          isDeleted: false,
        })),
      });
      initialized.current = true;
    }
  }, [slidersData, reset]);

  const { fields, append, move } = useFieldArray({
    control,
    name: "items",
  });

  const syncSlidersMutation = useSyncStorefrontSliders();

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;
    if (!isSortableOperation(operation)) return;
    const { source } = operation;
    if (source && source.initialIndex !== source.index) {
      move(source.initialIndex, source.index);
    }
  };

  const onSubmit = (values: SliderFormValues) => {
    syncSlidersMutation.mutate(
      {
        images: values.items.flatMap((item) => (item.file ? [item.file] : [])),
        items: values.items.map((item, index) => ({
          id: item.id,
          title: item.title || null,
          altText: item.altText || null,
          displayOrder: index,
          isDeactivated: item.isDeactivated,
          isDeleted: item.isDeleted,
        })),
      },
      {
        onSuccess: () => toast.success("Sliders saved successfully"),
        onError: (error) =>
          handleApiError(error, "An error occurred when saving sliders"),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <DragDropProvider onDragEnd={handleDragEnd}>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            name={`items.${index}`}
            render={({ field: { value, onChange } }) => {
              if (value.isDeleted) return <></>;

              return (
                <SliderItemCard
                  fieldId={field.id}
                  index={index}
                  value={value}
                  onChange={onChange}
                  onRemove={() => onChange({ ...value, isDeleted: true })}
                />
              );
            }}
          />
        ))}
      </DragDropProvider>

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            id: uuidv4(),
            title: "",
            altText: "",
            isDeactivated: false,
            isDeleted: false,
          })
        }
        className="w-full gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Slide
      </Button>

      <Button type="submit" disabled={syncSlidersMutation.isPending}>
        {syncSlidersMutation.isPending ? (
          <>
            <Spinner />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save changes
          </>
        )}
      </Button>
    </form>
  );
}
