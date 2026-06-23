"use client";

import { v4 as uuidv4 } from "uuid";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { isSortableOperation } from "@dnd-kit/react/sortable";

import { ImageRow } from "./ImageRow";
import { UploadZone } from "./UploadZone";
import type { ImageItem } from "./types";
import { cn } from "@/lib/utils";

interface GallerySectionProps {
  value: ImageItem[];
  galleryImages: ImageItem[];
  onChange: (images: ImageItem[]) => void;
}

export function GallerySection({ value, galleryImages, onChange }: GallerySectionProps) {
  const handleUpload = (files: FileList | null) => {
    if (!files) return;
    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
      isMain: false,
    }));
    onChange([...value, ...newImages]);
  };

  const handleRemove = (id: string) => {
    const img = value.find((i) => i.id === id);
    if (!img) return;
    if (img.file) {
      if (img.preview) URL.revokeObjectURL(img.preview);
      onChange(value.filter((i) => i.id !== id));
    } else {
      onChange(value.map((i) => (i.id === id ? { ...i, isDeleted: true } : i)));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;
    if (!isSortableOperation(operation)) return;
    const { source } = operation;
    if (!source || source.initialIndex === source.index) return;

    const reordered = [...galleryImages];
    const [moved] = reordered.splice(source.initialIndex, 1);
    reordered.splice(source.index, 0, moved);

    const nonGallery = value.filter((i) => i.isMain || i.isDeleted);
    onChange([...nonGallery, ...reordered]);
  };

  return (
    <div className="space-y-3">
      <div className="font-semibold">Gallery</div>

      <div
        className={cn(
          "space-y-2",
          "max-h-[70vh] overflow-hidden",
          "hover:overflow-y-auto focus-within:overflow-y-auto",
          "no-scrollbar",
        )}
      >
        <DragDropProvider onDragEnd={handleDragEnd}>
          {galleryImages.map((img, index) => (
            <ImageRow
              key={img.id}
              img={img}
              index={index}
              all={value}
              onChange={onChange}
              onRemove={handleRemove}
              sortable
            />
          ))}
        </DragDropProvider>
      </div>

      <UploadZone label="Upload gallery images" multiple onUpload={handleUpload} />
    </div>
  );
}
