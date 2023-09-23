"use client"
import React from 'react'
import Image from 'next/image'
import hero1 from "@/assets/hero1.jpg"
import hero2 from "@/assets/hero2.jpg"
import hero3 from "@/assets/hero3.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
function HeroSection() {
  const sliderImage = [hero1,hero2,hero3]
  return (
   <>
   <Swiper
       loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className='w-full hero-hieght'
          >
      {sliderImage.map((img,index)=><SwiperSlide key={index} className='w-full h-full'>
        <Image
          src={img}
          style={{objectFit: "cover"}}
          alt="hero image"
          className='cursor-pointer w-full h-full'
        />
      </SwiperSlide>)}
      
 
    </Swiper>
   </>
  )
}

export default HeroSection
