"use client";

import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePagination } from "@/hooks";
import { Paginated } from "@/interfaces";

interface SelectDialogProps<T> {
  open: boolean;
  title: string;
  description: string;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: T) => void;
  fetchItemsFunc: ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => Promise<AxiosResponse<Paginated<T>>>;
  getId: (item: T) => string;
  getName: (item: T) => string;
}

export default function SelectDialog<T>({
  open,
  title,
  description,
  onOpenChange,
  onSelect,
  fetchItemsFunc,
  getId,
  getName,
}: SelectDialogProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { pageCount, pagination, setPagination, updatePageCount } =
    usePagination();

  const fetchItems = useCallback(async () => {
    try {
      const { data } = await fetchItemsFunc({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setItems(data.items);
        updatePageCount(data.totalCount, data.itemsPerPage);
      }
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  }, [
    fetchItemsFunc,
    pagination.pageIndex,
    pagination.pageSize,
    updatePageCount,
  ]);

  useEffect(() => {
    if (open) {
      fetchItems();
    }
  }, [open, items, fetchItems]);

  const handlePageChange = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < pageCount) {
      setPagination((prev) => ({ ...prev, pageIndex }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <RadioGroup
            onValueChange={setSelectedValue}
            value={selectedValue}
            className="max-h-[300px] overflow-auto border rounded-md p-2"
          >
            {items.map((item) => {
              const value = getId(item);
              return (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={value} />
                  <Label htmlFor={value}>{getName(item)}</Label>
                </div>
              );
            })}
          </RadioGroup>

          {pageCount > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pagination.pageIndex - 1);
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: pageCount }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={i === pagination.pageIndex}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {pageCount > 5 && <PaginationEllipsis />}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pagination.pageIndex + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={() => {
              const foundItem = items.find(
                (item) => getId(item) === selectedValue
              );
              if (!foundItem) return;
              onSelect(foundItem);
            }}
            disabled={!selectedValue}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
