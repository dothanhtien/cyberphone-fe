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

import { ProductVariantForm } from "./ProductVariantForm";
import { ProductVariantFormValues } from "../schemas";
import { ProductVariant } from "../types";
import { ProductAttribute } from "@/features/products/types";

interface ProductVariantModalProps {
  mode?: "create" | "update";
  open: boolean;
  variant: ProductVariant | null;
  attributes: ProductAttribute[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductVariantFormValues) => void;
}

export function ProductVariantModal({
  mode = "create",
  open,
  variant,
  attributes,
  onOpenChange,
  onSubmit,
}: ProductVariantModalProps) {
  const isCreate = mode === "create";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-4xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Create variant" : "Update variant"}
          </DialogTitle>
          <DialogDescription>
            {isCreate
              ? "Create a new product variant"
              : "Update this product variant"}
          </DialogDescription>
        </DialogHeader>

        <div className="no-scrollbar max-h-[70vh] overflow-y-auto p-2">
          <ProductVariantForm
            variant={variant}
            attributes={attributes}
            onSubmit={onSubmit}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button type="submit" form="product-variant-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
