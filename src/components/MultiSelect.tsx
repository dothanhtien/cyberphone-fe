"use client";

import * as React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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

  const value = (field.value ?? []) as string[];
  const onChange = field.onChange as (value: string[]) => void;

  const [open, setOpen] = React.useState(false);

  const toggleSelect = (val: string) => {
    const newValue = value.includes(val)
      ? value.filter((v: string) => v !== val)
      : [...value, val];

    onChange(newValue);
  };

  const removeItem = (val: string) => {
    onChange(value.filter((v: string) => v !== val));
  };

  return (
    <div className="w-75 space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={!!error}
            className="w-full justify-between"
          >
            {value.length > 0
              ? `${value.length} selected`
              : `Select ${placeholder}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${placeholder}...`} />
            <CommandEmpty>No {placeholder} found.</CommandEmpty>

            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => toggleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(item.value) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((val: string) => {
            const item = items.find((f) => f.value === val);
            return (
              <Badge
                key={val}
                variant="default"
                className="flex items-center gap-1"
              >
                {item?.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(val);
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
