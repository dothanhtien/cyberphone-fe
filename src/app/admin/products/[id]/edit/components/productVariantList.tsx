import { useCallback, useEffect, useState } from "react";
import { AlertCircleIcon, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ProductVariantItem } from "./productVariantItem";
import { Loading } from "@/components/loading";
import { ProductVariantDialog } from "./productVariantDialog";
import { apiService } from "@/lib/api";
import { ProductVariant } from "@/interfaces";

interface ProductVariantDialogState {
  action: "create" | "update";
  open: boolean;
  productId: string;
  variant: ProductVariant | null;
}

const initialProductVariantDialog: ProductVariantDialogState = {
  action: "create",
  open: false,
  productId: "",
  variant: null,
};

interface ProductVariantListProps {
  productId: string;
}

export function ProductVariantList({ productId }: ProductVariantListProps) {
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [productVariantDialog, setProductVariantDialog] =
    useState<ProductVariantDialogState>(initialProductVariantDialog);

  const fetchProductVariants = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.products.getVariants(productId);
      setVariants(response.data);
    } catch (error) {
      console.error("An error occurred when fetching product variants", error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductVariants();
  }, [fetchProductVariants]);

  const handleProductVariantCreateSuccess = (data: ProductVariant) => {
    setProductVariantDialog(initialProductVariantDialog);
    setVariants((prevValue) => {
      const clonedVariants = [...prevValue];
      const foundIndex = clonedVariants.findIndex(
        (variant) => variant.id === data.id
      );
      if (foundIndex !== -1) {
        clonedVariants.splice(foundIndex, 1);
      }
      return [data, ...clonedVariants];
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="default"
        onClick={() =>
          setProductVariantDialog({
            ...initialProductVariantDialog,
            open: true,
          })
        }
      >
        <Plus /> Add variant
      </Button>
      {loading && <Loading />}
      {!loading && variants.length === 0 && (
        <Alert className="mt-6">
          <AlertCircleIcon />
          <AlertTitle>This product has no variants yet.</AlertTitle>
        </Alert>
      )}
      {!loading &&
        variants.length > 0 &&
        variants.map((item) => (
          <ProductVariantItem
            key={item.id}
            variant={item}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      <ProductVariantDialog
        action={productVariantDialog.action}
        open={productVariantDialog.open}
        productId={productId}
        variant={productVariantDialog.variant}
        onOpenChange={(isOpen) =>
          !isOpen && setProductVariantDialog(initialProductVariantDialog)
        }
        onSuccess={handleProductVariantCreateSuccess}
      />
    </>
  );
}
