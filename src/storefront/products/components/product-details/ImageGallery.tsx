"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

import { StorefrontProductImage } from "../../types";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductDetailsGalleryProps {
  images: StorefrontProductImage[];
}

export function ProductDetailsGallery({ images }: ProductDetailsGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
        className="rounded-xl overflow-hidden border bg-white aspect-square"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="flex items-center justify-center w-full h-full bg-white p-4">
              <Image
                src={img.url}
                alt={img.id}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        className="mt-3"
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.id}>
            <div
              className={cn(
                "cursor-pointer rounded-lg overflow-hidden border-2 transition-all aspect-square bg-white",
                activeIndex === i
                  ? "border-orange-400 shadow-sm"
                  : "border-transparent hover:border-border",
              )}
            >
              <Image
                width={80}
                height={80}
                src={img.url}
                alt={img.id}
                className="object-contain w-full h-full p-1"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
