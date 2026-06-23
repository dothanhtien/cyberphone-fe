"use client";

import { useEffect, useRef } from "react";

import { MainImageSection } from "./MainImageSection";
import { GallerySection } from "./GallerySection";
import type { ImageItem } from "./types";

export type { ImageItem };

interface ProductImagesManagerProps {
  value: ImageItem[];
  onChange: (images: ImageItem[]) => void;
}

export function ProductImagesManager({ value, onChange }: ProductImagesManagerProps) {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  });

  useEffect(() => {
    return () => {
      valueRef.current.forEach(
        (img) => img.file && img.preview && URL.revokeObjectURL(img.preview),
      );
    };
  }, []);

  const mainImage = value.find((i) => i.isMain && !i.isDeleted) ?? null;
  const galleryImages = value.filter((i) => !i.isMain && !i.isDeleted);

  return (
    <div className="mt-4 space-y-6">
      <MainImageSection value={value} mainImage={mainImage} onChange={onChange} />
      <GallerySection value={value} galleryImages={galleryImages} onChange={onChange} />
    </div>
  );
}
