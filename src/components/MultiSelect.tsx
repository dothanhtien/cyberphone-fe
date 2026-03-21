"use client";

import { Control, FieldValues, Path, useController } from "react-hook-form";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

interface MultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  items: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
}

export function MultiSelect<T extends FieldValues>({
  name,
  control,
  items,
  placeholder = "items",
}: MultiSelectProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController<T, Path<T>>({
    name,
    control,
  });

  const anchor = useComboboxAnchor();

  const value = (field.value ?? []) as string[];

  return (
    <div className="space-y-2">
      <Combobox
        multiple
        items={items.map((i) => i.value)}
        value={value}
        onValueChange={field.onChange}
        autoHighlight
      >
        <ComboboxChips ref={anchor} className="w-full">
          <ComboboxValue>
            {(values: string[]) => (
              <>
                {values.map((val) => {
                  const item = items.find((i) => i.value === val);

                  return <ComboboxChip key={val}>{item?.label}</ComboboxChip>;
                })}
                <ComboboxChipsInput aria-invalid={!!error} />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No {placeholder} found.</ComboboxEmpty>

          <ComboboxList>
            {(val: string) => {
              const item = items.find((i) => i.value === val);

              return (
                <ComboboxItem key={val} value={val}>
                  {item?.label}
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
