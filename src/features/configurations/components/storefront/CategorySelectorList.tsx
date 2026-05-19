"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/react";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

interface CategorySelectorListProps {
  heading?: string;
  description?: string;
  availableCategories: Array<{ id: string; name: string }>;
  fields: Array<{ id: string }>;
  onAdd: (category: { value: string; label: string }) => void;
  onDragEnd: (event: DragEndEvent) => void;
  renderItem: (fieldId: string, index: number) => React.ReactNode;
}

export function CategorySelectorList({
  heading = "Categories",
  description,
  availableCategories,
  fields,
  onAdd,
  onDragEnd,
  renderItem,
}: CategorySelectorListProps) {
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const handleAdd = () => {
    if (!selectedCategory) return;
    onAdd(selectedCategory);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-medium">{heading}</h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Combobox
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          isItemEqualToValue={(a, b) => a.value === b.value}
        >
          <ComboboxInput placeholder="Search category..." className="w-64" />
          <ComboboxContent>
            {!availableCategories.length && (
              <ComboboxEmpty>No categories found.</ComboboxEmpty>
            )}
            <ComboboxList>
              {availableCategories.map((cat) => (
                <ComboboxItem
                  key={cat.id}
                  value={{ value: cat.id, label: cat.name }}
                >
                  {cat.name}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          disabled={!selectedCategory}
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {fields.length > 0 && (
        <DragDropProvider onDragEnd={onDragEnd}>
          {fields.map((field, index) => renderItem(field.id, index))}
        </DragDropProvider>
      )}
    </div>
  );
}
