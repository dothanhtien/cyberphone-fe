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
import { CreateProductVariantFormValues } from "../schemas";
import { ProductVariantForm } from "./ProductVariantForm";

interface ProductVariantModalProps {
  open: boolean;
  productId: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CreateProductVariantFormValues) => void;
}

export function ProductVariantModal({
  open,
  productId,
  onOpenChange,
  onSubmit,
}: ProductVariantModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-4xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create variant</DialogTitle>
          <DialogDescription>
            Create a new product variant for this product.
          </DialogDescription>
        </DialogHeader>

        <ProductVariantForm productId={productId} onSubmit={onSubmit} />

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
