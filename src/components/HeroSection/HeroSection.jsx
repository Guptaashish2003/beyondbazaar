"use client"
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
function HeroSection({sliderImage}) {
  // const sliderImage = [hero1,hero2,hero3]
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
      className='w-full'
          >
      {sliderImage.map((img,index)=><SwiperSlide key={index} className='w-full h-full'>
        <Image
          src={img}
          width={600}
          height={300}
          style={{objectFit: "cover" }}
          alt="hero image"
          className='cursor-pointer w-full h-full'
        />
      </SwiperSlide>)}
      
 
    </Swiper>
   </>
  )
}

export default HeroSection
