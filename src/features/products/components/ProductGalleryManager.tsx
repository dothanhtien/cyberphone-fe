"use client";

import { UploadCloud, Trash2, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, memo } from "react";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DEFAULT_IMAGE } from "@/constants";

export interface ImageItem {
  id: string;
  file?: File;
  preview?: string | null;
  isMain: boolean;
  url?: string | null;
  altText?: string;
  isDeleted?: boolean;
}

interface ProductGalleryManagerProps {
  value: ImageItem[];
  onChange: (images: ImageItem[]) => void;
}

interface GalleryImageRowProps {
  img: ImageItem;
  onChange: ProductGalleryManagerProps["onChange"];
  images: ImageItem[];
  setMain: (id: string) => void;
  removeImage: (id: string) => void;
}

const GalleryImageRow = memo(function GalleryImageRow({
  img,
  images,
  onChange,
  setMain,
  removeImage,
}: GalleryImageRowProps) {
  return (
    <div className="flex items-center gap-3 border rounded-lg p-2 bg-background">
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
            images.map((i) =>
              i.id === img.id ? { ...i, altText: e.target.value } : i,
            ),
          )
        }
        placeholder="Alt text"
        className="text-sm outline-none border-transparent"
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setMain(img.id)}
            className={cn(
              "p-2 rounded",
              img.isMain
                ? "text-yellow-500"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Star className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Set as main image</p>
        </TooltipContent>
      </Tooltip>

      <Button
        type="button"
        variant="ghost"
        onClick={() => removeImage(img.id)}
        className="p-2 text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
});

export function ProductGalleryManager({
  value,
  onChange,
}: ProductGalleryManagerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    return () => {
      value.forEach(
        (img) => img.file && img.preview && URL.revokeObjectURL(img.preview),
      );
    };
  }, [value]);

  const handleUpload = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
      isMain: false,
    }));

    const merged = [...value, ...newImages];

    if (!merged.some((i) => i.isMain) && merged.length > 0) {
      merged[0].isMain = true;
    }

    onChange(merged);
  };

  const setMain = (id: string) => {
    onChange(value.map((i) => ({ ...i, isMain: i.id === id && !i.isDeleted })));
  };

  const removeImage = (id: string) => {
    const removed = value.find((i) => i.id === id);
    if (!removed) return;

    if (removed.file) {
      if (removed.preview) URL.revokeObjectURL(removed.preview);
      onChange(value.filter((i) => i.id !== id));
      return;
    }

    let updated = value.map((i) =>
      i.id === id ? { ...i, isDeleted: true, isMain: false } : i,
    );

    if (!updated.some((i) => i.isMain && !i.isDeleted)) {
      const firstNotDeleted = updated.find((i) => !i.isDeleted);
      if (firstNotDeleted) {
        updated = updated.map((i) =>
          i.id === firstNotDeleted.id ? { ...i, isMain: true } : i,
        );
      }
    }

    onChange(updated);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleUpload(e.dataTransfer.files);
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="font-semibold">Gallery</div>

      <div
        className={cn(
          "space-y-2",
          "max-h-[70vh] overflow-hidden",
          "hover:overflow-y-auto focus-within:overflow-y-auto",
          "no-scrollbar",
        )}
      >
        {value
          .filter((img) => !img.isDeleted)
          .map((img) => (
            <GalleryImageRow
              key={img.id}
              img={img}
              images={value}
              onChange={onChange}
              setMain={setMain}
              removeImage={removeImage}
            />
          ))}
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-dashed cursor-pointer transition",
          dragging
            ? "border-primary bg-accent/50"
            : "border-border hover:bg-accent/40",
        )}
      >
        <UploadCloud className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Bulk upload gallery images
        </p>
        <p className="text-xs text-muted-foreground/70">PNG, JPG up to 5MB</p>
      </div>

      <Input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleUpload(e.target.files)}
      />
    </div>
  );
}
