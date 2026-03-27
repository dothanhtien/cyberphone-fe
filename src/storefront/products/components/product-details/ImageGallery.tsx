"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

import { StorefrontProductImage } from "../../types";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductDetailsGalleryProps {
  images: StorefrontProductImage[];
}

export function ProductDetailsGallery({ images }: ProductDetailsGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="w-full max-w-xl">
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="rounded-2xl overflow-hidden border bg-white"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="flex items-center justify-center bg-white">
              <Image
                src={img.url}
                alt=""
                className="object-contain"
                height={300}
                width={300}
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
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="cursor-pointer rounded-xl overflow-hidden border transition">
              <Image
                width={80}
                height={80}
                src={img.url}
                alt={img.id}
                className="object-cover h-20 mx-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
