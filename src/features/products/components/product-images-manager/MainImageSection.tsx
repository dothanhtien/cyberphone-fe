"use client";

import { v4 as uuidv4 } from "uuid";

import { ImageRow } from "./ImageRow";
import type { ImageItem } from "./types";
import { UploadZone } from "./UploadZone";

interface MainImageSectionProps {
  value: ImageItem[];
  mainImage: ImageItem | null;
  onChange: (images: ImageItem[]) => void;
}

export function MainImageSection({
  value,
  mainImage,
  onChange,
}: MainImageSectionProps) {
  const handleUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    if (mainImage?.file && mainImage.preview)
      URL.revokeObjectURL(mainImage.preview);

    const newMain: ImageItem = {
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
      isMain: true,
    };

    const withoutOldMain = mainImage
      ? mainImage.file
        ? value.filter((i) => i.id !== mainImage.id)
        : value.map((i) =>
            i.id === mainImage.id
              ? { ...i, isDeleted: true, isMain: false }
              : i,
          )
      : value;

    onChange([...withoutOldMain, newMain]);
  };

  const handleRemove = () => {
    if (!mainImage) return;
    if (mainImage.file) {
      if (mainImage.preview) URL.revokeObjectURL(mainImage.preview);
      onChange(value.filter((i) => i.id !== mainImage.id));
    } else {
      onChange(
        value.map((i) =>
          i.id === mainImage.id ? { ...i, isDeleted: true, isMain: false } : i,
        ),
      );
    }
  };

  return (
    <div className="space-y-3">
      <div className="font-semibold">Main image</div>

      {mainImage && (
        <ImageRow
          img={mainImage}
          index={0}
          all={value}
          onChange={onChange}
          onRemove={handleRemove}
        />
      )}

      <UploadZone
        label={mainImage ? "Replace main image" : "Upload main image"}
        onUpload={handleUpload}
      />
    </div>
  );
}
