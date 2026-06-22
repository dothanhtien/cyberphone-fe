"use client";

import { GripVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import { useSortable } from "@dnd-kit/react/sortable";

import type { ImageItem } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_IMAGE } from "@/constants";
import { cn } from "@/lib/utils";

interface ImageRowProps {
  img: ImageItem;
  index: number;
  all: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  onRemove: (id: string) => void;
  sortable?: boolean;
}

export const ImageRow = memo(function ImageRow({
  img,
  index,
  all,
  onChange,
  onRemove,
  sortable = false,
}: ImageRowProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id: img.id,
    index,
    disabled: !sortable,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 border rounded-lg p-2 bg-background transition-opacity",
        isDragging && "opacity-50",
      )}
    >
      {sortable && (
        <button
          type="button"
          ref={handleRef}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none shrink-0"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      )}

      <div className="h-auto w-75 mx-auto">
        <Image
          src={img.preview ?? DEFAULT_IMAGE}
          alt={img.altText || ""}
          width={200}
          height={200}
          unoptimized
          className="rounded-lg object-cover"
        />
      </div>

      <Input
        value={img.altText || ""}
        onChange={(e) =>
          onChange(
            all.map((i) =>
              i.id === img.id ? { ...i, altText: e.target.value } : i,
            ),
          )
        }
        placeholder="Alt text"
        className="text-sm"
      />

      <Button
        type="button"
        variant="ghost"
        onClick={() => onRemove(img.id)}
        className="p-2 text-red-500 shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
});
