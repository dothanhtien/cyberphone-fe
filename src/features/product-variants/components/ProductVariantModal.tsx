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

interface ProductVariantModalProps {
  mode?: "create" | "update";
  open: boolean;
  variant: ProductVariant | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductVariantFormValues) => void;
}

export function ProductVariantModal({
  mode = "create",
  open,
  variant,
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

        <ProductVariantForm variant={variant} onSubmit={onSubmit} />

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
