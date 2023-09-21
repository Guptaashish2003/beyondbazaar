"use client"
import React from 'react'
import Image from 'next/image'
import hero1 from "@/assets/hero1.jpg"
import hero2 from "@/assets/hero2.jpg"
import hero3 from "@/assets/hero3.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
function HeroSection() {
  const sliderImages = [hero1,hero2,hero3]
 
  return (
    <div className="swiper-container">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        navigation={true}
        pagination={true}
        className="swiper-wrapper"
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              className="swiper-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSection
