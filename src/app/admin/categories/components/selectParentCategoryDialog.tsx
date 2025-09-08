"use client";

import { useCallback, useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Category } from "@/interfaces";
import { apiService } from "@/lib/api";

interface SelectParentCategoryDialogModal {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (category: Category | undefined) => void;
}

export function SelectParentCategoryDialog({
  open,
  onOpenChange,
  onSelect,
}: SelectParentCategoryDialogModal) {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await apiService.categories.getCategories({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setCategoryList(data.items);
        setPageCount(
          Math.max(1, Math.ceil(data.totalCount / data.itemsPerPage))
        );
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open, fetchCategories]);

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
          <DialogTitle>Select parent category</DialogTitle>
          <DialogDescription>
            Choose a parent category from the list below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <RadioGroup
            onValueChange={setSelectedValue}
            value={selectedValue}
            className="max-h-[300px] overflow-auto border rounded-md p-2"
          >
            {categoryList.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id}>{category.name}</Label>
              </div>
            ))}
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
            onClick={() =>
              onSelect(categoryList.find((cat) => cat.id === selectedValue))
            }
            disabled={!selectedValue}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
