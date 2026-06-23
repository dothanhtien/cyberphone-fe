import { ProductImageType } from "@/features/products/enums";
import type { ImageItem } from "@/features/products/components/product-images-manager/types";

export interface ImageMeta {
  id?: string;
  imageType: ProductImageType;
  altText?: string | null;
  title?: string | null;
  displayOrder?: number;
  isDeleted?: boolean;
}

export function buildImagePayload(gallery: ImageItem[]): {
  images: File[];
  imageMetas: ImageMeta[];
} {
  const images: File[] = [];
  const imageMetas: ImageMeta[] = [];
  let displayOrder = 0;

  gallery.forEach((img) => {
    if (img.file) {
      const ext = img.file.name.split(".").pop() ?? "";
      images.push(new File([img.file], `${img.id}.${ext}`));
    }

    imageMetas.push({
      id: img.id,
      imageType: img.isMain ? ProductImageType.MAIN : ProductImageType.GALLERY,
      altText: img.altText || "",
      title: "",
      displayOrder: img.isDeleted ? 0 : displayOrder++,
      isDeleted: img.isDeleted,
    });
  });

  return { images, imageMetas };
}
