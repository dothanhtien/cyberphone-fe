"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    () => variants.find((v) => v.isDefault) || variants[0],
    [variants],
  );

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >(() => {
    const map: Record<string, string> = {};

    if (!defaultVariant) return map;

    defaultVariant.attributes.forEach((attr) => {
      map[attr.productAttributeId] = attr.attributeValue;
    });

    return map;
  });

  const selectedVariant = useMemo(() => {
    return variants.find((v) =>
      v.attributes.every(
        (attr) =>
          selectedAttributes[attr.productAttributeId] === attr.attributeValue,
      ),
    );
  }, [variants, selectedAttributes]);

  useEffect(() => {
    onChange?.(selectedVariant);
  }, [selectedVariant, onChange]);

  const getAllOptions = (attrId: string) => {
    const map = new Map<string, string>();

    variants.forEach((v) => {
      const va = v.attributes.find((a) => a.productAttributeId === attrId);

      if (va) {
        map.set(
          va.attributeValue,
          va.attributeValueDisplay ?? va.attributeValue,
        );
      }
    });

    return Array.from(map.entries()).map(([value, label]) => ({
      value,
      label,
    }));
  };

  const isOptionAvailable = (attrId: string, optionValue: string) => {
    return variants.some((variant) => {
      return variant.attributes.every((attr) => {
        if (attr.productAttributeId === attrId) {
          return attr.attributeValue === optionValue;
        }

        const selectedValue = selectedAttributes[attr.productAttributeId];

        if (!selectedValue) return true;

        return attr.attributeValue === selectedValue;
      });
    });
  };

  if (!variants.length) {
    return null;
  }

  return (
    <div className="attributes mb-6">
      {sortedAttributes.map((attr, index) => {
        const options = getAllOptions(attr.id);

        if (!options.length) return null;

        return (
          <div key={attr.id} className="mb-6">
            <div className="font-semibold mb-3">{attr.attributeKeyDisplay}</div>

            <div className="grid grid-cols-3 gap-4">
              {options.map((option) => {
                const isSelected = selectedAttributes[attr.id] === option.value;

                const isAvailable = isOptionAvailable(attr.id, option.value);

                return (
                  <Card
                    key={option.value}
                    onClick={() => {
                      if (!isAvailable) return;

                      setSelectedAttributes((prev) => {
                        const next = { ...prev };

                        const isCurrentlySelected =
                          prev[attr.id] === option.value;

                        if (isCurrentlySelected) {
                          delete next[attr.id];

                          sortedAttributes.slice(index + 1).forEach((a) => {
                            delete next[a.id];
                          });
                        } else {
                          next[attr.id] = option.value;

                          sortedAttributes.slice(index + 1).forEach((a) => {
                            delete next[a.id];
                          });
                        }

                        return next;
                      });
                    }}
                    className={`rounded-lg transition ring p-3
                      ${
                        isAvailable
                          ? "cursor-pointer"
                          : "opacity-30 cursor-not-allowed"
                      }
                      ${
                        isSelected
                          ? "ring-orange-400 bg-orange-50"
                          : "ring-muted-foreground"
                      }
                    `}
                  >
                    <CardContent className="text-center">
                      <span>{option.label}</span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
