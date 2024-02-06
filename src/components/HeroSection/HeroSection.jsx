"use client"
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
function HeroSection({sliderImage,sliderHieght,className,...props}) {
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
      className={`${sliderHieght} ${className}`}
      {...props}
          >
      {sliderImage.map((img,index)=><SwiperSlide key={index} className={`w-full  ${sliderHieght}`}>
        <Image
          src={img}
          width={600}
          height={600}
          style={{objectFit: "cover" }}
          alt="hero image"
          className={`w-full cursor-pointer  ${sliderHieght}`}
        />
      </SwiperSlide>)}
      
 
    </Swiper>
   </>
  )
}

export default HeroSection
