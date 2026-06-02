"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useStorefrontSliders } from "@/features/configurations/queries";

export function Slider() {
  const { data: sliders } = useStorefrontSliders();

  const activeSliders = sliders
    ?.filter((s) => s.isActive && s.url)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (!activeSliders?.length) {
    return (
      <div className="rounded-xl overflow-hidden w-full aspect-16/6 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No slides available</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 10000 }}
      >
        {activeSliders.map((slider, index) => (
          <SwiperSlide key={slider.id}>
            <div className="relative w-full aspect-16/6 bg-gray-100">
              <Image
                src={slider.url!}
                alt={slider.altText ?? slider.title ?? `Slide ${index + 1}`}
                fill
                className="object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
