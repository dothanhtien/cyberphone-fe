"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { DEFAULT_IMAGE } from "@/constants";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useStorefrontProductList } from "@/storefront/products/queries";
import { formatCurrency } from "@/utils";
import { useDebounce } from "@/hooks";

export function NavbarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldQuery = debouncedQuery.trim().length > 0;

  const { data, isFetching } = useStorefrontProductList(
    { search: debouncedQuery, limit: 5, page: 1 },
    { enabled: shouldQuery },
  );

  const products = shouldQuery ? (data?.items ?? []) : [];
  const totalCount = shouldQuery ? (data?.totalCount ?? 0) : 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setOpen(false);
  };

  const handleViewAll = () => {
    setOpen(false);
    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  const handleProductClick = () => {
    setOpen(false);
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-64">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />

        <Input
          className="pl-8 pr-8 h-9 text-sm"
          placeholder="Search products..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.trim().length > 0 && setOpen(true)}
        />

        {query && (
          <button
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-2 left-0 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          {isFetching ||
          (query.trim().length > 0 && debouncedQuery !== query) ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          ) : products.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No products found
            </div>
          ) : (
            <>
              <div className="divide-y">
                {products.map((product) => {
                  const hasSale =
                    product.salePrice != null &&
                    product.salePrice < product.price;
                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={handleProductClick}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted/60 transition-colors"
                    >
                      <div className="shrink-0 size-12 rounded-md border bg-muted/30 p-1">
                        <Image
                          src={product.mainImage ?? DEFAULT_IMAGE}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="size-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug line-clamp-1">
                          {product.name}
                        </p>

                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-sm font-semibold text-red-600">
                            {formatCurrency(product.salePrice ?? product.price)}
                          </span>

                          {hasSale && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatCurrency(product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <Separator />

              <button
                onClick={handleViewAll}
                className="w-full px-4 py-2.5 text-sm text-center font-medium text-primary hover:bg-muted/60 transition-colors"
              >
                View all{" "}
                {totalCount > 5 ? `${totalCount.toLocaleString()} ` : ""}results
                for &quot;{query.trim()}&quot;
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
