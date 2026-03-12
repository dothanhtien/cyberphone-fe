"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function Slider() {
  const images = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 10000 }}
      >
        {images.map((num, index) => (
          <SwiperSlide key={num}>
            <div className="relative w-full aspect-16/5 bg-gray-100">
              <Image
                src={`/images/sliders/${num}.webp`}
                alt={`Slide ${num}`}
                fill
                className="object-contain"
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
