"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

interface DatePickerInputProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  error?: boolean;
}

export function DatePickerInput({
  value: controlledValue,
  onChange,
  placeholder = "DD/MM/YYYY",
  error,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    controlledValue ? formatDate(controlledValue) : "",
  );

  const date = isValidDate(controlledValue) ? controlledValue : undefined;
  const month = date;

  const handleSelect = (selectedDate: Date | undefined) => {
    setInputValue(selectedDate ? formatDate(selectedDate) : "");
    onChange?.(selectedDate);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const parts = value.split("/");
    if (parts.length === 3) {
      const [dayStr, monthStr, yearStr] = parts;
      if (yearStr.length === 4) {
        const day = Number(dayStr);
        const month = Number(monthStr);
        const year = Number(yearStr);

        const parsedDate = new Date(year, month - 1, day);
        if (
          !isNaN(parsedDate.getTime()) &&
          parsedDate.getFullYear() === year &&
          parsedDate.getMonth() === month - 1 &&
          parsedDate.getDate() === day
        ) {
          onChange?.(parsedDate);
          return;
        }
      }
    }
    onChange?.(undefined);
  };

  return (
    <InputGroup>
      <InputGroupInput
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-invalid={!!error}
      />
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              aria-label="Select date"
            >
              <CalendarIcon />
              <span className="sr-only">Select date</span>
            </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              month={month}
              onMonthChange={() => {}}
              onSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );
}
