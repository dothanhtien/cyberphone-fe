import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { getProductVariantsColumns } from "./ProductVariantsColumns";
import { ProductVariantListItem } from "../types";
import { DataTable } from "@/components/data-table/DataTable";

interface ProductVariantsTableProps {
  productId: string;
  data: ProductVariantListItem[];
  onDelete: (id: string) => void;
}

export function ProductVariantsTable({
  productId,
  data,
  onDelete,
}: ProductVariantsTableProps) {
  const router = useRouter();

  const columns = useMemo(
    () => getProductVariantsColumns({ onDelete }),
    [onDelete],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      onRowClick={(variant) =>
        router.push(`/admin/products/${productId}/variants/${variant.id}/edit`)
      }
    />
  );
}
