import Image from "next/image";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopProduct } from "../types";
import { DEFAULT_IMAGE } from "@/constants";

interface TopProductsProps {
  data: TopProduct[];
  loading?: boolean;
}

export function TopProducts({ data, loading = false }: TopProductsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top products</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span>Loading…</span>
          </div>
        ) : (
          <>
            {data.map((product) => (
              <div className="flex mb-3 last:mb-0" key={product.id}>
                <Image
                  className="rounded-lg"
                  alt={product.name}
                  height={64}
                  width={64}
                  loading="eager"
                  src={product.imageUrl ?? DEFAULT_IMAGE}
                />

                <div>
                  <div className="mb-1 font-semibold">{product.name}</div>
                  <div className="text-muted-foreground">
                    {product.totalSales} sales
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}
