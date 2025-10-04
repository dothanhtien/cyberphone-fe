import { SquarePen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductVariant } from "@/interfaces";

interface ProductVariantItemProps {
  variant: ProductVariant;
  onEdit: (variant: ProductVariant) => void;
  onDelete: (variant: ProductVariant) => void;
}

export function ProductVariantItem({
  variant,
  onEdit,
  onDelete,
}: ProductVariantItemProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{variant.name}</CardTitle>
        <CardAction>
          <Button
            variant={null}
            size="icon"
            className="size-8 mr-2"
            onClick={() => onEdit(variant)}
          >
            <SquarePen />
          </Button>

          <Button
            variant={null}
            size="icon"
            className="size-8 mr-2 text-red-500"
            onClick={() => onDelete(variant)}
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <div>
            <strong>Slug:</strong> {variant.slug}
          </div>

          <div>
            <strong>SKU:</strong> {variant.sku}
          </div>

          <div className="mt-4">
            <strong>Pricing</strong>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Base price</TableHead>
                  <TableHead>Sale price</TableHead>
                  <TableHead>Cost price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{variant.basePrice}</TableCell>
                  <TableCell>{variant.salePrice ?? "Not set"}</TableCell>
                  <TableCell>{variant.costPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <strong>Inventory</strong>
            <div>
              <strong>Weight (kg):</strong> {variant.weightKg ?? "Not set"}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock quantity</TableHead>
                  <TableHead>Low stock threshold</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{variant.stockQuantity ?? 0}</TableCell>
                  <TableCell>
                    {variant.lowStockThreshold ?? "Not set"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
