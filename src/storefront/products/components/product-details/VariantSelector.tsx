"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { StorefrontProductAttribute, StorefrontVariant } from "../../types";

interface VariantSelectorProps {
  attributes: StorefrontProductAttribute[];
  variants: StorefrontVariant[];
  onChange?: (variant?: StorefrontVariant) => void;
}

export function VariantSelector({
  attributes,
  variants,
  onChange,
}: VariantSelectorProps) {
  const sortedAttributes = useMemo(
    () => [...attributes].sort((a, b) => a.displayOrder - b.displayOrder),
    [attributes],
  );

  const defaultVariant = useMemo(
    () => variants.find((v) => v.isDefault) ?? variants[0],
    [variants],
  );

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >(() => {
    const map: Record<string, string> = {};
    defaultVariant?.attributes.forEach((attr) => {
      map[attr.productAttributeId] = attr.attributeValue;
    });

    return map;
  });

  const selectedVariant = useMemo(
    () =>
      variants.find((v) =>
        v.attributes.every(
          (attr) =>
            selectedAttributes[attr.productAttributeId] === attr.attributeValue,
        ),
      ),
    [variants, selectedAttributes],
  );

  useEffect(() => {
    onChange?.(selectedVariant);
  }, [selectedVariant, onChange]);

  const getAllOptions = (attrId: string) => {
    const map = new Map<string, string>();

    variants.forEach((v) => {
      const va = v.attributes.find((a) => a.productAttributeId === attrId);

      if (va)
        map.set(
          va.attributeValue,
          va.attributeValueDisplay ?? va.attributeValue,
        );
    });

    return Array.from(map.entries()).map(([value, label]) => ({
      value,
      label,
    }));
  };

  const isOptionAvailable = (attrId: string, optionValue: string) =>
    variants.some((v) =>
      v.attributes.every((attr) => {
        if (attr.productAttributeId === attrId)
          return attr.attributeValue === optionValue;

        const selected = selectedAttributes[attr.productAttributeId];

        return !selected || attr.attributeValue === selected;
      }),
    );

  if (!variants.length) return null;

  return (
    <div className="flex flex-col gap-5">
      {sortedAttributes.map((attr, index) => {
        const options = getAllOptions(attr.id);

        if (!options.length) return null;

        return (
          <div key={attr.id}>
            <p className="text-sm font-semibold mb-2.5 text-foreground">
              {attr.attributeKeyDisplay}
              {selectedAttributes[attr.id] && (
                <span className="ml-2 font-normal text-muted-foreground">
                  {
                    options.find((o) => o.value === selectedAttributes[attr.id])
                      ?.label
                  }
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const isSelected = selectedAttributes[attr.id] === option.value;
                const isAvailable = isOptionAvailable(attr.id, option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {
                      if (!isAvailable) return;

                      setSelectedAttributes((prev) => {
                        const next = { ...prev };

                        if (prev[attr.id] === option.value) {
                          delete next[attr.id];
                        } else {
                          next[attr.id] = option.value;
                        }
                        
                        sortedAttributes
                          .slice(index + 1)
                          .forEach((a) => delete next[a.id]);
                        return next;
                      });
                    }}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-all",
                      isSelected
                        ? "border-orange-400 ring-orange-400"
                        : "border-border bg-background hover:border-primary/50 text-foreground",
                      !isAvailable &&
                        "opacity-35 cursor-not-allowed line-through",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
