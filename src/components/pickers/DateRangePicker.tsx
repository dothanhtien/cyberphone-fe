"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { type DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function useDateRange(initial?: Partial<DateRange>) {
  const [date, setDate] = useState<DateRange>({
    from: initial?.from ?? dayjs().startOf("month").toDate(),
    to: initial?.to ?? dayjs().toDate(),
  });

  const setRange = (range: DateRange | undefined) => {
    if (!range) return;
    setDate(range);
  };

  return { date, setRange };
}

interface DateRangePickerProps {
  onRangeSelected?: (range: DateRange) => void;
}

export function DateRangePicker({ onRangeSelected }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const { date, setRange } = useDateRange();

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return;
    setRange(range);
  };

  const handlePopoverChange = (isOpen: boolean) => {
    if (!isOpen && onRangeSelected) {
      onRangeSelected(date);
    }
    setOpen(isOpen);
  };

  return (
    <Popover open={open} onOpenChange={handlePopoverChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker-range"
          className="justify-start px-2.5 font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date.from ? (
            date.to ? (
              <>
                {dayjs(date.from).format("MMM DD, YYYY")} -{" "}
                {dayjs(date.to).format("MMM DD, YYYY")}
              </>
            ) : (
              dayjs(date.from).format("MMM DD, YYYY")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date.from}
          selected={date}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
